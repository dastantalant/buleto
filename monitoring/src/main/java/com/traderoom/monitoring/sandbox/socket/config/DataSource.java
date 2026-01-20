package com.traderoom.monitoring.sandbox.socket.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import java.sql.Connection;
import java.sql.SQLException;

public class DataSource {

    private static final HikariConfig config;
    private static final HikariDataSource dataSource;

    static {
        String driverClassName = Resource.get("datasource.driver-class-name");
        String url = Resource.get("datasource.url");
        String username = Resource.get("datasource.username");
        String password = Resource.get("datasource.password");

        config = new HikariConfig();
        config.setDriverClassName(driverClassName);
        config.setJdbcUrl(url);
        config.setUsername(username);
        config.setPassword(password);
        config.addDataSourceProperty("cachePrepStmts", "true");
        config.addDataSourceProperty("prepStmtCacheSize", "250");
        config.addDataSourceProperty("prepStmtCacheSqlLimit", "2048");
        dataSource = new HikariDataSource(config);
        try {
            getConnection();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private DataSource() {
    }

    public static Connection getConnection() throws SQLException {
        return dataSource.getConnection();
    }
}