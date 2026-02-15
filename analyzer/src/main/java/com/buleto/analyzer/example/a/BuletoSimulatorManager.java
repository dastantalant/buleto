//package com.traderoom.strategy.simulation.buleto;
//
//import com.toolbox.core.logging.FastLogger;
//import com.trading.roulette.api.IStrategy;
//import com.trading.roulette.api.exception.StrategyException;
//import com.trading.roulette.api.StrategyFactory;
//import com.trading.roulette.api.config.Config;
//import com.trading.roulette.api.model.Snapshot;
//import com.trading.roulette.strategy.simulation.BetSimulatorManager;
//import com.trading.roulette.api.runner.generator.Simulator;
//import com.trading.roulette.strategy.simulation.buleto.writer.ConfigWriter;
//import com.trading.roulette.strategy.simulation.buleto.writer.FullCsvLogger;
//
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
//@RequiredArgsConstructor
//public class BuletoSimulatorManager {
//    private final StrategyFactory factory;
//    private final Deque<Integer> victory;
//    private final long max;
//
//    /**
//     * @param sessionDir Корневая папка сессии (например "result/22.01.2026_18.00")
//     */
//    public Map<Integer, List<Snapshot>> repeatAll(int repeat, String sessionDir, String configName, boolean random) {
//        return repeatAll(repeat, sessionDir, config(configName), random);
//    }
//
//    public Map<Integer, List<Snapshot>> repeatAll(int repeat, String sessionDir, Config config, boolean random) {
//        Map<Integer, List<Snapshot>> results = new HashMap<>();
//
//        // 1. Параллельный запуск всех повторов (Runs)
//        if (repeat <= 0) {
//            results.put(1, simulateAll(sessionDir, config, random));
//        } else {
//            try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
//                Map<Integer, Future<List<Snapshot>>> futures = new HashMap<>();
//
//                for (int i = 0; i < repeat; i++) {
//                    final int index = i; // Run ID (0, 1, 2...)
//                    Callable<List<Snapshot>> task = () -> simulateAll(sessionDir, config, random);
//                    futures.put(index, executor.submit(task));
//                }
//                for (Map.Entry<Integer, Future<List<Snapshot>>> entry : futures.entrySet()) {
//                    try {
//                        results.put(entry.getKey(), entry.getValue().get());
//                    } catch (InterruptedException | ExecutionException e) {
//                        FastLogger.error("Error collecting results for run " + entry.getKey(), e);
//                    }
//                }
//            }
//        }
//
//        // 2. Обработка результатов (фильтрация и запись только успешных)
//        processAndLogSuccessfulRuns(results, sessionDir, config.name());
//
//        return results;
//    }
//
//    private void processAndLogSuccessfulRuns(Map<Integer, List<Snapshot>> allRuns, String sessionDir, String configName) {
//        // Проходим по каждому запуску (Run ID -> Список результатов стратегий в этом запуске)
//        allRuns.forEach((runId, snapshots) -> {
//
//            for (Snapshot snapshot : snapshots) {
//                // ГЛАВНОЕ УСЛОВИЕ: Пишем только если итоговый баланс положительный (есть чистая прибыль)
//                if (snapshot.getNetProfit() > 0) {
//                    writeSnapshotToFile(sessionDir, snapshot, configName, runId);
//                }
//            }
//        });
//    }
//
//    private void writeSnapshotToFile(String sessionDir, Snapshot snapshot, String configName, Integer runId) {
//        String strategyName = snapshot.strategyName();
//
//        // Папка: result/Date/StrategyName
//        String strategyDir = sessionDir + File.separator + strategyName;
//
//        // Имя файла: ConfigName_RunID (например: Default_5.csv)
//        // Это гарантирует, что мы видим каждый успешный прогон отдельно
//        String fileName = configName + "_" + runId;
//
//        try (FullCsvLogger logger = new FullCsvLogger(strategyDir, fileName)) {
//            logger.onRound(snapshot);
//        } catch (Exception e) {
//            FastLogger.error("Failed to write success report for " + strategyName, e);
//        }
//    }
//
//    private List<Snapshot> simulateAll(String sessionDir, Config config, boolean random) {
//        try {
//            // Сохраняем конфиг (технический файл), путь не влияет на логику стратегий
//            String configDumpDir = sessionDir + File.separator + "_Configs";
//            Config configForFactory = ConfigWriter.write(configDumpDir, config);
//
//            // Создаем стратегии (Config чистый, strategies создают свои условия внутри)
//            List<IStrategy> strategies = factory.create(configForFactory);
//
//            if (random) {
//                return simulate(strategies, strategy -> BuletoSimulator.of(strategy, max));
//            } else {
//                return simulate(strategies, strategy -> BuletoSimulator.of(strategy, new LinkedList<>(victory)));
//            }
//        } catch (Exception e) {
//            FastLogger.error("main exception in simulateAll", e);
//            throw new StrategyException("main simulate exception", e);
//        }
//    }
//
//    private List<Snapshot> simulate(List<IStrategy> strategies, Function<IStrategy, Simulator> function) throws Exception {
//        // Симуляция в памяти
//        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
//            List<Callable<Snapshot>> tasks = strategies.stream()
//                    .map(strategy -> (Callable<Snapshot>) () -> {
//                        Simulator simulator = function.apply(strategy);
//                        return simulator.run(); // Возвращает итоговый Snapshot после окончания игры
//                    })
//                    .toList();
//
//            List<Future<Snapshot>> futures = executor.invokeAll(tasks);
//
//            List<Snapshot> snapshots = new ArrayList<>(strategies.size());
//            for (Future<Snapshot> future : futures) {
//                snapshots.add(future.get());
//            }
//            return snapshots;
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
//}