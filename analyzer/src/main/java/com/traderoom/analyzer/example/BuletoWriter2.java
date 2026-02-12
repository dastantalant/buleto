//package com.traderoom.analyzer.buleto;
//
//import com.traderoom.core.csv.FastCsvWriter;
//import com.traderoom.core.logging.FastLogger;
//import com.traderoom.strategy.simulate.SimulateResult;
//
//import java.io.IOException;
//import java.nio.charset.StandardCharsets;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.nio.file.StandardOpenOption;
//import java.util.ArrayList;
//import java.util.Comparator;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.concurrent.atomic.AtomicInteger;
//
//public class BuletoWriter2 {
//    public static List<AggregatedReport> single(String parent, String sessionDirectory, List<SimulateResult> results) throws IOException {
//        Path rootPath = Paths.get(sessionDirectory);
//        if (!Files.exists(rootPath)) {
//            Files.createDirectories(rootPath);
//        }
//        FastLogger.info("Writing single session results (" + results.size() + " simulations) → " + sessionDirectory);
//        List<GlobalSnapshot> globalSummaries = new ArrayList<>();
//        Map<String, AtomicInteger> repetitionCounter = new HashMap<>();
//        for (SimulateResult result : results) {
//            String strategy = result.strategy();
//            String config = result.config();
//            String key = strategy + "_" + config;
//            int repetition = repetitionCounter.computeIfAbsent(key, k -> new AtomicInteger(0)).incrementAndGet();
//            globalSummaries.add(GlobalSnapshot.from(result, repetition));
//            if (result.result().snapshot().getNetProfit() > 0) {
//                String fileName = String.format("%s_%s_%d.csv", strategy, config, repetition);
//                Path filePath = rootPath.resolve(fileName);
//                FastCsvWriter.write(result.result().deque(), filePath, BuletoConstants.OPTIONS);
//            }
//        }
//        globalSummaries.sort(Comparator.comparingDouble(GlobalSnapshot::netProfit).reversed());
//        FastCsvWriter.write(globalSummaries, rootPath.resolve("_summary.csv"), BuletoConstants.OPTIONS);
//        //==============================================================================================================
//        Path strategyStats = rootPath.resolve("_strategy_stats.csv");
//        List<AggregatedReport> reports = BuletoWriter.aggregate(results);
//        reports.sort(Comparator.comparingLong(AggregatedReport::totalNetProfit).reversed());
//        FastCsvWriter.write(reports, strategyStats, BuletoConstants.OPTIONS);
//        //==============================================================================================================
//        String sessionName = rootPath.getFileName().toString();
//        StringBuilder sb = new StringBuilder("\nSession: " + sessionName + "\n");
//        List<AggregatedReport> list = reports.stream()
//                .filter(r -> r.totalNetProfit() > 0)
//                .toList();
//        list.forEach(r -> sb.append(r.strategyName())
//                .append(": ")
//                .append(r.totalNetProfit())
//                .append("\n"));
//        Path logPath = Paths.get(parent, "log.log");
//        try {
//            Files.createDirectories(logPath.getParent());
//            Files.writeString(logPath, sb, StandardCharsets.UTF_8, StandardOpenOption.APPEND, StandardOpenOption.CREATE);
//        } catch (IOException e) {
//            FastLogger.error("Ошибка логирования: {}", e.getMessage());
//        }
//        return list;
//    }
//}