package com.traderoom.analyzer.buleto;

import com.traderoom.core.csv.FastCsvWriter;
import com.traderoom.core.io.IOFactory;
import com.traderoom.core.io.Output;
import com.traderoom.core.logging.FastLogger;
import com.traderoom.strategy.model.context.Snapshot;
import com.traderoom.strategy.simulate.SimulateResult;

import lombok.experimental.UtilityClass;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;


@UtilityClass
public class BuletoWriter {
static String session;

    /**
     * Полный режим: создаёт подпапки по стратегиям, пишет туда детальные истории только прибыльных
     */
    public static void write(String sessionDirectory, List<SimulateResult> results, boolean roi) throws IOException {
        Path rootPath = Paths.get(sessionDirectory);
        if (!Files.exists(rootPath)) {
            Files.createDirectories(rootPath);
        }

        session = sessionDirectory;
        FastLogger.info("Processing results for " + results.size() + " simulations...");

        List<GlobalSnapshot> globalSummaries = new ArrayList<>();
        Map<String, AtomicInteger> repetitionCounter = new HashMap<>();

        for (SimulateResult result : results) {
            String key = result.strategy() + "_" + result.config();
            int repetition = repetitionCounter.computeIfAbsent(key, k -> new AtomicInteger(0)).incrementAndGet();

            globalSummaries.add(GlobalSnapshot.from(result, repetition));

            if (result.result().snapshot().getNetProfit() > 0 || roi) {
                writeWinnerHistoryWithSubfolder(sessionDirectory, result, repetition);
            }
        }

        globalSummaries.sort(Comparator.comparingLong(GlobalSnapshot::netProfit).reversed());
        writeGlobalSummary(rootPath.resolve("_summary.csv"), globalSummaries);

        writeAggregatedStats(rootPath.resolve("_strategy_stats.csv"), results);
    }


    public static void single(String sessionDirectory, List<SimulateResult> results, boolean roi) throws IOException {
        Path rootPath = Paths.get(sessionDirectory);
        if (!Files.exists(rootPath)) {
            Files.createDirectories(rootPath);
        }

        session = sessionDirectory;
        FastLogger.info("Writing single session results (" + results.size() + " simulations) → " + sessionDirectory);

        // 1. Подготовка данных для summary и агрегации (как в write)
        List<GlobalSnapshot> globalSummaries = new ArrayList<>();
        Map<String, AtomicInteger> repetitionCounter = new HashMap<>();

        for (SimulateResult result : results) {
            String strategy = result.strategy();
            String config = result.config();
            String key = strategy + "_" + config;

            int repetition = repetitionCounter.computeIfAbsent(key, k -> new AtomicInteger(0)).incrementAndGet();

            globalSummaries.add(GlobalSnapshot.from(result, repetition));

            if (result.result().snapshot().getNetProfit() > 0 || roi) {
                String fileName = String.format("%s_%s_%d.csv", strategy, config, repetition);
                Path filePath = rootPath.resolve(fileName);

                writeHistoryCsv(filePath, result.result().deque(), "single mode");
            }
        }

        // 2. Запись _summary.csv (сортировка по убыванию профита)
        globalSummaries.sort(Comparator.comparingLong(GlobalSnapshot::netProfit).reversed());
        writeGlobalSummary(rootPath.resolve("_summary.csv"), globalSummaries);

        // 3. Агрегация и вывод топа стратегий
        writeAggregatedStats(rootPath.resolve("_strategy_stats.csv"), results);
        // printTopStrategies вызывается внутри writeAggregatedStats — если хочешь отдельно, можно вызвать ещё раз:
        // Но обычно достаточно одного вызова внутри aggregated метода
    }

    // ────────────────────────────────────────────────
    //  Вынесенная общая логика записи истории в CSV
    // ────────────────────────────────────────────────

    private static void writeWinnerHistoryWithSubfolder(String directory, SimulateResult result, int repetition) {
        try {
            String strategyDirPath = directory + "/" + result.strategy();  // используем / — Paths.resolve нормально обработает
            Files.createDirectories(Paths.get(strategyDirPath));

            String fileName = String.format("%s_%d.csv", result.config(), repetition);
            Path filePath = Paths.get(strategyDirPath, fileName);

            writeHistoryCsv(filePath, result.result().deque(), "winner history (with subfolder)");
        } catch (Throwable e) {
            FastLogger.error("Failed to create/write strategy subfolder for " + result.strategy(), e);
        }
    }

