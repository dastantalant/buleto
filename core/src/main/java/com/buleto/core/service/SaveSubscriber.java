package com.buleto.core.service;

import com.buleto.core.model.Round;
import com.buleto.core.websocket.Subscriber;
import com.toolbox.core.logging.FastLogger;

import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class SaveSubscriber implements Subscriber {

    private final ExecutorService dbExecutor = Executors.newVirtualThreadPerTaskExecutor();
    private final ExecutorService csvExecutor = Executors.newSingleThreadExecutor();

    private final RoundRepository dao;
    private final CsvService csv;

    public SaveSubscriber() {
        var roundDAO = new RoundPostgresDAO();
        this(roundDAO, new BaseCsvService(roundDAO));
    }

    public SaveSubscriber(RoundRepository dao, CsvService csv) {
        this.dao = dao;
        this.csv = csv;
    }

    public void onVictory(Round round) {
        try {
            dbExecutor.submit(() -> dao.save(round));
            csvExecutor.submit(() -> csv.onVictory(round));
        } catch (Exception e) {
            FastLogger.error("Parse Error", e);
        }
    }

    public void close() throws IOException {
        dbExecutor.shutdown();
        csvExecutor.shutdown();
        dao.close();
    }
}
