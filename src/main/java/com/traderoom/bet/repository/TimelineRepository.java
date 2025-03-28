package com.traderoom.bet.repository;

import com.traderoom.bet.service.TimelineQueryService;
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
}
