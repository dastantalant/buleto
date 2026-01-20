package com.traderoom.strategy.simulation.buleto;

import com.traderoom.strategy.library.FastTextWriter;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Snapshot;
import com.traderoom.strategy.monitoring.Subscriber;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.HashMap;
import java.util.Map;

public class CsvPartyLogger implements Subscriber, AutoCloseable {

    private static final char SEP = ';';
    private final Map<Long, Snapshot> map;
    private final String directory;
    private final String strategy;
    private FastTextWriter writer;

    public CsvPartyLogger(String directory, String strategy) {
        this.directory = directory;
        this.strategy = strategy;
        map = new HashMap<>();
    }

    @Override
    public void onRound(Snapshot snapshot) {
        map.put(snapshot.roundNumber(), snapshot);
    }

    @Override
    public void onGameEnd(Snapshot finalSnapshot) {
        if (finalSnapshot.getNetProfit() <= 0) return;
        try {
            write(finalSnapshot, map);
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

    private void write(Snapshot finalSnapshot, Map<Long, Snapshot> map) throws IOException {
        Files.createDirectories(Paths.get(directory));
        String fileName = strategy.endsWith(".csv") ? strategy : strategy + ".csv";

        OutputStream out = Files.newOutputStream(Path.of(directory + "/" + fileName),
                StandardOpenOption.CREATE,
                StandardOpenOption.TRUNCATE_EXISTING,
                StandardOpenOption.WRITE);

        writer = new FastTextWriter(out, 64 * 1024);

        writer.put("Strategy;Round;Spot;Balance;NetProfit;RoundPnL;BetAmt;ROI%;MaxDD%;WinRate%;PF;Won;Lost;Wagered;Payout;Status;Bets")
                .newLine();
        writer.flush();
        for (Map.Entry<Long, Snapshot> entry : map.entrySet()) {
            write(writer, entry.getValue());
            writer.flush();
        }
    }

    public void write(FastTextWriter writer, Snapshot snapshot) {
        try {
            writer.put(snapshot.strategyName()).put(SEP);
            writer.put(snapshot.roundNumber()).put(SEP);
            writer.put(snapshot.lastSpot() != null ? snapshot.lastSpot().getNumber() : '-').put(SEP);

            // Финансы
            writer.put(snapshot.balance()).put(SEP);
            writer.put(snapshot.netProfit()).put(SEP);
            writer.put(snapshot.lastProfit()).put(SEP);
            writer.put(snapshot.roundBetAmount()).put(SEP);

            // Эффективность
            writer.put(snapshot.roiPercentage(), 2).put(SEP);
            writer.put(snapshot.maxDrawdown(), 2).put(SEP);
            writer.put(snapshot.winRatePercentage(), 2).put(SEP);
            writer.put(snapshot.profitFactor(), 2).put(SEP);

            // Статистика раундов
            writer.put(snapshot.totalWon()).put(SEP);
            writer.put(snapshot.totalLost()).put(SEP);

            // Обороты
            writer.put(snapshot.totalWagered()).put(SEP);
            writer.put(snapshot.totalPayout()).put(SEP);

            writer.put(snapshot.isStopped() ? "STOP" : "LIVE").put(SEP);

            // Ставки
            for (Bet bet : snapshot.lastBets()) {
                writer.put(bet.type().name())
                        .put(':')
                        .put(bet.value())
                        .put(' ');
            }
            writer.newLine();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}