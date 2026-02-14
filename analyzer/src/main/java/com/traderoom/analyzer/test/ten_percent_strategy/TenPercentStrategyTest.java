//package com.traderoom.analyzer.test.ten_percent_strategy;
//
//import com.traderoom.analyzer.BuletoConstants;
//import com.traderoom.core.util.CsvDataLoader;
//import com.traderoom.api.ConfigBuilder;
//import com.traderoom.api.StrategyFactory;
//import com.traderoom.api.model.config.Config;
//import com.traderoom.api.model.config.RiskConfig;
//import com.traderoom.api.model.Snapshot;
//import com.traderoom.api.runner.RunnerResult;
//import com.traderoom.api.runner.Simulator;
//
//import java.util.ArrayDeque;
//import java.util.Deque;
//import java.util.Optional;
//
//public class TenPercentStrategyTest {
//
//    static void main() {
//        Deque<Integer> deque = CsvDataLoader.load(BuletoConstants.VICTORY);
//        Deque<Integer> war = new ArrayDeque<>(2880);
//
//        for(int i = 0; i < 2880; i++){
//            war.add(deque.poll());
//        }
//        Optional<Simulator> optional = StrategyFactory.simulator("BayesianMetaStrategy", buildConfig(war), deque);
//        optional.ifPresent(simulator -> {
//            RunnerResult run = simulator.run();
//            System.out.println("FINAL: " + run.snapshot());
//            System.out.println();
//            Deque<Snapshot> snapshots = run.deque();
//            for (Snapshot snapshot : snapshots) {
//                if(snapshot.lastBets() != null && !snapshot.lastBets().isEmpty())
//                System.out.println(snapshot.roundNumber() +
//                        " realBalance: " + snapshot.realBalance() +
//                        " net: " + snapshot.netProfit() +
//                        " spot: " + (snapshot.lastSpot() == null ? " ": snapshot.lastSpot().getNumber()) +
//                        " bet: " + snapshot.roundBetAmount()
//                );
//            }
//        });
//    }
//
//    static Config buildConfig(Deque<Integer> war) {
//        return ConfigBuilder.builder()
//                .name("Test")
//                .american()
//                .startBalance(1_000L)
//
//                .initialHistory(war)
//                .limits(5L, 1_000L, 5000L)
//
//                .riskConfig(RiskConfig.defaultConfig())
//
//                .stopLossPercentageStop(20)
//                .takeProfitPercentageStop(20)
//                .trailingStopPercentageStop(20)
////                .maxDrawdownPercentageStop(50)
//
////                .stagnationWindowStop(500)
//
////                .dangerZoneThresholdRisk(50)
////                .profitZoneThresholdRisk(130)
////                .normalZoneBetCapRisk(10)
////                .penaltyBoxDurationRisk(0)
//
//                .maxBetBalancePercentageLimit(20)
//
//                .minWinRateThresholdLimit(5)
//
//                .floatingMinBetPercentLimit(1)
//
//                .build();
//    }
//}
