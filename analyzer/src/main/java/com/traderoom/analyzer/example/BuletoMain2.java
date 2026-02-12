package com.traderoom.analyzer.example;

import com.traderoom.analyzer.BuletoConstants;
import com.traderoom.analyzer.example.model.AggregatedReport;
import com.traderoom.analyzer.example.model.CsvSnapshot;
import com.traderoom.analyzer.example.model.FinalSnapshot;
import com.traderoom.core.csv.CsvColumn;
import com.traderoom.core.csv.CsvFile;
import com.traderoom.core.csv.FastCsvWriter;
import com.traderoom.core.csv.Separator;
import com.traderoom.core.logging.FastLogger;
import com.traderoom.core.util.CsvDataLoader;
import com.traderoom.api.ConfigBuilder;
import com.traderoom.api.IStrategy;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.model.config.RiskConfig;
import com.traderoom.api.runner.SimulateResult;
import com.traderoom.api.runner.supplier.SpotSupplier;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.Date;
import java.util.Deque;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Supplier;
import java.util.stream.Collectors;

import static com.traderoom.analyzer.BuletoConstants.OPTIONS;

public class BuletoMain2 {

    static final Set<Class<? extends IStrategy>> CLASSES = BuletoConfig.all();

    static final long balance = 15_000L;
    static final int winLen = 3;
    static final int len = 960;
    static final int hisLen = len * winLen;
    static final Deque<Integer> VICTORY = CsvDataLoader.load(BuletoConstants.VICTORY);
    static final int count = VICTORY.size() / len;

    static final String ROOT = BuletoConstants.DIRECTORY + "\\" + BuletoConstants.FORMAT.format(new Date()) + "_" + balance + "_win_" + winLen + "_count_" + count;

    static void main() throws Throwable {
        runWindow();
    }

    static void runWindow() throws Throwable {
        Files.createDirectories(Paths.get(ROOT));
        var list = repeat();
        list.sort(Comparator.comparingLong(Result::getNetProfit).reversed());
        FastCsvWriter.write(new ArrayList<>(list), Paths.get(ROOT, "summary.csv"), OPTIONS);
        writeSummary(list);
    }

    static List<Result> repeat() throws IOException {
        var list = new ArrayList<Result>(count * CLASSES.size());
        var deque = new LinkedList<>(VICTORY);
        for (int segment = 0; segment < count; segment++) {
            if (deque.size() < hisLen) break;
            var session = BuletoConstants.FORMAT.format(new Date());
            var repeatDeque = new LinkedList<>(deque);
            var warming = split(repeatDeque, hisLen);
            var dir = ROOT + "\\" + session + "_" + balance + "_win_" + winLen + "_count_" + count;
            var reports = runSimulate(dir, repeatDeque, warming);
            for (AggregatedReport report : reports) {
                list.add(Result.from(session, report));
            }
            delete(deque, len);
            FastLogger.info("running: {}", segment);
        }
        FastLogger.info("DONE");
        return list;
    }

    static List<AggregatedReport> runSimulate(String session, Deque<Integer> deque, Deque<Integer> warming) throws IOException {
        Files.createDirectories(Paths.get(session));
        var configs = Set.of(buildConfig("FROM_VICTORY", warming));
        ConfigWriter.write(session, configs);
        final Supplier<SpotSupplier> supplier = () -> BuletoSpotSupplier.of(deque);
        var results = new BuletoSimulator(configs, CLASSES).simulate(1, supplier);
        return write(session, results);
    }

