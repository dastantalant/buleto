package com.traderoom.monitoring.service;

import com.traderoom.core.logging.FastLogger;
import com.traderoom.monitoring.model.Round;
import com.traderoom.monitoring.api.SaveService;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;

public class MonitoringDAO implements SaveService {

    private final HikariDataSource dataSource;

    private static final String INSERT =
            "INSERT INTO round (id, cell, factor, start_time, victory_time) VALUES (?, ?, ?, ?, ?) ON CONFLICT (id) DO NOTHING";

    public MonitoringDAO() {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl("jdbc:postgresql://localhost:5432/buleto");
        config.setUsername("postgres");
        config.setPassword("postgres");
        config.setMaximumPoolSize(10);
        config.setMinimumIdle(2);
        config.setConnectionTimeout(30000);
        config.setIdleTimeout(600000);
        config.addDataSourceProperty("cachePrepStmts", "true");
        config.addDataSourceProperty("prepStmtCacheSize", "250");
        config.addDataSourceProperty("prepStmtCacheSqlLimit", "2048");
        config.addDataSourceProperty("useServerPrepStmts", "true");
        dataSource = new HikariDataSource(config);
    }

    public Round save(Round round) {
        if (round == null) return null;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(INSERT)) {
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

    public void close() {
        if (dataSource != null && !dataSource.isClosed()) {
            dataSource.close();
            FastLogger.info("Database pool closed");
        }
    }
}
