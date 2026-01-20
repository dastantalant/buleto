package com.traderoom.monitoring.sandbox.playwright.config;

import com.traderoom.monitoring.sandbox.playwright.Main;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import java.sql.Connection;
import java.sql.SQLException;

public class DataSource {

    private static HikariConfig config = new HikariConfig();
    private static HikariDataSource dataSource;

    static {
        String driverClassName = Main.properties.getProperty("datasource.driver-class-name");
        String url = Main.properties.getProperty("datasource.url");
        String username = Main.properties.getProperty("datasource.username");
        String password = Main.properties.getProperty("datasource.password");

        config.setDriverClassName(driverClassName);
        config.setJdbcUrl(url);
        config.setUsername(username);
        config.setPassword(password);
        config.addDataSourceProperty("cachePrepStmts", "true");
        config.addDataSourceProperty("prepStmtCacheSize", "250");
        config.addDataSourceProperty("prepStmtCacheSqlLimit", "2048");
        dataSource = new HikariDataSource(config);
    }

    private DataSource() {
    }

    public static Connection getConnection() throws SQLException {
        return dataSource.getConnection();
    }
}