    private static void writeHistoryCsv(Path filePath, Deque<Snapshot> history, String context) {
        try (Output output = IOFactory.writerOf(filePath, BuletoConstants.OPTIONS);
             FastCsvWriter<Snapshot> writer = new FastCsvWriter<>(Snapshot.class, output)) {

            writer.write(history);
//            FastLogger.info("History written [" + context + "]: " + filePath.toAbsolutePath());
        } catch (Throwable e) {
            FastLogger.error("Failed to write CSV history → " + filePath.getFileName(), e);
        }
    }
    /**
     * Новая логика: Группировка и подсчет статистики по стратегиям
     */
    private static void writeAggregatedStats(Path path, List<SimulateResult> results) {
        // Группируем результаты по имени стратегии
        Map<String, List<SimulateResult>> grouped = results.stream()
                .collect(Collectors.groupingBy(SimulateResult::strategy));

        List<AggregatedReport> reports = new ArrayList<>();

        for (Map.Entry<String, List<SimulateResult>> entry : grouped.entrySet()) {
            String strategyName = entry.getKey();
            List<SimulateResult> runs = entry.getValue();

            int totalRuns = runs.size();
            // Считаем победы (там, где чистая прибыль > 0)
            int wins = (int) runs.stream()
                    .filter(r -> r.result().snapshot().getNetProfit() > 0)
                    .count();
            int losses = totalRuns - wins;

            // Суммарный профит стратегии за все прогоны
            long totalNetProfit = runs.stream()
                    .mapToLong(r -> r.result().snapshot().getNetProfit())
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

        // Сортируем: сначала самые прибыльные (по WinRate или по TotalProfit - выберем Profit)
        reports.sort(Comparator.comparingLong(AggregatedReport::totalNetProfit).reversed());

        try (Output output = IOFactory.writerOf(path, BuletoConstants.OPTIONS);
             FastCsvWriter<AggregatedReport> writer = new FastCsvWriter<>(AggregatedReport.class, output)) {
            writer.write(reports);
//            FastLogger.info("Aggregated statistics written to: " + path);

            printTopStrategies(reports);
        } catch (Throwable e) {
            FastLogger.error("Failed to write aggregated stats", e);
        }
    }

    private static void printTopStrategies(List<AggregatedReport> reports) {
        System.out.println("\n=== TOP STRATEGIES (Aggregated) ===");
        System.out.println("\nsession: " + session);
        reports.stream()
                .filter(report->report.totalNetProfit()>0)
                .forEach(report -> System.out.printf("%s: %d%n", report.strategyName(), report.totalNetProfit()));
        System.out.println("===================================\n");
    }

    private static void writeWinnerHistory(String directory, SimulateResult result, int repetition) {
        try {
            String strategyDir = directory + "\\" + result.strategy();
            Files.createDirectories(Paths.get(strategyDir));
            String fileName = String.format("%s_%d.csv", result.config(), repetition);
            Path filePath = Paths.get(strategyDir, fileName);

            Deque<Snapshot> history = result.result().deque();
            try (Output output = IOFactory.writerOf(filePath, BuletoConstants.OPTIONS);
                 FastCsvWriter<Snapshot> writer = new FastCsvWriter<>(Snapshot.class, output)) {
                writer.write(history);
            }
        } catch (Throwable e) {
            FastLogger.error("Failed to write history for " + result.strategy(), e);
        }
    }

    private static void writeGlobalSummary(Path path, List<GlobalSnapshot> summaries) {
        try (Output output = IOFactory.writerOf(path, BuletoConstants.OPTIONS);
             FastCsvWriter<GlobalSnapshot> writer = new FastCsvWriter<>(GlobalSnapshot.class, output)) {
            writer.write(summaries);
            FastLogger.info("Global summary written to: " + path);
        } catch (Throwable e) {
            FastLogger.error("Failed to write global summary", e);
        }
    }
}