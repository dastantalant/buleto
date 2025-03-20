package com.traderoom.bet.test;

import com.traderoom.bet.web.repository.TimelineRepository;
import com.traderoom.bet.web.service.TimelineService;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.InstantSource;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.TimeUnit;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.JdbcClient;

public class LocalDateTimeTest {
    private static final String TIMELINE = "SELECT insert_timeline(?, ?::numeric(6, 5));";
    private static final String BULLET = "SELECT insert_timeline_with_bullet(?, ?::numeric(6, 5), true);";
    private static final String ROUND = "SELECT insert_timeline_with_round(?, ?::numeric(6, 5), true);";
    private static final String CELL = "SELECT insert_cell(?::numeric(6, 5), ?::int2, ?::int8);";

    public static void main(String[] args) throws SQLException {
//        Instant instant = Instant.now();
//        Timestamp timestamp = Timestamp.from(instant);
//        System.out.println(instant);
//        System.out.println(timestamp);

//        HikariConfig config = new HikariConfig();
//        config.setDriverClassName("org.postgresql.Driver");
//        config.setJdbcUrl("jdbc:postgresql://localhost:5432/buleto");
//        config.setUsername("postgres");
//        config.setPassword("postgres");
//        HikariDataSource dataSource = new HikariDataSource(config);
//
//        JdbcClient jdbcClient = JdbcClient.create(dataSource);
//        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
//        TimelineRepository service = new TimelineRepository(jdbcClient, jdbcTemplate);
//
////        service.saveTimeline(epoch, 5.00001, null);
//        service.saveTimeline(System.currentTimeMillis(), 5.00001, null);
//        String jdbcUrl = "jdbc:postgresql://localhost:5432/buleto";
//        String username = "postgres";
//        String password = "postgres";
//
//        long unix = System.currentTimeMillis();
//        long unix0 = System.currentTimeMillis() / 1000;
//        System.out.println(unix + " " + unix0);
//
//        long unix1 = Instant.now().getEpochSecond();
//
//        InstantSource testingSource = InstantSource.fixed(Instant.now());
//        long unix2 = testingSource.instant().getEpochSecond();
//
//        long unix3 = TimeUnit.MILLISECONDS.toSeconds(System.currentTimeMillis());
//        System.out.println(unix1 + " " + unix2 + " " + unix3);
//
//        Timestamp timestamp = new Timestamp(unix);
//        System.out.println(timestamp);
//        ZoneOffset.UTC

//        try (Connection connection = DriverManager.getConnection(jdbcUrl, username, password)) {
//            String sql = """
//            SELECT insert_timeline(?, to_timestamp(? / 1000), ?::numeric(6,5));
//            """;
//            PreparedStatement statement = connection.prepareStatement(sql);
//            statement.setLong(1, unix);
//            statement.setLong(2, unix);
//            statement.setDouble(3, 5.00001);
//            ResultSet rs = statement.executeQuery();
//            if (rs.next()) {
//                long timelineId = rs.getLong(1);
//                System.out.println("Created timeline_id: " + timelineId);
//            }
//        }
    }
}
