package com.traderoom.monitoring.socket.repository;

import com.traderoom.monitoring.socket.config.DataSource;
import com.traderoom.monitoring.socket.service.MonitorService;
import com.traderoom.monitoring.socket.socket.Monitor;
import com.traderoom.monitoring.socket.socket.model.Cell;
import com.traderoom.monitoring.socket.socket.model.Factor;
import com.traderoom.monitoring.socket.socket.model.Round;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MonitorRepository implements MonitorService {

    private static final Logger logger = LoggerFactory.getLogger(MonitorRepository.class);

    public void save(Monitor monitor) {
        Factor factor = monitor.getFactor();
        Round round = monitor.getRound();
        saveFactor(factor);
        saveRound(round);
//        saveCell(round);
    }

    private void saveFactor(Factor factor) {
        try (Connection connection = DataSource.getConnection()) {
            PreparedStatement statement = connection.prepareStatement("SELECT insert_timeline(?::int8,  ?::numeric(6,5))");

            LinkedHashMap<String, Double> factors = factor.getFactors();
            for (Map.Entry<String, Double> entry : factors.entrySet()) {
                statement.setLong(1, Instant.parse(entry.getKey()).toEpochMilli());
                statement.setDouble(2, entry.getValue());
                statement.addBatch();
            }
            statement.executeBatch();
        } catch (SQLException e) {
            logger.error("Error while saving timeline", e);
        }
    }

    private void saveRound(Round round) {
        try (Connection connection = DataSource.getConnection()) {
            PreparedStatement statement = connection.prepareStatement("""
                    SELECT insert_round(
                        ?::int8,
                        ?::int8,
                        ?::int8,
                        ?::int8,
                        ?::int8,
                        ?::numeric(6, 5),
                        ?::numeric(6, 5),
                        ?::numeric(6, 5),
                        ?::int8,
                        ?::numeric(6, 5),
                        ?::int2
                    )
                    """);
            statement.setLong(1, round.getRoundId());
            statement.setLong(2, round.getStartDate());
            statement.setLong(3, round.getEndDate());
            statement.setLong(4, round.getBetCloseDate());
            statement.setLong(5, round.getBetTargetDate());
            statement.setDouble(6, round.getBeginValue());
            statement.setDouble(7, round.getTargetValue());
            statement.setDouble(8, round.getStartValue());
            statement.setLong(9, round.getVictoryDate());
            statement.setDouble(10, round.getVictoryValue());
            statement.setShort(11, round.getVictoryCellNumber());
            statement.execute();
        } catch (SQLException e) {
            logger.error("Error while saving timeline", e);
        }
    }

    private void saveCell(Round round) {
        Map<Byte, Cell> cells = round.getCells();
        long roundId = round.getRoundId();
        try (Connection connection = DataSource.getConnection()) {
            PreparedStatement statement = connection.prepareStatement(
                    "SELECT insert_round_cell(?::numeric(6,5), ?::numeric(6,5), ?::int2, ?::int8)");

            for (Map.Entry<Byte, Cell> entry : cells.entrySet()) {
                statement.setDouble(1, entry.getValue().getBegin());
                statement.setDouble(2, entry.getValue().getTarget());
                statement.setShort(3, entry.getKey());
                statement.setLong(4, roundId);
                statement.addBatch();
            }
            statement.executeBatch();
        } catch (SQLException e) {
            logger.error("Error while saving timeline", e);
        }
    }
}
