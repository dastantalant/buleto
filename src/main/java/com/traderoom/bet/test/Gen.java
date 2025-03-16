package com.traderoom.bet.test;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Gen {
    public static void main(String[] args) throws SQLException, ClassNotFoundException {
        double start = 0.00001;
        double end = 9.99999;
        double step = 0.00001;

        String jdbcUrl = "jdbc:postgresql://localhost:5432/buleto";
        String username = "postgres";
        String password = "postgres";

        Class.forName("org.postgresql.Driver");
        Connection connection = DriverManager.getConnection(jdbcUrl, username, password);

        String sql = "INSERT INTO wave(value) VALUES (?)";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        int i = 0;
        for (double value = start; value <= end; value += step) {
            preparedStatement.setDouble(1, value);
            preparedStatement.addBatch();
            i++;
            if (i == 100) {
                preparedStatement.executeBatch();
                i = 0;
            }
        }
        preparedStatement.executeBatch();
        connection.close();
    }
}
