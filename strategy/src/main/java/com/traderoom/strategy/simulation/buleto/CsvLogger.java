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

public class CsvLogger implements Subscriber, AutoCloseable {

    private static final char SEP = ';';
    private final FastTextWriter writer;

    public CsvLogger(String directory, String strategy) throws IOException {
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
    }

    @Override
    public void onRound(Snapshot s) {
        try {
            writer.put(s.strategyName()).put(SEP);
            writer.put(s.roundNumber()).put(SEP);
            writer.put(s.lastSpot() != null ? s.lastSpot().getNumber() : '-').put(SEP);

            // Финансы
            writer.put(s.balance()).put(SEP);
            writer.put(s.netProfit()).put(SEP);
            writer.put(s.lastProfit()).put(SEP);
            writer.put(s.roundBetAmount()).put(SEP);

            // Эффективность
            writer.put(s.roiPercentage(), 2).put(SEP);
            writer.put(s.maxDrawdown(), 2).put(SEP);
            writer.put(s.winRatePercentage(), 2).put(SEP);
            writer.put(s.profitFactor(), 2).put(SEP);

            // Статистика раундов
            writer.put(s.totalWon()).put(SEP);
            writer.put(s.totalLost()).put(SEP);

            // Обороты
            writer.put(s.totalWagered()).put(SEP);
            writer.put(s.totalPayout()).put(SEP);

            writer.put(s.isStopped() ? "STOP" : "LIVE").put(SEP);

            // Ставки
            for (Bet bet : s.lastBets()) {
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