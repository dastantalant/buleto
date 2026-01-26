//package com.traderoom.strategy.simulation.buleto.writer;
//
//import com.traderoom.core.io.text.FastTextWriter;
//import com.traderoom.strategy.model.context.Snapshot;
//import com.traderoom.strategy.api.Subscriber;
//
//import java.io.IOException;
//import java.io.OutputStream;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.nio.file.StandardOpenOption;
//
//public class FullCsvLogger implements Subscriber, AutoCloseable {
//
//    private static final char SEP = ';';
//    private final FastTextWriter writer;
//
//    public FullCsvLogger(String directory, String fileName) throws IOException {
//        Files.createDirectories(Paths.get(directory));
//        String cleanName = fileName.endsWith(".csv") ? fileName : fileName + ".csv";
//
//        OutputStream out = Files.newOutputStream(Path.of(directory + "/" + cleanName),
//                StandardOpenOption.CREATE,
//                StandardOpenOption.TRUNCATE_EXISTING,
//                StandardOpenOption.WRITE);
//
//        writer = new FastTextWriter(out, 64 * 1024);
//
//        writer.append("Strategy;Rounds;StartBal;EndBal;NetProfit;ROI%;MaxDD%;WinRate%;PF;Won;Lost;Wagered;Payout;Status")
//                .newLine();
//        writer.flush();
//    }
//
//    @Override
//    public void onRound(Snapshot s) {
//        try {
//            // Идентификация
//            writer.append(s.strategyName()).append(SEP);
//            writer.append(s.roundNumber()).append(SEP);
//
//            // Баланс и профит
//            writer.append(s.startBalance()).append(SEP);
//            writer.append(s.balance()).append(SEP);
//            writer.append(s.netProfit()).append(SEP);
//
//            // Относительные метрики эффективности
//            writer.append(s.roiPercentage(), 2).append(SEP);
//            writer.append(s.maxDrawdown(), 2).append(SEP);
//            writer.append(s.winRatePercentage(), 2).append(SEP);
//            writer.append(s.profitFactor(), 2).append(SEP);
//
//            // Абсолютные счетчики
//            writer.append(s.totalWon()).append(SEP);
//            writer.append(s.totalLost()).append(SEP);
//
//            // Финансовые обороты
//            writer.append(s.totalWagered()).append(SEP);
//            writer.append(s.totalPayout()).append(SEP);
//
//            // Статус завершения
//            writer.append(s.isStopped() ? "STOPPED" : "FINISHED");
//
//            writer.newLine();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }
//
//    @Override
//    public void onGameEnd(Snapshot finalSnapshot) {
//        try {
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
//}