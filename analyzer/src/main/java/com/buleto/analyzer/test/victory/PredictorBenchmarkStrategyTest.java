package com.buleto.analyzer.test.victory;

import com.buleto.analyzer.D20260123;
import com.buleto.analyzer.D20260124;
import com.buleto.analyzer.D20260125;
import com.buleto.analyzer.D20260126;
import com.buleto.analyzer.D20260127;
import com.buleto.analyzer.D20260128;
import com.buleto.analyzer.D20260129;
import com.buleto.analyzer.example.BuletoSpotSupplier;
import com.trading.roulette.api.ConfigBuilder;
import com.trading.roulette.api.model.config.Config;
import com.trading.roulette.api.runner.Runner;
import com.trading.roulette.api.runner.Simulator;
import com.trading.roulette.api.runner.supplier.SpotSupplier;
import com.trading.roulette.strategy.strategies.ContinuousTrendStrategy;

import java.util.Deque;
import java.util.LinkedList;

public class PredictorBenchmarkStrategyTest {
    static void main() {
        var strategy = new ContinuousTrendStrategy(config(new LinkedList<>()));
        Runner runner = Runner.of(strategy);
        var deque = new LinkedList<Integer>();
        deque.addAll(D20260123.deque());
        deque.addAll(D20260124.deque());
        deque.addAll(D20260125.deque());
        deque.addAll(D20260126.deque());
        deque.addAll(D20260127.deque());
        deque.addAll(D20260128.deque());
        deque.addAll(D20260129.deque());

        SpotSupplier supplier = BuletoSpotSupplier.of(deque);

        Simulator simulator = Simulator.create(strategy, supplier);
        simulator.run();
    }
    static void PredictorBenchmarkStrategy() {
        var strategy = new PredictorBenchmarkStrategy(config(D20260123.deque()));
//        Runner runner = Runner.of(strategy);
        var deque = new LinkedList<Integer>();
//        deque.addAll(D20260123.deque());
        deque.addAll(D20260124.deque());
//        deque.addAll(D20260125.deque());
//        deque.addAll(D20260126.deque());
//        deque.addAll(D20260127.deque());
//        deque.addAll(D20260128.deque());
//        deque.addAll(D20260129.deque());

        SpotSupplier supplier = BuletoSpotSupplier.of(deque);

        Simulator simulator = Simulator.create(strategy, supplier);
        simulator.run();
    }

    static Config config(Deque<Integer> deque) {
        return ConfigBuilder.builder()
                .name("Test")
                .american()
                .startBalance(1_000L)
                .limits(5L, 1_000L, 5000L)
//                .riskConfig(RiskConfig.disabled())
//                .stagnationWindowStop(1000)
                .stopLossPercentageStop(30)
                .takeProfitPercentageStop(30)
                .trailingStopPercentageStop(30)
                .maxDrawdownPercentageStop(50)
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
}
