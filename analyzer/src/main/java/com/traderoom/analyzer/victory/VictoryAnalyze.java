//package com.traderoom.analyzer.victory;
//
//import com.traderoom.analyzer.example.BuletoConfig;
//import com.traderoom.analyzer.BuletoConstants;
//import com.traderoom.analyzer.example.BuletoSimulator;
//import com.traderoom.analyzer.example.BuletoSpotSupplier;
//import com.traderoom.analyzer.D20260123;
//import com.traderoom.analyzer.D20260124;
//import com.traderoom.analyzer.D20260125;
//import com.traderoom.analyzer.D20260126;
//import com.traderoom.analyzer.D20260127;
//import com.traderoom.analyzer.D20260128;
//import com.traderoom.analyzer.D20260129;
//import com.traderoom.core.util.CsvDataLoader;
//import com.traderoom.api.ConfigBuilder;
//import com.traderoom.api.IStrategy;
//import com.traderoom.api.model.config.Config;
//import com.traderoom.api.enums.RouletteType;
//import com.traderoom.api.enums.GenerateType;
//import com.traderoom.api.model.Snapshot;
//import com.traderoom.api.runner.SimulateResult;
//import com.traderoom.api.runner.supplier.RandomSpotSupplier;
//import com.traderoom.api.runner.supplier.SpotSupplier;
//
//import java.util.Collection;
//import java.util.Deque;
//import java.util.LinkedList;
//import java.util.NavigableMap;
//import java.util.Set;
//import java.util.TreeMap;
//import java.util.function.Supplier;
//
//public class VictoryAnalyze {
//
//    static final Set<Class<? extends IStrategy>> CLASSES = BuletoConfig.all();
//    static final Deque<Integer> deque = CsvDataLoader.load(BuletoConstants.VICTORY);
//    static final Supplier<SpotSupplier> supplier = () -> BuletoSpotSupplier.of(deque);
//    static final Supplier<SpotSupplier> random = () -> RandomSpotSupplier.of(RouletteType.AMERICAN, GenerateType.RANDOM, 10000);
//
//    static void main() {
//        victory();
//    }
//
//    static void victory() {
//        var deque = new LinkedList<Integer>();
//        deque.addAll(D20260123.deque());
//        deque.addAll(D20260124.deque());
//        deque.addAll(D20260125.deque());
//        deque.addAll(D20260126.deque());
//        deque.addAll(D20260127.deque());
//        deque.addAll(D20260128.deque());
//        deque.addAll(D20260129.deque());
//        Supplier<SpotSupplier> supplier = () -> BuletoSpotSupplier.of(deque);
//        NavigableMap<String, Long> counter = new TreeMap<>();
//        Collection<SimulateResult> results = new BuletoSimulator(Set.of(config()), CLASSES).simulate(1, supplier);
//        for (SimulateResult result : results) {
//            Long summ = counter.getOrDefault(result.strategy(), 0L) + result.runnerResult().snapshot().netProfit();
//            counter.put(result.strategy(), summ);
//        }
//        counter.forEach((strategy, count) -> System.out.printf("%34s: %d\n", strategy, count));
//    }
//
//    static void random(int count) {
//        NavigableMap<String, Long> counter = new TreeMap<>();
//        for (int i = 0; i < count; i++) {
//            Collection<SimulateResult> results = new BuletoSimulator(Set.of(config()), CLASSES).simulate(1, random);
//            for (SimulateResult result : results) {
//                Long summ = counter.getOrDefault(result.strategy(), 0L) + result.runnerResult().snapshot().netProfit();
//                counter.put(result.strategy(), summ);
//            }
//        }
//        counter.forEach((strategy, value) -> System.out.printf("%34s: %d\n", strategy, value));
//    }
//
//    static void statistic(int count) {
//        NavigableMap<String, Integer> counter = new TreeMap<>();
//        for (int i = 0; i < count; i++) {
//            final Supplier<SpotSupplier> random = () -> RandomSpotSupplier.of(RouletteType.AMERICAN, GenerateType.RANDOM, 960);
//            Collection<SimulateResult> results = new BuletoSimulator(Set.of(config()), CLASSES).simulate(1, random);
//            for (SimulateResult result : results) {
//                Snapshot snapshot = result.runnerResult().snapshot();
//                if (snapshot.netProfit() > 0) {
//                    counter.put(result.strategy(), counter.getOrDefault(result.strategy(), 0) + 1);
//                }
//            }
//        }
//        counter.forEach((strategy, value) -> System.out.printf("%34s: %d\n", strategy, value));
//    }
//
//    static Config config() {
//        return ConfigBuilder.builder()
//                .name("Test")
//                .american()
//                .startBalance(1_000L)
//                .limits(5L, 1_000L, 5000L)
////                .riskConfig(RiskConfig.disabled())
////                .stagnationWindowStop(1000)
//                .stopLossPercentageStop(30)
//                .takeProfitPercentageStop(30)
//                .trailingStopPercentageStop(30)
//                .maxDrawdownPercentageStop(50)
//                .dangerZoneThresholdRisk(50)
//                .profitZoneThresholdRisk(130)
//                .normalZoneBetCapRisk(10)
//                .penaltyBoxDurationRisk(0)
//                .maxBetBalancePercentageLimit(20)
//                .minWinRateThresholdLimit(5)
//                .floatingMinBetPercentLimit(1)
//                .build();
//    }
//}
