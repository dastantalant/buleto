package com.traderoom.bet.repository;

import com.jsoniter.output.JsonStream;
import com.traderoom.bet.payload.response.BuletoBetween;
import com.traderoom.bet.payload.response.BuletoPage;
import com.traderoom.bet.service.TimelineService;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import com.traderoom.bet.exception.BadRequestException;

@Repository
public class TimelineRepository implements TimelineService {
    private final JdbcClient jdbcClient;

    public TimelineRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }
    public String findAll(int page, int size) {
        if (size > 100) throw new BadRequestException("Size must be less than 100.");

        int offset = page * size;
        final String sql = """
                WITH _timeline AS (SELECT round.round_id                                  AS id,
                                          round.victory_cell_number                       AS cell,
                                          round.start_datetime                            AS sd,
                                          round.bet_close_datetime                        AS bcd,
                                          round.bet_target_datetime                       AS btd,
                                          round.end_datetime                              AS ed,
                                          json_agg(json_build_object('line', timeline.timeline_id, 'wave', timeline.wave_id))
                                          FILTER (WHERE timeline.timeline_id IS NOT NULL) AS timeline
                                   FROM round
                                            LEFT JOIN timeline
                                                      ON timeline.timeline_id BETWEEN round.start_datetime AND round.end_datetime
                                   GROUP BY round.round_id,
                                            round.victory_cell_number,
                                            round.start_datetime,
                                            round.bet_close_datetime,
                                            round.bet_target_datetime,
                                            round.end_datetime
                                   ORDER BY round.round_id DESC
                                   OFFSET ? LIMIT ?)
                SELECT jsonb_agg(row_to_json(_timeline)) AS json
                FROM _timeline
                """;
        String result =  jdbcClient.sql(sql)
                .param(offset)
                .param(size)
                .query(String.class)
                .single();
        return JsonStream.serialize(new BuletoPage(page, size, result));
    }
    public String findAllBetween(long from, long to) {
        if (from > to) throw new BadRequestException("\"from\" must be less \"to\".");
        if(to - from > HOUR) throw new BadRequestException("The difference \"from\" to\" should be less than an hour.");

        final String sql = """
                WITH _timeline AS (SELECT round.round_id                                  AS id,
                                          round.victory_cell_number                       AS cell,
                                          round.start_datetime                            AS sd,
                                          round.bet_close_datetime                        AS bcd,
                                          round.bet_target_datetime                       AS btd,
                                          round.end_datetime                              AS ed,
                                          json_agg(json_build_object('line', timeline.timeline_id, 'wave', timeline.wave_id))
                                          FILTER (WHERE timeline.timeline_id IS NOT NULL) AS timeline
                                   FROM round
                                            LEFT JOIN timeline
                                                      ON timeline.timeline_id BETWEEN round.start_datetime AND round.end_datetime
                                   WHERE round.start_datetime BETWEEN ? AND ?
                                   GROUP BY round.round_id,
                                            round.victory_cell_number,
                                            round.start_datetime,
                                            round.bet_close_datetime,
                                            round.bet_target_datetime,
                                            round.end_datetime
                                   ORDER BY round.round_id DESC)
                SELECT jsonb_agg(row_to_json(_timeline)) AS json
                FROM _timeline
                """;
        String result =  jdbcClient.sql(sql)
                .param(from)
                .param(to)
                .query(String.class)
                .single();
        return JsonStream.serialize(new BuletoBetween(from, to, result));
    }
    public String findAllByDay(long day) {
        if (day == 0) {
            day = System.currentTimeMillis();
        }
        long start = day - (day % DAY);
        long end = start + (DAY - 1);
        final String sql = """
                WITH _timeline AS (SELECT round.round_id            AS id,
                                          round.victory_cell_number AS cell,
                                          round.start_datetime      AS sd,
                                          round.bet_close_datetime  AS bcd,
                                          round.bet_target_datetime AS btd,
                                          round.end_datetime        AS ed
                                   FROM round
                                   WHERE round.start_datetime BETWEEN ? AND ?
                                   ORDER BY round.round_id DESC)
                SELECT jsonb_agg(row_to_json(_timeline)) AS json
                FROM _timeline
                """;
        return jdbcClient.sql(sql)
                .param(start)
                .param(end)
                .query(String.class)
                .single();
    }

    public String findAllByRoundId(long roundId) {
        final String sqlByRoundId = """
                WITH _timeline AS (SELECT round.round_id                                  AS id,
                                          round.victory_cell_number                       AS cell,
                                          round.start_datetime                            AS sd,
                                          round.bet_close_datetime                        AS bcd,
                                          round.bet_target_datetime                       AS btd,
                                          round.end_datetime                              AS ed,
                                          json_agg(json_build_object('line', timeline.timeline_id, 'wave', timeline.wave_id))
                                          FILTER (WHERE timeline.timeline_id IS NOT NULL) AS timeline
                                   FROM round
                                            LEFT JOIN timeline
                                                      ON timeline.timeline_id BETWEEN round.start_datetime AND round.end_datetime
                                   WHERE round.round_id = ?
                                   GROUP BY round.round_id,
                                            round.victory_cell_number,
                                            round.start_datetime,
                                            round.bet_close_datetime,
                                            round.bet_target_datetime,
                                            round.end_datetime
                                   ORDER BY round.round_id DESC)
                SELECT jsonb_agg(row_to_json(_timeline)) AS json
                FROM _timeline
                """;
        return jdbcClient.sql(sqlByRoundId)
                .param(roundId)
                .query(String.class)
                .single();
    }
}
