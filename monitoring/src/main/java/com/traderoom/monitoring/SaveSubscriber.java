package com.traderoom.monitoring;

import com.traderoom.core.websocket.Round;
import com.traderoom.core.websocket.Subscriber;
import com.traderoom.core.logging.FastLogger;

import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class SaveSubscriber implements Subscriber {

    private final ExecutorService dbExecutor = Executors.newVirtualThreadPerTaskExecutor();
    private final ExecutorService csvExecutor = Executors.newSingleThreadExecutor();

    private final com.traderoom.core.websocket.SaveService dao;
    private final com.traderoom.core.websocket.SaveService csv;

    public SaveSubscriber() {
        dao = new RoundDAO();
        csv = new CsvService("csv");
    }

    public void onVictory(Round round) {
        try {
            dbExecutor.submit(() -> dao.save(round));
            csvExecutor.submit(() -> csv.save(round));
        } catch (Exception e) {
            FastLogger.error("Parse Error", e);
        }
    }

    public void close() throws IOException {
        dbExecutor.shutdown();
        csvExecutor.shutdown();
        dao.close();
        csv.close();
    }
}
