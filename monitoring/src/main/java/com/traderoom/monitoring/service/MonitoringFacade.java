package com.traderoom.monitoring.service;

import com.traderoom.core.logging.FastLogger;
import com.traderoom.monitoring.model.Round;
import com.traderoom.monitoring.api.SaveFacade;
import com.traderoom.monitoring.api.SaveService;
import com.traderoom.monitoring.util.JsonParser;

import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MonitoringFacade implements SaveFacade {

    private final ExecutorService dbExecutor = Executors.newVirtualThreadPerTaskExecutor();
    private final ExecutorService csvExecutor = Executors.newSingleThreadExecutor();

    private volatile long lastSavedRoundId = -1;
    private final SaveService dao;
    private final SaveService csv;

    public MonitoringFacade() {
        dao = new MonitoringDAO();
        csv = new CsvService("csv");
    }

    public Round save(CharSequence data) {
        try {
            long id = JsonParser.extractRoundId(data);
            if (id == -1 || id == lastSavedRoundId) {
                return null;
            }
            if (!JsonParser.hasVictory(data)) {
                return null;
            }
            Round round = JsonParser.parseVictory(data);
            if (round != null && round.isComplete()) {
                dbExecutor.submit(() -> dao.save(round));
                csvExecutor.submit(() -> csv.save(round));
                lastSavedRoundId = round.roundId();
                FastLogger.info("Round Saved: {} {}", id, round.cell());
            }
        } catch (Exception e) {
            FastLogger.error("Parse Error", e);
        }
        return null;
    }

    public void close() throws IOException {
        dbExecutor.shutdown();
        csvExecutor.shutdown();
        dao.close();
        csv.close();
    }
}