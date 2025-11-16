package com.traderoom.monitoring.playwright.repository;

import com.traderoom.monitoring.playwright.config.DataSource;
import com.traderoom.monitoring.playwright.model.Cell;
import com.traderoom.monitoring.playwright.model.Grid;
import com.traderoom.monitoring.playwright.model.Line;
import com.traderoom.monitoring.playwright.model.State;
import com.traderoom.monitoring.playwright.model.Timeline;
import com.traderoom.monitoring.playwright.service.TimelineService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.Instant;
import java.util.Map;

public class TimelineRepository<T> implements TimelineService<T> {

    private static final Logger logger = LoggerFactory.getLogger(TimelineRepository.class);

    public void save(State<T> state) {
        Timeline timeline = state.getTimeline();
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
        Grid<T> grid = state.getGrid();
        saveCell(timelineId, grid.getCells());
        if (grid.getVictoryCell() != null) {
            saveVictory(timelineId, grid.getVictoryCell().getNumber());
        }
    }

    public long updateTimeline(long timelineId, boolean isBullet) {
        try (Connection connection = DataSource.getConnection()) {
            final String bullet = "UPDATE timeline SET is_bullet = true WHERE timeline_id=? RETURNING timeline_id";
            final String start = "UPDATE timeline SET is_start = true WHERE timeline_id=? RETURNING timeline_id";
            String sql = isBullet ? bullet : start;
            PreparedStatement statement = connection.prepareStatement(sql);
            statement.setLong(1, timelineId);
            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()) {
                return resultSet.getLong(1);
            }
        } catch (SQLException e) {
            logger.error("Error while updating timeline", e);
        }
        return 0;
    }

    public void saveTimeline(Map<Byte, Line> timeline) {
        try (Connection connection = DataSource.getConnection()) {
            PreparedStatement statement = connection.prepareStatement("SELECT insert_timeline(?,  ?::numeric(6,5))");

            for (Map.Entry<Byte, Line> entry : timeline.entrySet()) {
                if (entry.getValue().getLine() > 0 && !Double.isNaN(entry.getValue().getWave())) {
                    statement.setLong(1, entry.getValue().getLine());
                    statement.setDouble(2, entry.getValue().getWave());
                    statement.addBatch();
                }
            }
            statement.executeBatch();
        } catch (SQLException e) {
            logger.error("Error while saving timeline", e);
        }
    }

    public void saveCell(long roundId, Map<Byte, Cell<T>> cells) {
        try (Connection connection = DataSource.getConnection()) {
            PreparedStatement statement = connection.prepareStatement("SELECT insert_cell(?::numeric(6, 5), ?::int2, ?::int8)");
            for (Map.Entry<Byte, Cell<T>> entry : cells.entrySet()) {
                statement.setDouble(1, entry.getValue().getWave());
                statement.setByte(2, entry.getValue().getNumber());
                statement.setLong(3, roundId);
                statement.addBatch();
            }
            statement.executeBatch();
        } catch (SQLException e) {
            logger.error("Error while saving cell", e);
        }
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
        try (Connection connection = DataSource.getConnection()) {
            PreparedStatement statement = connection.prepareStatement(sql);
            statement.setLong(1, timelineId);
            statement.setLong(2, cellNumber);
            statement.setLong(3, timelineId);
            return statement.execute();
        } catch (SQLException e) {
            logger.error("Error while saving victory", e);
            return false;
        }
    }
}
