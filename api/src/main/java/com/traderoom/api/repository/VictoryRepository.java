package com.traderoom.api.repository;

import com.jsoniter.output.JsonStream;
import com.traderoom.api.payload.response.BetweenResponse;
import com.traderoom.api.service.VictoryService;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

@Repository
public class VictoryRepository implements VictoryService {
    private final JdbcClient jdbcClient;

    public VictoryRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public String findAllByBetween(long from, long to) {
        String sql = """
                WITH _cell AS (
                    SELECT
                       round.victory_cell_number AS c,
                       COUNT(round.round_id) AS count
                    FROM round
                    WHERE round.start_datetime BETWEEN ? AND ?
                    GROUP BY round.victory_cell_number
                    ORDER BY round.victory_cell_number)
                SELECT jsonb_agg(row_to_json(_cell)) AS json
                FROM _cell
                """;
        String result = jdbcClient.sql(sql)
                .param(from)
                .param(to)
                .query(String.class)
                .optional()
                .orElse("[]");
        return JsonStream.serialize(new BetweenResponse(from, to, result));
    }

    public String findAllStatisticByBetween(long start, long end) {
        String sql = """
                WITH hourly_groups AS (
                    SELECT (round.start_datetime / 3600000 * 3600000) AS line,
                        round.victory_cell_number AS c,
                        COUNT(*) AS count
                    FROM round
                    WHERE round.start_datetime BETWEEN ? AND ?
                    GROUP BY (round.start_datetime / 3600000 * 3600000),
                        round.victory_cell_number)
                SELECT jsonb_agg(jsonb_build_object('line', line, 'cls', cls)) AS result
                FROM (SELECT line,
                          jsonb_agg(jsonb_build_object('c', c, 'count', count)) AS cls
                      FROM hourly_groups
                      GROUP BY line
                      ORDER BY line) subquery;
                """;
        String result = jdbcClient.sql(sql)
                .param(start)
                .param(end)
                .query(String.class)
                .optional()
                .orElse("[]");
        return JsonStream.serialize(new BetweenResponse(start, end, result));
    }

    public String findAllWithLineByBetween(long from, long to) {
        String sql = """
                WITH round AS (
                    SELECT round.round_id,
                        round.start_datetime,
                        round.end_datetime,
                        round.bet_close_datetime,
                        round.bet_target_datetime,
                        round.begin_wave_id,
                        round.target_wave_id,
                        round.start_wave_id,
                        round.victory_datetime,
                        round.victory_wave_id,
                        round.victory_cell_number
                    FROM round
                    WHERE round.start_datetime BETWEEN ? AND ?
                    ORDER BY start_datetime
                )
                SELECT json_agg(
                        json_build_object(
                            'round_id', round.round_id,
                            'sd', round.start_datetime,
                            'ed', round.end_datetime,
                            'bcd', round.bet_close_datetime,
                            'btd', round.bet_target_datetime,
                            'bv', round.begin_wave_id,
                            'tv', round.target_wave_id,
                            'sv', round.start_wave_id,
                            'vd', round.victory_datetime,
                            'vv', round.victory_wave_id,
                            'vc', round.victory_cell_number
                        )
                    )
                FROM round;
                """;
        String result = jdbcClient.sql(sql)
                .param(from)
                .param(to)
                .query(String.class)
                .optional()
                .orElse("[]");
        return JsonStream.serialize(new BetweenResponse(from, to, result));
    }
}
