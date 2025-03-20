package com.traderoom.bet.web.repository;

import com.traderoom.bet.buleto.model.round.Cell;
import com.traderoom.bet.buleto.model.round.Grid;
import com.traderoom.bet.buleto.model.round.Line;
import com.traderoom.bet.buleto.model.round.Round;
import com.traderoom.bet.buleto.model.round.Timeline;
import com.traderoom.bet.web.service.TimelineService;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

@Repository
public class TimelineRepository implements TimelineService {

    private static final String CELL = "SELECT insert_cell(?::numeric(6, 5), ?::int2, ?::int8)";

    private final JdbcClient jdbcClient;
    private final JdbcTemplate jdbcTemplate;

    public TimelineRepository(JdbcClient jdbcClient, JdbcTemplate jdbcTemplate) {
        this.jdbcClient = jdbcClient;
        this.jdbcTemplate = jdbcTemplate;
    }

    public boolean save(Round round) {
        Timeline timeline = round.getTimeline();
        Map<Byte, Line> lines = timeline.getLines();
        saveTimeline(lines);
        long timelineId = 0;
        for (Map.Entry<Byte, Line> entry : lines.entrySet()) {
            Line line = entry.getValue();
            if (line.isBullet()) {
                timelineId = line.getLine();
                updateTimeline(timelineId, true);
            }
            if (line.isStart()) {
                updateTimeline(line.getLine(), false);
            }
        }
        Grid grid = round.getGrid();
        saveCell(timelineId, grid.getCells());

        saveVictory(timelineId, grid.getVictoryCell().getNumber());

        return true;
    }

    public Long saveTimeline(long unix, double value, Boolean isBullet) {
        final String insert = "SELECT insert_timeline(:unix,  :value::numeric(6,5))";
        final String insertBullet = "SELECT insert_timeline_with_bullet(:unix,  :value::numeric(6, 5))";
        final String insertStart = "SELECT insert_timeline_with_round(:unix,  :value::numeric(6, 5))";
        String sql = isBullet == null ? insert : isBullet ? insertBullet : insertStart;
        return jdbcClient.sql(sql)
                .param("unix", unix)
                .param("value", value)
                .query(Long.class)
                .single();
    }

    public long updateTimeline(long timelineId, boolean isBullet) {
        final String bullet = "UPDATE timeline SET is_bullet = true WHERE timeline_id=:timelineId RETURNING timeline_id";
        final String start = "UPDATE timeline SET is_start = true WHERE timeline_id=:timelineId RETURNING timeline_id";
        String sql = isBullet ? bullet : start;
        return jdbcClient.sql(sql)
                .param("timelineId", timelineId)
                .query(long.class)
                .single();
    }

    public void saveTimeline(Map<Byte, Line> timeline) {
        List<Map.Entry<Byte, Line>> timelineList = new ArrayList<>(100);

        for (Map.Entry<Byte, Line> entry : timeline.entrySet()) {
            if (entry.getValue().getLine() > 0 && !Double.isNaN(entry.getValue().getWave())) {
                timelineList.add(entry);
            }
        }
        jdbcTemplate.batchUpdate("SELECT insert_timeline(?,  ?::numeric(6,5))",
                timelineList,
                timelineList.size(),
                (stmt, entry) -> {
                    stmt.setLong(1, entry.getValue().getLine());
                    stmt.setDouble(2, entry.getValue().getWave());
                });
    }

    public void saveCell(long roundId, Map<Byte, Cell> cells) {
        List<Map.Entry<Byte, Cell>> cellEntries = new ArrayList<>(cells.entrySet());
        jdbcTemplate.batchUpdate(CELL, cellEntries, cellEntries.size(),
                (stmt, entry) -> {
                    stmt.setDouble(1, entry.getValue().getWave());
                    stmt.setByte(2, entry.getValue().getNumber());
                    stmt.setLong(3, roundId);
                });
    }

    public boolean saveVictory(long timelineId, long cellNumber) {
        final String sql = """
                WITH _cell AS (
                  SELECT cell.cell_id
                  FROM timeline
                  INNER JOIN round ON timeline.timeline_id = round.round_id
                  INNER JOIN cell ON round.cell_id = cell.cell_id
                  WHERE timeline.timeline_id = ? AND cell_number = ?
                )
                INSERT INTO cell_victory(timeline_id, cell_id)
                SELECT ?, cell_id FROM _cell
                """;
        jdbcTemplate.update(sql,timelineId, cellNumber, timelineId);
        return true;
    }
}
