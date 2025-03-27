package com.traderoom.bet.web.repository;

import com.traderoom.bet.web.payload.response.TimelineVictory;
import com.traderoom.bet.web.service.TimelineQueryService;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

@Repository
public class TimelineQueryRepository implements TimelineQueryService {
    private final String sql_timeline = """
            WITH _timeline AS (SELECT timeline.timeline_id AS timeline,
                                      cell.cell_number     AS cell
                               FROM timeline
                                        INNER JOIN cell_victory ON timeline.timeline_id = cell_victory.timeline_id
                                        INNER JOIN cell ON cell_victory.cell_id = cell.cell_id
                               WHERE is_bullet = TRUE
                               ORDER BY timeline.timeline_id DESC
                               OFFSET ? LIMIT ?)
            SELECT jsonb_agg(row_to_json(_timeline)) AS json
            FROM _timeline
            """;
    private final String sql_timeline_of_day = """
            WITH
                _timeline AS (
                    SELECT COUNT(timeline.timeline_id) AS count, cell.cell_number AS cell
                    FROM
                        timeline
                        INNER JOIN cell_victory ON timeline.timeline_id = cell_victory.timeline_id
                        INNER JOIN cell ON cell_victory.cell_id = cell.cell_id
                    WHERE
                        is_bullet = TRUE
                        AND timeline.timeline_id > ?
                        AND timeline.timeline_id < ?
                    GROUP BY
                        cell.cell_number
                    ORDER BY cell.cell_number
                )
            SELECT jsonb_agg(row_to_json(_timeline)) AS json
            FROM _timeline
            """;
    private final JdbcClient jdbcClient;
    private final JdbcTemplate jdbcTemplate;

    public TimelineQueryRepository(JdbcClient jdbcClient, JdbcTemplate jdbcTemplate) {
        this.jdbcClient = jdbcClient;
        this.jdbcTemplate = jdbcTemplate;
    }

    public String findAll(int page, int size) {
        int offset = page * size;
        return jdbcClient.sql(sql_timeline)
                .param(offset)
                .param(size)
                .query(String.class)
                .single();
    }

    public String findAllByDate(long unix) {
        if (unix == 0) {
            unix = System.currentTimeMillis();
        }
        long start = unix - (unix % 86400000);
        long end = start + 86399999;
        String cells = jdbcClient.sql(sql_timeline_of_day)
                .param(start)
                .param(end)
                .query(String.class)
                .single();
        return cells;
    }

    public static void main(String[] args) {
        // 1. Получаем текущее время в Unix Epoch в миллисекундах
        long unix = System.currentTimeMillis();
        // 2. Вычисляем начало дня в миллисекундах
        long start = unix - (unix % 86400000);
        // 3. Вычисляем конец дня в миллисекундах
        long end = start + 86399999;
        System.out.println(Instant.ofEpochMilli(unix));
        System.out.println(Instant.ofEpochMilli(start));
        System.out.println(Instant.ofEpochMilli(end));

        // 1. Получаем текущее время в Unix Epoch (в секундах)
        long currentEpoch = System.currentTimeMillis() / 1000;
        System.out.println(Instant.ofEpochMilli(currentEpoch));
        // 2. Вычисляем начало дня
        // 86400 - количество секунд в сутках
        long startOfDay = currentEpoch - (currentEpoch % 86400);
        System.out.println(Instant.ofEpochMilli(startOfDay));
        // 3. Вычисляем конец дня
        // Добавляем 86399 секунд (23:59:59) к началу дня
        long endOfDay = startOfDay + 86399;
        System.out.println(Instant.ofEpochMilli(endOfDay));
    }

//    public static void main(String[] args) {
//        HikariConfig config = new HikariConfig();
//        config.setDriverClassName("org.postgresql.Driver");
//        config.setJdbcUrl("jdbc:postgresql://localhost:5432/buleto");
//        config.setUsername("postgres");
//        config.setPassword("postgres");
//        HikariDataSource dataSource = new HikariDataSource(config);
//
//        JdbcClient jdbcClient = JdbcClient.create(dataSource);
//        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
//        TimelineQueryRepository service = new TimelineQueryRepository(jdbcClient, jdbcTemplate);
//    }
}
