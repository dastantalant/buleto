//package com.traderoom.strategy.simulation.buleto;
//
//import com.toolbox.core.logging.FastLogger;
//import com.trading.roulette.api.IStrategy;
//import com.trading.roulette.api.exception.StrategyException;
//import com.trading.roulette.api.StrategyFactory;
//import com.trading.roulette.api.config.Config;
//import com.trading.roulette.api.model.Snapshot;
//import com.trading.roulette.api.runner.generator.Simulator;
//
//import lombok.RequiredArgsConstructor;
//
//import java.util.ArrayList;
//import java.util.Comparator;
//import java.util.Deque;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.Optional;
//import java.util.function.Function;
//
//import static com.traderoom.api.config.ConfigHolder.CONFIG_HOLDER;
//
//@Deprecated
//@RequiredArgsConstructor
//public class BuletoManager {
//    private final StrategyFactory factory;
//    private final Deque<Integer> victory;
//    private final long max;
//
//    public Map<Integer, List<Snapshot>> repeatAll(int repeat, String outDir, String configName, boolean random) {
//        return repeatAll(repeat, outDir, config(configName), random);
//    }
//
//    public Map<Integer, List<Snapshot>> repeatAll(int repeat, String outDir, Config config, boolean random) {
//        if (repeat <= 0) {
//            return Map.of(1, simulateAll(outDir, config, random));
//        }
//        var map = new HashMap<Integer, List<Snapshot>>();
//        for (int i = 0; i < repeat; i++) {
//            map.put(i, simulateAll(outDir + "/" + i, config, random));
//        }
//        return map;
//    }
//
//    private List<Snapshot> simulateAll(String outDir, Config config, boolean random) {
//        try {
//            List<IStrategy> strategies = factory.create(ConfigWriter.write(outDir, config));
//            if (random) {
//                return simulateAll(strategies, strategy -> BuletoSimulator.of(strategy, max), outDir);
//            } else {
//                return simulateAll(strategies, strategy -> BuletoSimulator.of(strategy, victory), outDir);
//            }
//        } catch (Exception e) {
//            FastLogger.error("main exception", e);
//            throw new StrategyException("main simulate exception");
//        }
//    }
//
//    private List<Snapshot> simulateAll(List<IStrategy> strategies, Function<IStrategy, Simulator> function, String outDir) throws Exception {
//        List<Snapshot> snapshots = new ArrayList<>(100);
//        for (IStrategy strategy : strategies) {
//            try (CsvPartyLogger logger = new CsvPartyLogger(outDir, strategy.getName())) {
//                strategy.addSubscriber(logger);
//                Simulator simulator = function.apply(strategy);
//                Snapshot snapshot = simulator.run();
//                snapshots.addLast(snapshot);
//            }
//        }
//        return summary(snapshots, outDir);
//    }
//
//    private List<Snapshot> summary(List<Snapshot> snapshots, String outDir) throws Exception {
//        snapshots.sort(Comparator.comparingDouble(Snapshot::roiPercentage).reversed());
//        try (FullCsvLogger logger = new FullCsvLogger(outDir, "_FULL_RANKING")) {
//            for (Snapshot snapshot : snapshots) {
//                logger.onRound(snapshot);
//            }
//            FastLogger.info("write to {}_FULL_RANKING.csv finished", outDir);
//        }
//        return snapshots;
//    }
//
//    private Config config(String configName) {
//        Optional<Config> optional = CONFIG_HOLDER.get(configName);
//        if (optional.isEmpty()) {
//            FastLogger.warn("load config failed");
//            throw new StrategyException("load config failed");
//        }
//        return optional.get();
//    }
//}
