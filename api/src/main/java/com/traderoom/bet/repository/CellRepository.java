package com.traderoom.bet.repository;

import com.jsoniter.output.JsonStream;
import com.traderoom.bet.exception.BadRequestException;
import com.traderoom.bet.payload.response.BetweenResponse;
import com.traderoom.bet.payload.response.PageResponse;
import com.traderoom.bet.service.CellService;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

@Repository
public class CellRepository implements CellService {
    private final JdbcClient jdbcClient;

    public CellRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public String findAll(int page, int size) {
        if (size > 100) throw new BadRequestException("Size must be less than 100.");
        int offset = page * size;
        String sql = """
                WITH _round AS (
                       SELECT round_cell.round_id,
                              round.start_datetime AS sd,
                              round.begin_wave_id AS bv,
                              round.victory_cell_number AS vc,
                              round.victory_wave_id AS vv,
                              json_agg(cell.cell_id) as cls
                       FROM cell
                              INNER JOIN round_cell ON cell.cell_id = round_cell.cell_id
                              INNER JOIN round ON round_cell.round_id = round.round_id
                       GROUP BY round_cell.round_id,
                              round.start_datetime,
                              round.begin_wave_id,
                              round.victory_cell_number,
                              round.victory_wave_id
                       OFFSET ? LIMIT ?
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
        if (to - from > HOUR)
            throw new BadRequestException("The difference \"from\" to\" should be less than an hour.");
        String sql = """
                WITH _cell AS (
                       SELECT round_cell.round_id,
                              round.start_datetime AS sd,
                              round.begin_wave_id AS bv,
                              round.victory_cell_number AS vc,
                              round.victory_wave_id AS vv,
                              json_agg(cell.cell_id) as cls
                       FROM cell
                              INNER JOIN round_cell ON cell.cell_id = round_cell.cell_id
                              INNER JOIN round ON round_cell.round_id = round.round_id
                       WHERE start_datetime BETWEEN ? AND ?
                       GROUP BY round_cell.round_id,
                              round.start_datetime,
                              round.begin_wave_id,
                              round.victory_cell_number,
                              round.victory_wave_id
                )
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

    public String findAllByDay(long day) {
        if (day == 0) {
            day = System.currentTimeMillis();
        }
        long start = day - (day % DAY);
        long end = start + (DAY - 1);
        final String sql = """
                WITH _cell AS (
                       SELECT round_cell.round_id,
                              round.start_datetime AS sd,
                              round.begin_wave_id AS bv,
                              round.victory_cell_number AS vc,
                              round.victory_wave_id AS vv,
                              cell.cell_id
                       FROM cell
                              INNER JOIN round_cell ON cell.cell_id = round_cell.cell_id
                              INNER JOIN round ON round_cell.round_id = round.round_id
                       WHERE round.start_datetime BETWEEN ? AND ?
                       ORDER BY round.round_id
                )
                SELECT jsonb_agg(row_to_json(_cell)) AS json
                FROM _cell
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
        final String sql = """
                WITH _round AS (
                       SELECT round_cell.round_id,
                              round.start_datetime AS sd,
                              round.begin_wave_id AS bv,
                              round.victory_cell_number AS vc,
                              round.victory_wave_id AS vv,
                              json_agg (cell.cell_id) as cls
                       FROM cell
                              INNER JOIN round_cell ON cell.cell_id = round_cell.cell_id
                              INNER JOIN round ON round_cell.round_id = round.round_id
                       WHERE round.round_id = ?
                       GROUP BY round_cell.round_id,
                              round.start_datetime,
                              round.begin_wave_id,
                              round.victory_cell_number,
                              round.victory_wave_id
                )
                SELECT jsonb_build_object ('round_id', round_id,
                              'sd', sd,
                              'bv', bv,
                              'vc', vc,
                              'vv', vv,
                              'cls', cls) AS json
                FROM _round
                """;
        return jdbcClient.sql(sql)
                .param(roundId)
                .query(String.class)
                .optional()
                .orElse("{}");
    }

}
