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
import com.trading.roulette.api.model.Snapshot;
import com.trading.roulette.api.model.config.Config;
import com.trading.roulette.api.model.config.RiskConfig;
import com.trading.roulette.api.runner.RunnerResult;
import com.trading.roulette.api.runner.Simulator;
import com.trading.roulette.api.runner.supplier.SpotSupplier;
import com.trading.roulette.strategy.strategies.ContinuousTrendStrategy;

import java.util.Deque;
import java.util.LinkedList;

public class ContinuousTrendStrategyTest {
    static void main() {
        var strategy = new ContinuousTrendStrategy(config());

        SpotSupplier supplier = BuletoSpotSupplier.of(deque(0));

        Simulator simulator = Simulator.create(strategy, supplier);
        RunnerResult run = simulator.run();
        for (Snapshot snapshot : run.deque()) {
            System.out.printf("%4d: %5d %s\n", snapshot.roundNumber(), snapshot.realBalance(), "");
        }
    }

    static Deque<Integer> deque(int count){
                var deque = new LinkedList<Integer>() {{
            addAll(D20260123.deque());
            addAll(D20260124.deque());
            addAll(D20260125.deque());
            addAll(D20260126.deque());
            addAll(D20260127.deque());
            addAll(D20260128.deque());
            addAll(D20260129.deque());
        }};
//        var deque = CsvDataLoader.load(BuletoConstants.VICTORY);

        for (int i = 0; i < count; i++) {
            deque.pollFirst();
        }
        return deque;
    }
    static Config config() {
        return config(new LinkedList<>());
    }

    static Config config(Deque<Integer> deque) {
        return ConfigBuilder.builder()
                .name("Test")
                .american()
                .startBalance(1_000L)
                .limits(50L, 2_000L, 15000L)
                .riskConfig(RiskConfig.disabled())
//                .stagnationWindowStop(500)
                .stopLossPercentageStop(90)
//                .takeProfitPercentageStop(400)
//                .trailingStopPercentageStop(100)
//                .maxDrawdownPercentageStop(50)
//                .dangerZoneThresholdRisk(50)
//                .profitZoneThresholdRisk(130)
//                .normalZoneBetCapRisk(10)
//                .penaltyBoxDurationRisk(0)
//                .maxBetBalancePercentageLimit(20)
//                .minWinRateThresholdLimit(5)
//                .floatingMinBetPercentLimit(1)
                .initialHistory(deque)
                .build();
    }
}
