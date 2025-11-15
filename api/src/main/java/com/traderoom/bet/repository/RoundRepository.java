package com.traderoom.bet.repository;

import com.jsoniter.output.JsonStream;
import com.traderoom.bet.exception.BadRequestException;
import com.traderoom.bet.payload.response.BetweenResponse;
import com.traderoom.bet.payload.response.PageResponse;
import com.traderoom.bet.service.RoundService;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

@Repository
public class RoundRepository implements RoundService {
    private final JdbcClient jdbcClient;

    public RoundRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public String findAll(int page, int size) {
        if (size > 100) throw new BadRequestException("Size must be less than 100.");
        int offset = page * size;
        final String sql = """
                WITH _round AS (
                       SELECT round_id,
                              start_datetime AS sd,
                              end_datetime AS ed,
                              bet_close_datetime AS bcd,
                              bet_target_datetime AS btd,
                              begin_wave_id AS bv,
                              target_wave_id AS tv,
                              start_wave_id AS sv,
                              victory_datetime AS vd,
                              victory_wave_id AS vv,
                              victory_cell_number As vc
                       FROM round
                       ORDER BY round.round_id DESC OFFSET ?
                       LIMIT ?
                )
                SELECT jsonb_agg(row_to_json(_round)) AS json
                FROM _round
                """;
        String result = jdbcClient.sql(sql)
                .param(offset)
                .param(size)
                .query(String.class)
                .optional()
                .orElse("[]");
        return JsonStream.serialize(new PageResponse(page, size, result));
    }

    public String findAllBetween(long from, long to) {
        if (from > to) throw new BadRequestException("\"from\" must be less \"to\".");
        if (to - from > DAY) throw new BadRequestException("The difference \"from\" to\" should be less than an hour.");
        final String sql = """
                WITH _round AS (
                       SELECT round_id,
                              start_datetime AS sd,
                              end_datetime AS ed,
                              bet_close_datetime AS bcd,
                              bet_target_datetime AS btd,
                              begin_wave_id AS bv,
                              target_wave_id AS tv,
                              start_wave_id AS sv,
                              victory_datetime AS vd,
                              victory_wave_id AS vv,
                              victory_cell_number As vc
                       FROM round
                       WHERE start_datetime BETWEEN ? AND ?
                       ORDER BY round.round_id
                )
                SELECT jsonb_agg(row_to_json(_round)) AS json
                FROM _round
                """;
        String result = jdbcClient.sql(sql)
                .param(from)
                .param(to)
                .query(String.class)
                .optional()
                .orElse("[]");
        return JsonStream.serialize(new BetweenResponse(from, to, result));
    }

    public String findAllByRoundId(long roundId) {
        final String sql = """
                WITH _round AS (
                       SELECT round_id,
                              start_datetime AS sd,
                              end_datetime AS ed,
                              bet_close_datetime AS bcd,
                              bet_target_datetime AS btd,
                              begin_wave_id AS bv,
                              target_wave_id AS tv,
                              start_wave_id AS sv,
                              victory_datetime AS vd,
                              victory_wave_id AS vv,
                              victory_cell_number As vc
                       FROM round
                       WHERE round_id = ?
                )
                SELECT jsonb_build_object(
                              'round_id', round_id,
                              'ed', ed,
                              'sd', sd,
                              'bcd', bcd,
                              'btd', btd,
                              'bv', bv,
                              'tv', tv,
                              'sv', sv,
                              'vd', vd,
                              'vv', vv,
                              'vc', vc) AS json
                FROM _round
                """;
        return jdbcClient.sql(sql)
                .param(roundId)
                .query(String.class)
                .optional()
                .orElse("{}");
    }

    public String findLast() {
        String sql = """
                WITH sub AS (
                    SELECT
                        round.round_id,
                        round.start_datetime AS sd,
                        round.end_datetime AS ed,
                        round.bet_close_datetime AS bcd,
                        round.bet_target_datetime AS btd,
                        round.begin_wave_id AS bv,
                        round.target_wave_id AS tv,
                        round.start_wave_id AS sv,
                        round.victory_datetime AS vd,
                        round.victory_wave_id AS vv,
                        round.victory_cell_number AS vc
                    FROM round
                    ORDER BY round_id DESC
                    LIMIT 1
                )
                SELECT json_build_object(
                    'round_id', round_id,
                    'sd', sd,
                    'ed', ed,
                    'bcd', bcd,
                    'btd', btd,
                    'bv', bv,
                    'tv', tv,
                    'sv', sv,
                    'vd', vd,
                    'vv', vv,
                    'vc', vc
                ) FROM sub;
                """;
        return jdbcClient.sql(sql)
                .query(String.class)
                .optional()
                .orElse("{}");
    }
}
