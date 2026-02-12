//package com.traderoom.strategy.simulation.buleto;
//
//import com.traderoom.core.io.text.FastTextWriter;
//import com.traderoom.api.model.Bet;
//import com.traderoom.api.model.Snapshot;
//import com.traderoom.api.Subscriber;
//
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.StandardOpenOption;
//
//@Deprecated
//public class UniversalCsvLogger implements Subscriber, AutoCloseable {
//
//    private final FastTextWriter writer;
//
//    public UniversalCsvLogger(String filePath) throws IOException {
//        var out = Files.newOutputStream(Path.of(filePath), StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
//        writer = new FastTextWriter(out, 32 * 1024);
//        writer.put("Round;Spot;Balance;RoundPnL;TotalNetProfit;RoundBetAmt;ROI%;Drawdown%;WinRate%;TotalWagered;Status;Bets")
//                .newLine();
//        writer.flush();
//    }
//
//    @Override
//    public void onRound(Snapshot snapshot) {
//        try {
//            writer.put(snapshot.roundNumber()).put(';');
//
//            if (snapshot.lastSpot() != null) {
//                writer.put(snapshot.lastSpot().getNumber());
//            } else {
//                writer.put('-');
//            }
//            writer.put(';');
//
//            writer.put(snapshot.realBalance()).put(';');
//            writer.put(snapshot.lastProfit()).put(';');
//            writer.put(snapshot.netProfit()).put(';');
//            writer.put(snapshot.roundBetAmount()).put(';');
//
//            writer.put(snapshot.roiPercentage(), 2).put(';');
//            writer.put(snapshot.currentDrawdown(), 2).put(';');
//            writer.put(snapshot.winRatePercentage(), 2).put(';');
//
//            writer.put(snapshot.totalWagered()).put(';');
//            writer.put(snapshot.isLive() ? "STOP" : "LIVE").put(';');
//
//            for (Bet bet : snapshot.lastBets()) {
//                writer.put(bet.type().name())
//                        .put(':')
//                        .put(bet.value())
//                        .put(' ');
//            }
//            writer.newLine();
//
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }
//    }
//
//    @Override
//    public void close() throws IOException {
//        writer.close();
//    }
//
//    @Override
//    public void onGameEnd(Snapshot s) {
//        try { close(); } catch (Exception e) {}
//    }
//}