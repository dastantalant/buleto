package com.buleto.core.service;

import com.buleto.core.model.Round;
import com.buleto.core.model.RoundModel;
import com.toolbox.core.logging.FastLogger;
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
import java.time.Instant;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;

public class RoundDAO implements SaveService {
    private static final String FIELDS = " id, cell, factor, start_time, victory_time, begin_value, target_value, start_value, end_time, closed_time, target_time ";
    private static final String SELECT_FROM = " SELECT " + FIELDS + " FROM round ORDER BY id DESC ";
    private static final String CONFLICT = """
            ON CONFLICT (id)
            DO UPDATE SET
                cell         = EXCLUDED.cell,
                factor       = EXCLUDED.factor,
                start_time   = EXCLUDED.start_time,
                victory_time = EXCLUDED.victory_time,
                begin_value  = EXCLUDED.begin_value,
                target_value = EXCLUDED.target_value,
                start_value  = EXCLUDED.start_value,
                end_time     = EXCLUDED.end_time,
                closed_time  = EXCLUDED.closed_time,
                target_time  = EXCLUDED.target_time
            """;
    private static final String INSERT_BASE = " INSERT INTO round (" + FIELDS + ") ";
    private static final String UPSERT = INSERT_BASE + " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) " + CONFLICT;
    private static final String MOVE = " INSERT INTO round (" + FIELDS + ") SELECT " + FIELDS + " FROM round_staging " + CONFLICT;
    private static final String COPY = "COPY round_staging (" + FIELDS + ") FROM STDIN";
    private static final int CHUNK_SIZE = 50_000;

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
        this.dataSource = new HikariDataSource(config);
        initializeSchema();
    }

    public RoundDAO(HikariDataSource dataSource) {
        this.dataSource = dataSource;
        initializeSchema();
    }

    private void initializeSchema() {
        var createSql = """
                CREATE TABLE IF NOT EXISTS round (
                    id           BIGINT PRIMARY KEY,
                    cell         INT,
                    factor       INT,
                    start_time   TIMESTAMPTZ,
                    victory_time TIMESTAMPTZ,
                    begin_value  INT,
                    target_value INT,
                    start_value  INT,
                    end_time     TIMESTAMPTZ,
                    closed_time  TIMESTAMPTZ,
                    target_time  TIMESTAMPTZ
                );
                CREATE INDEX IF NOT EXISTS idx_victory_time ON round (victory_time);
                
                CREATE TABLE IF NOT EXISTS round_staging (
                    id           BIGINT,
                    cell         INT,
                    factor       INT,
                    start_time   TIMESTAMPTZ,
                    victory_time TIMESTAMPTZ,
                    begin_value  INT,
                    target_value INT,
                    start_value  INT,
                    end_time     TIMESTAMPTZ,
                    closed_time  TIMESTAMPTZ,
                    target_time  TIMESTAMPTZ
                );
                """;

        var migrationSql = """
                ALTER TABLE round ADD COLUMN IF NOT EXISTS cell INT;
                ALTER TABLE round ADD COLUMN IF NOT EXISTS factor INT;
                ALTER TABLE round ADD COLUMN IF NOT EXISTS start_time TIMESTAMPTZ;
                ALTER TABLE round ADD COLUMN IF NOT EXISTS victory_time TIMESTAMPTZ;
                ALTER TABLE round ADD COLUMN IF NOT EXISTS begin_value INT;
                ALTER TABLE round ADD COLUMN IF NOT EXISTS target_value INT;
                ALTER TABLE round ADD COLUMN IF NOT EXISTS start_value INT;
                ALTER TABLE round ADD COLUMN IF NOT EXISTS end_time TIMESTAMPTZ;
                ALTER TABLE round ADD COLUMN IF NOT EXISTS closed_time TIMESTAMPTZ;
                ALTER TABLE round ADD COLUMN IF NOT EXISTS target_time TIMESTAMPTZ;

                ALTER TABLE round_staging ADD COLUMN IF NOT EXISTS cell INT;
                ALTER TABLE round_staging ADD COLUMN IF NOT EXISTS factor INT;
                ALTER TABLE round_staging ADD COLUMN IF NOT EXISTS start_time TIMESTAMPTZ;
                ALTER TABLE round_staging ADD COLUMN IF NOT EXISTS victory_time TIMESTAMPTZ;
                ALTER TABLE round_staging ADD COLUMN IF NOT EXISTS begin_value INT;
                ALTER TABLE round_staging ADD COLUMN IF NOT EXISTS target_value INT;
                ALTER TABLE round_staging ADD COLUMN IF NOT EXISTS start_value INT;
                ALTER TABLE round_staging ADD COLUMN IF NOT EXISTS end_time TIMESTAMPTZ;
                ALTER TABLE round_staging ADD COLUMN IF NOT EXISTS closed_time TIMESTAMPTZ;
                ALTER TABLE round_staging ADD COLUMN IF NOT EXISTS target_time TIMESTAMPTZ;
                """;

        try (var conn = dataSource.getConnection(); var stmt = conn.createStatement()) {
            stmt.execute(createSql);
            stmt.execute(migrationSql);
        } catch (SQLException e) {
            FastLogger.error("Failed to initialize or migrate schema", e);
        }
    }

    public RoundModel save(RoundModel model) {
        if (model == null) return null;
        try (var conn = dataSource.getConnection(); var ps = conn.prepareStatement(UPSERT)) {
            int i = 1;
            ps.setLong(i++, model.roundId());
            ps.setInt(i++, model.cell());
            ps.setInt(i++, model.factor());

            ps.setTimestamp(i++, model.startTime() != null ? Timestamp.from(model.startTime()) : null);
            ps.setTimestamp(i++, model.victoryTime() != null ? Timestamp.from(model.victoryTime()) : null);

            ps.setInt(i++, model.beginValue());
            ps.setInt(i++, model.targetValue());
            ps.setInt(i++, model.startValue());

            ps.setTimestamp(i++, model.endTime() != null ? Timestamp.from(model.endTime()) : null);
            ps.setTimestamp(i++, model.closedTime() != null ? Timestamp.from(model.closedTime()) : null);
            ps.setTimestamp(i++, model.targetTime() != null ? Timestamp.from(model.targetTime()) : null);

            ps.executeUpdate();
        } catch (SQLException e) {
            FastLogger.error("Error saving round model " + model.roundId(), e);
        }
        return model;
    }

    public Round save(Round round) {
        if (round == null) return null;
        try (var conn = dataSource.getConnection(); var ps = conn.prepareStatement(UPSERT)) {
            int i = 1;
            ps.setLong(i++, round.roundId());
            ps.setInt(i++, round.cell());
            ps.setInt(i++, round.factor());
            ps.setTimestamp(i++, round.startTime() > 0 ? new Timestamp(round.startTime()) : null);
            ps.setTimestamp(i++, round.victoryTime() > 0 ? new Timestamp(round.victoryTime()) : null);

            ps.setInt(i++, round.beginValue());
            ps.setInt(i++, round.targetValue());
            ps.setInt(i++, round.startValue());

            ps.setTimestamp(i++, round.endTime() > 0 ? new Timestamp(round.endTime()) : null);
            ps.setTimestamp(i++, round.closedTime() > 0 ? new Timestamp(round.closedTime()) : null);
            ps.setTimestamp(i++, round.targetTime() > 0 ? new Timestamp(round.targetTime()) : null);

            ps.executeUpdate();
        } catch (SQLException e) {
            FastLogger.error("Error saving round " + round.roundId(), e);
        }
        return round;
    }

    public void saveAllModels(List<RoundModel> models) {
        if (models == null || models.isEmpty()) {
            return;
        }
        for (int i = 0; i < models.size(); i += CHUNK_SIZE) {
            int end = Math.min(i + CHUNK_SIZE, models.size());
            var chunk = models.subList(i, end);
            var attempted = saveAllModelsInternal(chunk);
            FastLogger.info("Processed chunk {}/{} -> attempted to insert {} round models", end, models.size(), attempted);
        }
    }

    private int saveAllModelsInternal(List<RoundModel> models) {
        if (models == null || models.isEmpty()) {
            return 0;
        }
        var sb = new StringBuilder(models.size() * 150);
        for (RoundModel model : models) {
            if (model == null) continue;
            String startTs = model.startTime() != null ? model.startTime().toString() : "\\N";
            String victoryTs = model.victoryTime() != null ? model.victoryTime().toString() : "\\N";
            String endTs = model.endTime() != null ? model.endTime().toString() : "\\N";
            String closedTs = model.closedTime() != null ? model.closedTime().toString() : "\\N";
            String targetTs = model.targetTime() != null ? model.targetTime().toString() : "\\N";
            sb.append(model.roundId()).append('\t')
                    .append(model.cell()).append('\t')
                    .append(model.factor()).append('\t')
                    .append(startTs).append('\t')
                    .append(victoryTs).append('\t')
                    .append(model.beginValue()).append('\t')
                    .append(model.targetValue()).append('\t')
                    .append(model.startValue()).append('\t')
                    .append(endTs).append('\t')
                    .append(closedTs).append('\t')
                    .append(targetTs)
                    .append('\n');
        }
        executeCopy(sb.toString());
        return models.size();
    }

    public void saveAll(List<Round> rounds) {
        if (rounds == null || rounds.isEmpty()) {
            return;
        }
        for (int i = 0; i < rounds.size(); i += CHUNK_SIZE) {
            int end = Math.min(i + CHUNK_SIZE, rounds.size());
            var chunk = rounds.subList(i, end);
            var attempted = saveAllInternal(chunk);
            FastLogger.info("Processed chunk {}/{} -> attempted to insert {} rounds", end, rounds.size(), attempted);
        }
    }

    private int saveAllInternal(List<Round> rounds) {
        if (rounds == null || rounds.isEmpty()) {
            return 0;
        }
        executeCopy(build(rounds));
        return rounds.size();
    }

    private void executeCopy(String copyData) {
        try (var conn = dataSource.getConnection()) {
            conn.setAutoCommit(false);
            var copyManager = new CopyManager(conn.unwrap(BaseConnection.class));
            try (Statement stmt = conn.createStatement()) {
                stmt.execute("TRUNCATE round_staging");
            }
            copyManager.copyIn(COPY, new StringReader(copyData));
            try (PreparedStatement ps = conn.prepareStatement(MOVE)) {
                ps.executeUpdate();
            }
            try (Statement stmt = conn.createStatement()) {
                stmt.execute("TRUNCATE round_staging");
            }
            conn.commit();
        } catch (SQLException | IOException e) {
            FastLogger.error("COPY failed rounds", e);
        }
    }

    private String build(List<Round> rounds) {
        var sb = new StringBuilder(rounds.size() * 128);
        for (Round r : rounds) {
            if (r == null) continue;
            String startTs = r.startTime() > 0 ? Instant.ofEpochMilli(r.startTime()).toString() : "\\N";
            String victoryTs = r.victoryTime() > 0 ? Instant.ofEpochMilli(r.victoryTime()).toString() : "\\N";
            String endTs = r.endTime() > 0 ? Instant.ofEpochMilli(r.endTime()).toString() : "\\N";
            String closedTs = r.closedTime() > 0 ? Instant.ofEpochMilli(r.closedTime()).toString() : "\\N";
            String targetTs = r.targetTime() > 0 ? Instant.ofEpochMilli(r.targetTime()).toString() : "\\N";
            sb.append(r.roundId()).append('\t')
                    .append(r.cell()).append('\t')
                    .append(r.factor()).append('\t')
                    .append(startTs).append('\t')
                    .append(victoryTs).append('\t')
                    .append(r.beginValue()).append('\t')
                    .append(r.targetValue()).append('\t')
                    .append(r.startValue()).append('\t')
                    .append(endTs).append('\t')
                    .append(closedTs).append('\t')
                    .append(targetTs)
                    .append('\n');
        }
        return sb.toString();
    }

    public Deque<Round> findAll() {
        try (var conn = dataSource.getConnection(); var stmt = conn.prepareStatement(SELECT_FROM)) {
            var rs = stmt.executeQuery();
            var result = new LinkedList<Round>();
            while (rs.next()) {
                Timestamp startTs = rs.getTimestamp("start_time");
                Timestamp victoryTs = rs.getTimestamp("victory_time");
                Timestamp endTs = rs.getTimestamp("end_time");
                Timestamp closedTs = rs.getTimestamp("closed_time");
                Timestamp targetTs = rs.getTimestamp("target_time");
                result.add(Round.builder()
                        .roundId(rs.getLong("id"))
                        .cell(rs.getInt("cell"))
                        .startTime(startTs != null ? startTs.toInstant().toEpochMilli() : 0L)
                        .victoryTime(victoryTs != null ? victoryTs.toInstant().toEpochMilli() : 0L)
                        .factor(rs.getInt("factor"))
                        .beginValue(rs.getInt("begin_value"))
                        .targetValue(rs.getInt("target_value"))
                        .startValue(rs.getInt("start_value"))
                        .endTime(endTs != null ? endTs.toInstant().toEpochMilli() : 0L)
                        .closedTime(closedTs != null ? closedTs.toInstant().toEpochMilli() : 0L)
                        .targetTime(targetTs != null ? targetTs.toInstant().toEpochMilli() : 0L)
                        .build());
            }
            return result;
        } catch (SQLException e) {
            FastLogger.error("Failed to find all rounds", e);
            return new ArrayDeque<>();
        }
    }

    public void close() {
        if (dataSource != null && !dataSource.isClosed()) {
            dataSource.close();
        }
    }
}