    static void writeSummary(List<Result> list) throws Throwable {
        Map<String, Integer> counter = HashMap.newHashMap(CLASSES.size());
        for (var item : list) {
            var name = item.getStrategyName();
            counter.put(name, counter.getOrDefault(name, 0) + 1);
        }
        var sortedCounter = counter.entrySet()
                .stream()
                .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (oldV, newV) -> oldV, LinkedHashMap::new));
        var builder = new StringBuilder();
        var last = 0;
        for (var entry : sortedCounter.entrySet()) {
            var cur = entry.getValue();
            if (cur != last) builder.append("\n");
            builder.append(entry.getKey())
                    .append(": ")
                    .append(cur)
                    .append("\n");
            last = cur;
        }
        var countPath = Paths.get(ROOT, "count.log");
        Files.createDirectories(countPath.getParent());
        Files.writeString(countPath, builder, StandardCharsets.UTF_8, StandardOpenOption.APPEND, StandardOpenOption.CREATE);
    }

    static void delete(Deque<Integer> deque, int len) {
        for (int i = 0; i < len; i++) {
            deque.removeFirst();
        }
    }

    static Deque<Integer> split(Deque<Integer> deque, int len) {
        var warming = new LinkedList<Integer>();
        for (int i = 0; i < len; i++) {
            warming.addLast(deque.pollFirst());
        }
        return warming;
    }

    static List<AggregatedReport> write(String sessionDirectory, Collection<SimulateResult> results) throws IOException {
        var rootPath = Paths.get(sessionDirectory);
        if (!Files.exists(rootPath)) {
            Files.createDirectories(rootPath);
        }
        var summaries = new ArrayList<FinalSnapshot>();
        var repetitionCounter = new HashMap<String, AtomicInteger>();
        for (var result : results) {
            var strategyName = result.strategy();
            var configName = result.config();
            var repetition = repetitionCounter.computeIfAbsent(strategyName + "_" + configName, k -> new AtomicInteger(0)).incrementAndGet();
            summaries.add(FinalSnapshot.from(result, repetition));
//            if (result.result().snapshot().getNetProfit() > 0) {
            var fileName = String.format("%s_%s_%d.csv", strategyName, configName, repetition);
            FastCsvWriter.write(CsvSnapshot.from(result.runnerResult().deque()), rootPath.resolve(fileName), BuletoConstants.OPTIONS);
//            }
        }
        summaries.sort(Comparator.comparingDouble(FinalSnapshot::netProfit).reversed());
        FastCsvWriter.write(summaries, rootPath.resolve("_summary.csv"), BuletoConstants.OPTIONS);
        //==============================================================================================================
        var strategyStats = rootPath.resolve("_strategy_stats.csv");
        var reports = BuletoWriter.aggregate(results);
        reports.sort(Comparator.comparingLong(AggregatedReport::totalNetProfit).reversed());
        FastCsvWriter.write(reports, strategyStats, BuletoConstants.OPTIONS);
        //==============================================================================================================
        var sessionName = rootPath.getFileName().toString();
        var builder = new StringBuilder("\nSession: " + sessionName + "\n");
        var list = reports.stream()
                .filter(r -> r.totalNetProfit() > 0)
                .toList();
        list.forEach(r -> builder.append(r.strategyName())
                .append(": ")
                .append(r.totalNetProfit())
                .append("\n"));
        var logPath = Paths.get(ROOT, "log.log");
        try {
            Files.createDirectories(logPath.getParent());
            Files.writeString(logPath, builder, StandardCharsets.UTF_8, StandardOpenOption.APPEND, StandardOpenOption.CREATE);
        } catch (IOException e) {
            FastLogger.error("Ошибка логирования: {}", e.getMessage());
        }
        return list;
    }
    static Config buildConfig(String name, Deque<Integer> deque) {
        return ConfigBuilder.builder()
                .name(name)
                .american()
                .startBalance(1_000L)

                .limits(5L, 1_000L, 5000L)

                .riskConfig(RiskConfig.defaultConfig())

                .stopLossPercentageStop(40)
                .takeProfitPercentageStop(10)
                .maxDrawdownPercentageStop(50)

//                .stagnationWindowStop(500)

                .dangerZoneThresholdRisk(50)
                .profitZoneThresholdRisk(130)
                .normalZoneBetCapRisk(10)
                .penaltyBoxDurationRisk(0)

                .maxBetBalancePercentageLimit(20)

                .minWinRateThresholdLimit(5)

                .floatingMinBetPercentLimit(1)

                .initialHistory(deque)
                .build();
    }
    @Setter
    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @CsvFile(separator = Separator.SEMICOLON)
    public static class Result {
        @CsvColumn(value = "Session", order = 0)
        String session;
        @CsvColumn(value = "Strategy", order = 1)
        public String strategyName;
        @CsvColumn(value = "Net Profit", order = 6)
        public long netProfit;
        @CsvColumn(value = "Avg Profit", order = 7)
        public double averageProfit;

        public static Result from(String session, AggregatedReport report) {
            return Result.builder()
                    .session(session)
                    .strategyName(report.strategyName())
                    .netProfit(report.totalNetProfit())
                    .averageProfit(report.averageProfit())
                    .build();
        }
    }
}

