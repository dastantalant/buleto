-- WITH _round AS (SELECT round_cell.round_id,
--                        round.start_datetime      AS sd,
--                        round.begin_wave_id       AS bv,
--                        round.victory_cell_number AS cell_number,
--                        round.victory_wave_id     AS wave,
--                        json_agg(cell.cell_id)    as cells
--                 FROM cell
--                          INNER JOIN round_cell ON cell.cell_id = round_cell.cell_id
--                          INNER JOIN round ON round_cell.round_id = round.round_id
--                 WHERE round.round_id = ?
--                 GROUP BY round_cell.round_id,
--                          round.start_datetime,
--                          round.begin_wave_id,
--                          round.victory_cell_number,
--                          round.victory_wave_id,
--                          round.victory_cell_number)
-- SELECT jsonb_agg(row_to_json(_round)) AS json
-- FROM _round
--
-- SELECT email,
--        password,
--        enabled,
--        array_agg(role.name)
-- FROM users
--          INNER JOIN user_role ON users.email = user_role.user_id
--          INNER JOIN role ON user_role.role_id = role.role_id
-- WHERE users.email = ?
-- GROUP BY email,
--          password,
--          enabled
--
--
-- WITH _timeline AS (SELECT round.round_id                                  AS id,
--                           round.victory_cell_number                       AS cell,
--                           round.start_datetime                            AS sd,
--                           round.bet_close_datetime                        AS bcd,
--                           round.bet_target_datetime                       AS btd,
--                           round.end_datetime                              AS ed,
--                           json_agg(json_build_object('line', timeline.timeline_id, 'wave', timeline.wave_id))
--                           FILTER (WHERE timeline.timeline_id IS NOT NULL) AS timeline
--                    FROM round
--                             LEFT JOIN timeline
--                                       ON timeline.timeline_id BETWEEN round.start_datetime AND round.end_datetime
--                    WHERE round.round_id = 3564813
--                    GROUP BY round.round_id,
--                             round.victory_cell_number,
--                             round.start_datetime,
--                             round.bet_close_datetime,
--                             round.bet_target_datetime,
--                             round.end_datetime
--                    ORDER BY round.round_id DESC)
-- SELECT jsonb_build_object('id', id,
--                           'cell', cell,
--                           'sd', sd,
--                           'bcd', bcd,
--                           'btd', btd,
--                           'ed', ed,
--                           'timeline', timeline) AS json
-- FROM _timeline
--
-- WITH _round AS (SELECT round_id            AS id,
--                        start_datetime      AS sd,
--                        end_datetime        AS ed,
--                        bet_close_datetime  AS bcd,
--                        bet_target_datetime AS btd,
--                        begin_wave_id       AS bv,
--                        target_wave_id      AS tv,
--                        start_wave_id       AS sv,
--                        victory_datetime    AS vd,
--                        victory_wave_id     AS vv,
--                        victory_cell_number As vc
--                 FROM round
--                 WHERE round_id = 3564813)
-- SELECT jsonb_build_object('id', id,
--                           'ed', ed,
--                           'sd', sd,
--                           'bcd', bcd,
--                           'btd', btd,
--                           'bv', bv,
--                           'tv', tv,
--                           'sv', sv,
--                           'vd', vd,
--                           'vv', vv,
--                           'vc', vc) AS json
-- FROM _round
--
-- WITH _round AS (SELECT round_cell.round_id,
--                        round.start_datetime      AS sd,
--                        round.begin_wave_id       AS bv,
--                        round.victory_cell_number AS cell_number,
--                        round.victory_wave_id     AS wave,
--                        json_agg(cell.cell_id)    as cells
--                 FROM cell
--                          INNER JOIN round_cell ON cell.cell_id = round_cell.cell_id
--                          INNER JOIN round ON round_cell.round_id = round.round_id
--                 WHERE round.round_id = 3564813
--                 GROUP BY round_cell.round_id,
--                          round.start_datetime,
--                          round.begin_wave_id,
--                          round.victory_cell_number,
--                          round.victory_wave_id)
-- SELECT jsonb_build_object('round_id', round_id,
--                           'sd', sd,
--                           'bv', bv,
--                           'cell_number', cell_number,
--                           'wave', wave,
--                           'cells', cells) AS json
-- FROM _round

WITH _timeline AS (SELECT round.round_id,
                          round.start_datetime      AS sd,
                          round.bet_close_datetime  AS bcd,
                          round.bet_target_datetime AS btd,
                          round.end_datetime        AS ed,
                          round.victory_datetime    AS vd,
                          round.victory_cell_number AS vc,
                          round.victory_wave_id     AS vv,
                          json_agg(json_build_object('line', timeline.timeline_id, 'wave', timeline.wave_id))
                          FILTER (WHERE timeline.timeline_id IS NOT NULL)
                                                    AS timeline
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
                   OFFSET ? LIMIT ?)
SELECT jsonb_agg(row_to_json(_timeline)) AS json
FROM _timeline

WITH _round AS (SELECT round_cell.round_id,
                       round.start_datetime      AS sd,
                       round.begin_wave_id       AS bv,
                       round.victory_cell_number AS vc,
                       round.victory_wave_id     AS vv,
                       json_agg(cell.cell_id)    as cls
                FROM cell
                         INNER JOIN round_cell ON cell.cell_id = round_cell.cell_id
                         INNER JOIN round ON round_cell.round_id = round.round_id
                GROUP BY round_cell.round_id,
                         round.start_datetime,
                         round.begin_wave_id,
                         round.victory_cell_number,
                         round.victory_wave_id
                OFFSET ? LIMIT ?)
SELECT jsonb_agg(row_to_json(_round)) AS json
FROM _round

WITH _cell AS (SELECT round_cell.round_id,
                      round.start_datetime      AS sd,
                      round.begin_wave_id       AS bv,
                      round.victory_cell_number AS vc,
                      round.victory_wave_id     AS vv,
                      cell.cell_id
               FROM cell
                        INNER JOIN round_cell ON cell.cell_id = round_cell.cell_id
                        INNER JOIN round ON round_cell.round_id = round.round_id
               WHERE round.start_datetime BETWEEN ? AND ?
               ORDER BY round.round_id)
SELECT jsonb_agg(row_to_json(_cell)) AS json
FROM _cell

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

