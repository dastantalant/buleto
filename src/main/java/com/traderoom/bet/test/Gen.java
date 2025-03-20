package com.traderoom.bet.test;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;

public class Gen {
    String sql = """
                    WITH _insert AS (
                        INSERT INTO wave (value)
                        SELECT ?
                        WHERE NOT EXISTS (SELECT 1 FROM wave WHERE value = ?)
                        RETURNING wave_id
                    ),
                    _wave_id AS (
                        SELECT wave_id FROM _insert
                        UNION
                        SELECT wave_id FROM wave
                        WHERE value = ?
                    )
                    INSERT INTO timeline (line, wave_id)
                    SELECT ?, wave_id
                    FROM _wave_id
                    RETURNING timeline_id
                    """;
    public static void main(String[] args) throws SQLException, ClassNotFoundException {
        String jdbcUrl = "jdbc:postgresql://localhost:5432/buleto";
        String username = "postgres";
        String password = "postgres";

        try (Connection connection = DriverManager.getConnection(jdbcUrl, username, password)) {
            String sql = """
                    WITH _wave AS (
                        INSERT INTO wave (value)
                        VALUES (?)
                        ON CONFLICT (value) DO UPDATE SET value = EXCLUDED.value
                        RETURNING wave_id
                    )
                    INSERT INTO timeline (line, wave_id)
                    SELECT ?, wave_id
                    FROM _wave
                    RETURNING timeline_id
                    """;
            try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
                double value = 5.00001;
                Timestamp currentTime = Timestamp.from(Instant.now());
                LocalDateTime line = LocalDateTime.now();

                preparedStatement.setDouble(1, value);
                preparedStatement.setTimestamp(2, currentTime);

                ResultSet rs = preparedStatement.executeQuery();
                if (rs.next()) {
                    long timelineId = rs.getLong("timeline_id");
                    System.out.println("Created timeline_id: " + timelineId);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private void generate() throws SQLException, ClassNotFoundException {
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
