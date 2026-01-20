package com.traderoom.strategy.simulation.buleto;

import com.traderoom.strategy.library.FastTextWriter;
import com.traderoom.strategy.model.context.Snapshot;
import com.traderoom.strategy.monitoring.Subscriber;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

public class FullCsvLogger implements Subscriber, AutoCloseable {

    private static final char SEP = ';';
    private final FastTextWriter writer;

    public FullCsvLogger(String directory, String fileName) throws IOException {
        Files.createDirectories(Paths.get(directory));
        String cleanName = fileName.endsWith(".csv") ? fileName : fileName + ".csv";

        OutputStream out = Files.newOutputStream(Path.of(directory + "/" + cleanName),
                StandardOpenOption.CREATE,
                StandardOpenOption.TRUNCATE_EXISTING,
                StandardOpenOption.WRITE);

        writer = new FastTextWriter(out, 64 * 1024);

        writer.put("Strategy;Rounds;StartBal;EndBal;NetProfit;ROI%;MaxDD%;WinRate%;PF;Won;Lost;Wagered;Payout;Status")
                .newLine();
        writer.flush();
    }

    @Override
    public void onRound(Snapshot s) {
        try {
            // Идентификация
            writer.put(s.strategyName()).put(SEP);
            writer.put(s.roundNumber()).put(SEP);

            // Баланс и профит
            writer.put(s.startBalance()).put(SEP);
            writer.put(s.balance()).put(SEP);
            writer.put(s.netProfit()).put(SEP);

            // Относительные метрики эффективности
            writer.put(s.roiPercentage(), 2).put(SEP);
            writer.put(s.maxDrawdown(), 2).put(SEP);
            writer.put(s.winRatePercentage(), 2).put(SEP);
            writer.put(s.profitFactor(), 2).put(SEP);

            // Абсолютные счетчики
            writer.put(s.totalWon()).put(SEP);
            writer.put(s.totalLost()).put(SEP);

            // Финансовые обороты
            writer.put(s.totalWagered()).put(SEP);
            writer.put(s.totalPayout()).put(SEP);

            // Статус завершения
            writer.put(s.isStopped() ? "STOPPED" : "FINISHED");

            writer.newLine();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onGameEnd(Snapshot finalSnapshot) {
        try {
            close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void close() throws IOException {
        if (writer != null) {
            writer.flush();
            writer.close();
        }
    }
}