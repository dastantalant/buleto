//package com.traderoom.strategy.simulation.buleto.writer;
//
//import com.toolbox.core.io.text.FastTextWriter;
//import com.trading.roulette.api.model.Bet;
//import com.trading.roulette.api.model.Snapshot;
//import com.trading.roulette.api.Subscriber;
//
//import java.io.IOException;
//import java.io.OutputStream;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.nio.file.StandardOpenOption;
//import java.util.HashMap;
//import java.util.Map;
//
//public class CsvPartyLogger implements Subscriber, AutoCloseable {
//
//    private static final char SEP = ';';
//    private final Map<Long, Snapshot> map;
//    private final String directory;
//    private final String strategy;
//    private FastTextWriter writer;
//
//    public CsvPartyLogger(String directory, String strategy) {
//        this.directory = directory;
//        this.strategy = strategy;
//        map = new HashMap<>();
//    }
//
//    @Override
//    public void onRound(Snapshot snapshot) {
//        map.put(snapshot.roundNumber(), snapshot);
//    }
//
//    @Override
//    public void onGameEnd(Snapshot finalSnapshot) {
//        if (finalSnapshot.getNetProfit() <= 0) return;
//        try {
//            write(finalSnapshot, map);
//            close();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }
//
//    @Override
//    public void close() throws IOException {
//        if (writer != null) {
//            writer.flush();
//            writer.close();
//        }
//    }
//
//    private void write(Snapshot finalSnapshot, Map<Long, Snapshot> map) throws IOException {
//        Files.createDirectories(Paths.get(directory));
//        String fileName = strategy.endsWith(".csv") ? strategy : strategy + ".csv";
//
//        OutputStream out = Files.newOutputStream(Path.of(directory + "/" + fileName),
//                StandardOpenOption.CREATE,
//                StandardOpenOption.TRUNCATE_EXISTING,
//                StandardOpenOption.WRITE);
//
//        writer = new FastTextWriter(out, 64 * 1024);
//
//        writer.append("Strategy;Round;Spot;Balance;NetProfit;RoundPnL;BetAmt;ROI%;MaxDD%;WinRate%;PF;Won;Lost;Wagered;Payout;Status;Bets")
//                .newLine();
//        writer.flush();
//        for (Map.Entry<Long, Snapshot> entry : map.entrySet()) {
//            write(writer, entry.getValue());
//            writer.flush();
//        }
//    }
//
//    public void write(FastTextWriter writer, Snapshot snapshot) {
//        try {
//            writer.append(snapshot.strategyName()).append(SEP);
//            writer.append(snapshot.roundNumber()).append(SEP);
//            writer.append(snapshot.lastSpot() != null ? snapshot.lastSpot().getNumber() : '-').append(SEP);
//
//            // Финансы
//            writer.append(snapshot.realBalance()).append(SEP);
//            writer.append(snapshot.netProfit()).append(SEP);
//            writer.append(snapshot.lastProfit()).append(SEP);
//            writer.append(snapshot.roundBetAmount()).append(SEP);
//
//            // Эффективность
//            writer.append(snapshot.roiPercentage(), 2).append(SEP);
//            writer.append(snapshot.maxDrawdown(), 2).append(SEP);
//            writer.append(snapshot.winRatePercentage(), 2).append(SEP);
//            writer.append(snapshot.profitFactor(), 2).append(SEP);
//
//            // Статистика раундов
//            writer.append(snapshot.totalWon()).append(SEP);
//            writer.append(snapshot.totalLost()).append(SEP);
//
//            // Обороты
//            writer.append(snapshot.totalWagered()).append(SEP);
//            writer.append(snapshot.totalPayout()).append(SEP);
//
//            writer.append(snapshot.isLive() ? "STOP" : "LIVE").append(SEP);
//
//            // Ставки
//            for (Bet bet : snapshot.lastBets()) {
//                writer.append(bet.type().name())
//                        .append(':')
//                        .append(bet.value())
//                        .append(' ');
//            }
//            writer.newLine();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }
//}