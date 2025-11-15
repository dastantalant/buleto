package com.traderoom.bet.repository;

import com.jsoniter.output.JsonStream;
import com.traderoom.bet.exception.BadRequestException;
import com.traderoom.bet.payload.response.BetweenResponse;
import com.traderoom.bet.payload.response.PageResponse;
import com.traderoom.bet.service.TimelineService;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

@Repository
public class TimelineRepository implements TimelineService {
    private final JdbcClient jdbcClient;

    public TimelineRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public String findAll(int page, int size) {
        if (size > 50) throw new BadRequestException("Size must be less than 50.");

        int offset = page * size;
        final String sql = """
                WITH _timeline AS (
                       SELECT round.round_id,
                              round.start_datetime AS sd,
                              round.bet_close_datetime AS bcd,
                              round.bet_target_datetime AS btd,
                              round.end_datetime AS ed,
                              round.victory_datetime AS vd,
                              round.victory_cell_number AS vc,
                              round.victory_wave_id AS vv,
                              json_agg(json_build_object('line', timeline.timeline_id, 'wave', timeline.wave_id))
                              FILTER (WHERE timeline.timeline_id IS NOT NULL) AS timeline
                       FROM round
                              LEFT JOIN timeline ON timeline.timeline_id
                              BETWEEN round.start_datetime AND round.end_datetime
                       GROUP BY round.round_id,
                              round.start_datetime,
                              round.bet_close_datetime,
                              round.bet_target_datetime,
                              round.end_datetime,
                              round.victory_datetime,
                              round.victory_cell_number,
                              round.victory_wave_id
                       ORDER BY round.round_id DESC
                       OFFSET ? LIMIT ?
                )
                SELECT jsonb_agg(row_to_json(_timeline)) AS json
                FROM _timeline
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
        if (to - from > HOUR)
            throw new BadRequestException("The difference \"from\" to\" should be less than an hour.");

        final String sql = """
                WITH _timeline AS (
                       SELECT round.round_id,
                              round.start_datetime AS sd,
                              round.bet_close_datetime AS bcd,
                              round.bet_target_datetime AS btd,
                              round.end_datetime AS ed,
                              round.victory_datetime AS vd,
                              round.victory_cell_number AS vc,
                              round.victory_wave_id AS vv,
                              json_agg(json_build_object('line', timeline.timeline_id, 'wave', timeline.wave_id))\s
                              FILTER (WHERE timeline.timeline_id IS NOT NULL) AS timeline
                       FROM round
                              LEFT JOIN timeline ON timeline.timeline_id\s
                              BETWEEN round.start_datetime AND round.end_datetime
                       WHERE round.start_datetime BETWEEN ? AND ?
                       GROUP BY round.round_id,
                              round.start_datetime,
                              round.bet_close_datetime,
                              round.bet_target_datetime,
                              round.end_datetime,
                              round.victory_datetime,
                              round.victory_cell_number,
                              round.victory_wave_id
                       ORDER BY round.round_id DESC
                )
                SELECT jsonb_agg(row_to_json(_timeline)) AS json
                FROM _timeline
                """;
        String result = jdbcClient.sql(sql)
                .param(from)
                .param(to)
                .query(String.class)
                .optional()
                .orElse("[]");
        return JsonStream.serialize(new BetweenResponse(from, to, result));
    }

    public String findAllByDay(long day) {
        if (day < DAY) {
            day = System.currentTimeMillis();
        }
        long start = day - (day % DAY);
        long end = start + (DAY - 1);
        final String sql = """
                WITH _timeline AS (
                       SELECT round.round_id,
                              round.start_datetime AS sd,
                              round.bet_close_datetime AS bcd,
                              round.bet_target_datetime AS btd,
                              round.end_datetime AS ed,
                              round.victory_datetime AS vd,
                              round.victory_cell_number AS vc,
                              round.victory_wave_id AS vv
                       FROM round
                       WHERE round.start_datetime BETWEEN ? AND ?
                       ORDER BY round.round_id DESC
                )
                SELECT jsonb_agg(row_to_json(_timeline)) AS json
                FROM _timeline
                """;
        String result = jdbcClient.sql(sql)
                .param(start)
                .param(end)
                .query(String.class)
                .optional()
                .orElse("[]");
        return JsonStream.serialize(new BetweenResponse(start, end, result));
    }

    public String findAllByRoundId(long roundId) {
        final String sqlByRoundId = """
                WITH _timeline AS (
                       SELECT round.round_id,
                              round.victory_cell_number AS vc,
                              round.start_datetime AS sd,
                              round.bet_close_datetime AS bcd,
                              round.bet_target_datetime AS btd,
                              round.end_datetime AS ed,
                              json_agg(json_build_object('line', timeline.timeline_id, 'wave', timeline.wave_id))\s
                              FILTER (WHERE timeline.timeline_id IS NOT NULL) AS timeline
                       FROM round
                              LEFT JOIN timeline ON timeline.timeline_id BETWEEN round.start_datetime AND round.end_datetime
                       WHERE round.round_id = ?
                       GROUP BY round.round_id,
                              round.victory_cell_number,
                              round.start_datetime,
                              round.bet_close_datetime,
                              round.bet_target_datetime,
                              round.end_datetime
                       ORDER BY round.round_id DESC
                )
                SELECT jsonb_build_object(
                              'round_id', round_id,
                              'vc', vc,
                              'sd', sd,
                              'bcd', bcd,
                              'btd', btd,
                              'ed', ed,
                              'timeline', timeline) AS json
                FROM _timeline
                """;
        return jdbcClient.sql(sqlByRoundId)
                .param(roundId)
                .query(String.class)
                .optional()
                .orElse("{}");
    }
}
