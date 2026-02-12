//package com.traderoom.strategy.simulation;
//
//import com.traderoom.core.logging.FastLogger;
//import com.traderoom.api.IStrategy;
//import com.traderoom.api.exception.StrategyException;
//import com.traderoom.api.StrategyFactory;
//import com.traderoom.api.config.Config;
//import com.traderoom.api.model.Snapshot;
//import com.traderoom.api.runner.RunnerManager;
//import com.traderoom.strategy.simulation.buleto.BuletoSimulator;
//import com.traderoom.strategy.simulation.buleto.writer.ConfigWriter;
//import com.traderoom.strategy.simulation.buleto.writer.CsvLogger;
//
//import lombok.Builder;
//import lombok.RequiredArgsConstructor;
//
//import java.io.File;
//import java.util.ArrayList;
//import java.util.Deque;
//import java.util.HashMap;
//import java.util.LinkedList;
//import java.util.List;
//import java.util.Map;
//import java.util.Optional;
//import java.util.concurrent.Callable;
//import java.util.concurrent.ExecutionException;
//import java.util.concurrent.Executors;
//import java.util.concurrent.Future;
//import java.util.function.Function;
//
//import static com.traderoom.api.config.ConfigHolder.CONFIG_HOLDER;
//
//@Builder
//@RequiredArgsConstructor
//public class BetSimulatorManager {
//    private final Deque<Integer> victory;
//    private final List<Class<? extends IStrategy>> strategies;
//    private final List<Config> configs;
//    private final String directory;
//    private final long max;
//
////    public Map<Integer, List<Snapshot>> run(int repeat, boolean random) {
////        RunnerManager.from()
////    }
//
//    public Map<Integer, List<Snapshot>> repeatAll(int repeat, String sessionDir, String configName, boolean random) {
//        return repeatAll(repeat, sessionDir, config(configName), random);
//    }
//
//    public Map<Integer, List<Snapshot>> repeatAll(int repeat, String sessionDir, Config config, boolean random) {
//        Map<Integer, List<Snapshot>> results;
//        Pair pair = preprocessing(sessionDir, config, random);
//        if (repeat > 0) {
//            try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
//                Map<Integer, Future<List<Snapshot>>> futures = new HashMap<>();
//                for (int i = 0; i < repeat; i++) {
//                    futures.put(i, executor.submit(() -> simulate(pair)));
//                }
//                results = repeat(futures);
//            }
//        } else {
//            results = Map.of(1, simulate(pair));
//        }
//        processAndLogSuccessfulRuns(results, sessionDir, config.name());
//        return results;
//    }
//
//    private Pair preprocessing(String sessionDir, Config config, boolean random) {
//        var strategies = factory.create(ConfigWriter.write(sessionDir + File.separator + "_Configs", config));
//        final Function<IStrategy, Simulator> function = strategy -> random ? BuletoSimulator.of(strategy, max)
//                : BuletoSimulator.of(strategy, new LinkedList<>(victory));
//        return new Pair(strategies, function);
//    }
//
//
//    private Map<Integer, List<Snapshot>> repeat(Map<Integer, Future<List<Snapshot>>> futures) {
//        Map<Integer, List<Snapshot>> results = new HashMap<>();
//        for (Map.Entry<Integer, Future<List<Snapshot>>> entry : futures.entrySet()) {
//            try {
//                results.put(entry.getKey(), entry.getValue().get());
//            } catch (InterruptedException | ExecutionException e) {
//                FastLogger.error("Error collecting results for run " + entry.getKey(), e);
//            }
//        }
//        return results;
//    }
//
//    private void processAndLogSuccessfulRuns(Map<Integer, List<Snapshot>> allRuns, String sessionDir, String configName) {
//        allRuns.forEach((runId, snapshots) -> {
//            for (Snapshot snapshot : snapshots) {
//                if (snapshot.getNetProfit() > 0) {
//                    String strategyDir = sessionDir + File.separator + snapshot.strategyName();
//                    try (CsvLogger logger = new CsvLogger(strategyDir, configName + "_" + runId)) {
//                        logger.onRound(snapshot);
//                    } catch (Exception e) {
//                        FastLogger.error("Failed to write success report for " + snapshot.strategyName(), e);
//                    }
//                }
//            }
//        });
//    }
//
//    private List<Snapshot> simulate(Pair pair) {
//        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
//            List<Callable<Snapshot>> tasks = pair.strategies().stream()
//                    .map(strategy -> (Callable<Snapshot>) () -> pair.function().apply(strategy).run())
//                    .toList();
//            List<Future<Snapshot>> futures = executor.invokeAll(tasks);
//            List<Snapshot> snapshots = new ArrayList<>(pair.strategies().size());
//            for (Future<Snapshot> future : futures) {
//                snapshots.add(future.get());
//            }
//            return snapshots;
//        } catch (Exception e) {
//            FastLogger.error("main exception in simulate", e);
//            throw new StrategyException("main simulate exception", e);
//        }
//    }
//
//    private Config config(String configName) {
//        Optional<Config> optional = CONFIG_HOLDER.get(configName);
//        if (optional.isEmpty()) {
//            FastLogger.warn("load config failed: " + configName);
//            throw new StrategyException("load config failed");
//        }
//        return optional.get();
//    }
//
//    private record Pair(List<IStrategy> strategies, Function<IStrategy, Simulator> function) {
//    }
//}