//package com.traderoom.analyzer.advanced;
//
//import com.trading.roulette.api.StrategyFactory;
//import com.trading.roulette.api.model.config.RawConfig;
//import com.trading.roulette.api.enums.RouletteType;
//import com.trading.roulette.api.model.Snapshot;
//import com.trading.roulette.api.runner.RunnerResult;
//import com.trading.roulette.api.runner.Simulator;
//
//import java.util.Deque;
//import java.util.Optional;
//
//public class KellyCriterionStrategyTest {
//    static RawConfig buildConfig2(String name) {
//        return RawConfig.builder()
//                .name(name)
//                .type(RouletteType.AMERICAN)
//                .startBalance(1_000L)
//                .minBet(1L)
//                .maxBet(1000L)
//                .tableLimit(5000L)
//                .stopLossPercentageStop(40)
//                .takeProfitPercentageStop(10)
//                .maxDrawdownPercentageStop(50)
//                .maxRoundsStop(500L)
//                .build();
//    }
//
//    static void main() {
//        Deque<Integer> deque = DeqTest.deque();
//        var config = buildConfig2("KellyCriterionStrategy Test");
//        config.initialHistory(War.get());
//
//        Optional<Simulator> optional = StrategyFactory.simulator("KellyCriterionStrategy", config, deque);
//        optional.ifPresent(simulator -> {
//            RunnerResult run = simulator.run();
//            System.out.println("FINAL: " + run.snapshot());
//            System.out.println();
//            Deque<Snapshot> snapshots = run.deque();
//            for (Snapshot snapshot : snapshots) {
//                System.out.println(snapshot.roundNumber() +
//                        " realBalance: " + snapshot.realBalance() +
//                        " net: " + snapshot.netProfit() +
//                        " spot: " + (snapshot.lastSpot() == null ? " ": snapshot.lastSpot().getNumber()) +
//                        " bet: " + snapshot.roundBetAmount()
//                );
//            }
//        });
//    }
//}
