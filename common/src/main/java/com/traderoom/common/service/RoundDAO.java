package com.traderoom.common.service;

import com.traderoom.core.logging.FastLogger;
import com.traderoom.common.model.Round;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.postgresql.copy.CopyManager;
import org.postgresql.core.BaseConnection;

import java.io.IOException;
import java.io.StringReader;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;

public class RoundDAO implements SaveService {

    private static final String FIELDS = " id, cell, factor, start_time, victory_time ";
    private static final String SELECT = " SELECT " + FIELDS;
    private static final String SELECT_FROM = SELECT + " FROM round ORDER BY id DESC ";
    private static final String INSERT = " INSERT INTO round (" + FIELDS + ") ";
    private static final String CONFLICT = """
            ON CONFLICT (id)
            DO UPDATE SET
                cell         = EXCLUDED.cell,
                factor       = EXCLUDED.factor,
                start_time   = EXCLUDED.start_time,
                victory_time = EXCLUDED.victory_time
            """;
    private static final String UPSERT = INSERT + " VALUES (?, ?, ?, ?, ?) " + CONFLICT;
    private static final String MOVE = INSERT + SELECT + " FROM round_staging " + CONFLICT;
    private static final String COPY = "COPY round_staging (" + FIELDS + ") FROM STDIN";

    private final int chunkSize = 100_000;

    private final HikariDataSource dataSource;

    public RoundDAO() {
        this("jdbc:postgresql://localhost:5432/buleto", "postgres", "postgres");
    }

    public RoundDAO(String jdbcUrl, String username, String password) {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(jdbcUrl);
        config.setUsername(username);
        config.setPassword(password);
        config.setMaximumPoolSize(10);
        config.setMinimumIdle(2);
        config.setConnectionTimeout(30000);
        config.setIdleTimeout(600000);
        config.addDataSourceProperty("cachePrepStmts", "true");
        config.addDataSourceProperty("prepStmtCacheSize", "250");
        config.addDataSourceProperty("prepStmtCacheSqlLimit", "2048");
        config.addDataSourceProperty("useServerPrepStmts", "true");
        dataSource = new HikariDataSource(config);
        initializeSchema();
    }

    private void initializeSchema() {
        var schemaSql = """
                CREATE TABLE IF NOT EXISTS round (
                    id           BIGINT PRIMARY KEY,
                    cell         INT         NOT NULL,
                    factor       INT         NOT NULL,
                    start_time   TIMESTAMPTZ NOT NULL,
                    victory_time TIMESTAMPTZ NOT NULL
                );
                CREATE INDEX IF NOT EXISTS idx_victory_time ON round (victory_time);
                CREATE TABLE IF NOT EXISTS round_staging (
                    id           BIGINT,
                    cell         INT,
                    factor       INT,
                    start_time   TIMESTAMPTZ,
                    victory_time TIMESTAMPTZ
                );
                """;

        try (var conn = dataSource.getConnection(); var stmt = conn.createStatement()) {
            stmt.execute(schemaSql);
        } catch (SQLException e) {
            FastLogger.error("Failed to initialize schema", e);
        }
    }

    public Round save(Round round) {
        if (round == null) return null;
        try (var conn = dataSource.getConnection(); var ps = conn.prepareStatement(UPSERT)) {
            ps.setLong(1, round.roundId());
            ps.setInt(2, round.cell());
            ps.setInt(3, round.factor());
            ps.setTimestamp(4, new Timestamp(round.startTime()));
            ps.setTimestamp(5, new Timestamp(round.victoryTime()));
            ps.executeUpdate();
        } catch (SQLException e) {
            FastLogger.error("Error saving round ", e.getMessage(), e);
        }
        return round;
    }

    public void saveAll(List<Round> rounds) {
        if (rounds == null || rounds.isEmpty()) {
            return;
        }
        for (int i = 0; i < rounds.size(); i += chunkSize) {
            int end = Math.min(i + chunkSize, rounds.size());
            var chunk = rounds.subList(i, end);
            var attempted = saveAllInternal(chunk);
            FastLogger.info("Processed chunk {}/{} → attempted to insert {} rounds", end, rounds.size(), attempted);
        }
    }

    private int saveAllInternal(List<Round> rounds) {
        if (rounds.isEmpty()) {
            return 0;
        }
        var sb = new StringBuilder(rounds.size() * 48);
        var attempted = 0;
        for (Round r : rounds) {
            if (r == null) continue;
            var startTs = java.time.Instant.ofEpochMilli(r.startTime()).toString();
            var victoryTs = java.time.Instant.ofEpochMilli(r.victoryTime()).toString();
            sb.append(r.roundId()).append('\t')
                    .append(r.cell()).append('\t')
                    .append(r.factor()).append('\t')
                    .append(startTs).append('\t')
                    .append(victoryTs)
                    .append('\n');
            attempted++;
        }
        if (attempted == 0) {
            return 0;
        }
        var copyData = sb.toString();
        try (var conn = dataSource.getConnection()) {
            conn.setAutoCommit(false);
            var copyManager = new CopyManager(conn.unwrap(BaseConnection.class));
            copyManager.copyIn(COPY, new StringReader(copyData));
            try (PreparedStatement ps = conn.prepareStatement(MOVE)) {
                ps.executeUpdate();
            }
            try (Statement stmt = conn.createStatement()) {
                stmt.execute("TRUNCATE round_staging");
            }
            conn.commit();
            return attempted;
        } catch (SQLException | IOException e) {
            FastLogger.error("COPY failed for {} rounds: {}", attempted, e.getMessage(), e);
            return 0;
        }
    }

    public Deque<Round> findAll() {
        try (var conn = dataSource.getConnection(); var stmt = conn.prepareStatement(SELECT_FROM)) {
            var rs = stmt.executeQuery();
            var result = new LinkedList<Round>();
            while (rs.next()) {
                result.add(Round.builder()
                        .roundId(rs.getInt("id"))
                        .cell(rs.getInt("cell"))
                        .factor(rs.getInt("factor"))
                        .startTime(rs.getTimestamp("start_time").toInstant().toEpochMilli())
                        .victoryTime(rs.getTimestamp("victory_time").toInstant().toEpochMilli())
                        .build());
            }
            return result;
        } catch (SQLException e) {
            FastLogger.error("Failed to find all rounds {}", e, e.getMessage());
            return new ArrayDeque<>();
        }
    }

    public void close() {
        if (dataSource != null && !dataSource.isClosed()) {
            dataSource.close();
        }
    }
}
