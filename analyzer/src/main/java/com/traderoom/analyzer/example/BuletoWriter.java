package com.traderoom.analyzer.example;

import com.traderoom.analyzer.BuletoConstants;
import com.traderoom.analyzer.example.model.AggregatedReport;
import com.traderoom.analyzer.example.model.CsvSnapshot;
import com.traderoom.analyzer.example.model.FinalSnapshot;
import com.traderoom.core.csv.FastCsvWriter;
import com.traderoom.core.logging.FastLogger;
import com.traderoom.api.runner.SimulateResult;

import lombok.experimental.UtilityClass;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;


@UtilityClass
public class BuletoWriter {
    static String session;

    public static void single(String sessionDirectory, List<SimulateResult> results, boolean roi) throws IOException {
        Path rootPath = Paths.get(sessionDirectory);
        if (!Files.exists(rootPath)) {
            Files.createDirectories(rootPath);
        }
        session = sessionDirectory;
        FastLogger.info("Writing single session results (" + results.size() + " simulations) → " + sessionDirectory);
        List<FinalSnapshot> globalSummaries = new ArrayList<>();
        Map<String, AtomicInteger> repetitionCounter = new HashMap<>();
        for (SimulateResult result : results) {
            String strategy = result.strategy();
            int repetition = repetitionCounter.computeIfAbsent(strategy + "_" + result.config(), k -> new AtomicInteger(0)).incrementAndGet();
            globalSummaries.add(FinalSnapshot.from(result, repetition));
            if (result.runnerResult().snapshot().netProfit() > 0 || roi) {
                strategy = result.runnerResult().snapshot().netProfit() > 0 ? strategy : "_" + strategy;
                String fileName = String.format("%s_%s_%d.csv", strategy, result.config(), repetition);
                FastCsvWriter.write(CsvSnapshot.from(result.runnerResult().deque()), rootPath.resolve(fileName), BuletoConstants.OPTIONS);
            }
        }
        globalSummaries.sort(Comparator.comparingDouble(FinalSnapshot::profitFactor).reversed());
        FastCsvWriter.write(globalSummaries, rootPath.resolve("_summary.csv"), BuletoConstants.OPTIONS);
        Path path = rootPath.resolve("_strategy_stats.csv");
        List<AggregatedReport> reports = aggregate(results);
        reports.sort(Comparator.comparingLong(AggregatedReport::totalNetProfit).reversed());
        FastCsvWriter.write(reports, path, BuletoConstants.OPTIONS);
        String sessionName = Paths.get(session).getFileName().toString();
        StringBuilder sb = new StringBuilder("\nSession: " + sessionName + "\n");
        reports.stream()
                .filter(r -> r.totalNetProfit() > 0)
                .forEach(r -> sb.append(r.strategyName())
                        .append(": ")
                        .append(r.totalNetProfit())
                        .append("\n"));
        Path logPath = Paths.get(BuletoConstants.DIRECTORY, "log.log");
        String info = sb.toString();
        System.out.println(info);
        try {
            Files.createDirectories(logPath.getParent());
            Files.writeString(logPath, info, StandardCharsets.UTF_8, StandardOpenOption.APPEND, StandardOpenOption.CREATE);
        } catch (IOException e) {
            FastLogger.error("Ошибка логирования: {}", e.getMessage());
        }
    }

    public static List<AggregatedReport> aggregate(Collection<SimulateResult> results) {
        Map<String, List<SimulateResult>> grouped = results.stream()
                .collect(Collectors.groupingBy(SimulateResult::strategy));
        List<AggregatedReport> reports = new ArrayList<>();
        for (Map.Entry<String, List<SimulateResult>> entry : grouped.entrySet()) {
            String strategyName = entry.getKey();
            List<SimulateResult> runs = entry.getValue();

            int totalRuns = runs.size();
            int wins = (int) runs.stream()
                    .filter(r -> r.runnerResult().snapshot().netProfit() > 0)
                    .count();
            int losses = totalRuns - wins;
            long totalNetProfit = runs.stream()
                    .mapToLong(r -> r.runnerResult().snapshot().netProfit())
                    .sum();
            double winRate = totalRuns == 0 ? 0 : ((double) wins / totalRuns) * 100.0;
            double avgProfit = totalRuns == 0 ? 0 : (double) totalNetProfit / totalRuns;
            reports.add(AggregatedReport.builder()
                    .strategyName(strategyName)
                    .totalRuns(totalRuns)
                    .wins(wins)
                    .losses(losses)
                    .winRate(winRate)
                    .totalNetProfit(totalNetProfit)
                    .averageProfit(avgProfit)
                    .build());
        }
        return reports;
    }
}