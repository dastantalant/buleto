package com.traderoom.monitoring.sandbox.round.repository;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

public class DataSource {

    private static HikariConfig config = new HikariConfig();
    private static HikariDataSource dataSource;
    private static Properties properties;

    static {
        try  {
            properties = new Properties();
            ClassLoader loader = Thread.currentThread().getContextClassLoader();
            InputStream stream = loader.getResourceAsStream("application.properties");
            properties.load(stream);
        } catch (IOException e) {
            e.printStackTrace();
        }
        String driverClassName = properties.getProperty("datasource.driver-class-name");
        String url = properties.getProperty("datasource.url");
        String username = properties.getProperty("datasource.username");
        String password = properties.getProperty("datasource.password");

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