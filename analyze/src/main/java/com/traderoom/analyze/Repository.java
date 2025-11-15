package com.traderoom.analyze;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import lombok.extern.slf4j.Slf4j;

import javax.sql.DataSource;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.Instant;
import java.util.NavigableMap;
import java.util.TreeMap;

@Slf4j
public class Repository {
    private DataSource dataSource;

    private void initConnect() {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl("jdbc:postgresql://localhost:5432/buleto");
        config.setUsername("postgres");
        config.setPassword("postgres");
        config.setDriverClassName("org.postgresql.Driver");

        config.setMaximumPoolSize(10);
        config.setMinimumIdle(5);
        config.setIdleTimeout(60000);
        config.setMaxLifetime(1800000);
        config.setConnectionTimeout(30000);

        dataSource = new HikariDataSource(config);
    }

    @SuppressWarnings("unchecked")
    public NavigableMap<Long, Round> getRound() {
        NavigableMap<Long, Round> rounds;
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream("roundMap"))) {
            rounds = (NavigableMap<Long, Round>) ois.readObject();
        } catch (IOException | ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
        return rounds;
    }

    public NavigableMap<Long, Round> updateFile(){
        NavigableMap<Long, Round>  rounds =getRoundFromDB();
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("roundMap"))) {
            oos.writeObject(rounds);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return rounds;
    }

    public NavigableMap<Long, Round> getRoundFromDB() {
        if (dataSource == null) {
            initConnect();
        }
        NavigableMap<Long, Round> rounds = new TreeMap<>();
        try (Connection connection = dataSource.getConnection()) {
            final String sql = """
                    SELECT round_id id,
                           victory_datetime datetime,
                           victory_cell_number cell
                    FROM round
                    ORDER BY round_id DESC;
                    """;
            PreparedStatement statement = connection.prepareStatement(sql);
            if (statement.execute()) {
                ResultSet resultSet = statement.getResultSet();
                while (resultSet.next()) {
                    rounds.put(resultSet.getLong("id"),
                            Round.builder()
                                    .id(resultSet.getLong("id"))
                                    .unix(resultSet.getLong("datetime"))
                                    .datetime(Instant.ofEpochMilli(resultSet.getLong("datetime")))
                                    .cell(resultSet.getShort("cell"))
                                    .build());
                }
            }
        } catch (SQLException e) {
            log.error(e.getMessage());
        }
        return rounds;
    }
}