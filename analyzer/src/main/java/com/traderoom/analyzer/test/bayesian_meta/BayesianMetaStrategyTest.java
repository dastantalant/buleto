package com.traderoom.analyzer.test.bayesian_meta;

import com.traderoom.analyzer.BuletoConstants;
import com.traderoom.core.util.CsvDataLoader;
import com.traderoom.api.ConfigBuilder;
import com.traderoom.api.StrategyFactory;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.model.config.RawConfig;
import com.traderoom.api.model.config.RiskConfig;
import com.traderoom.api.enums.RouletteType;
import com.traderoom.api.model.Snapshot;
import com.traderoom.api.runner.RunnerResult;
import com.traderoom.api.runner.Simulator;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Optional;

public class BayesianMetaStrategyTest {

    static void main() {
        Deque<Integer> deque = CsvDataLoader.load(BuletoConstants.VICTORY);
        Deque<Integer> war = new ArrayDeque<>(2880);

        for(int i = 0; i < 2880; i++){
            war.add(deque.poll());
        }
        Optional<Simulator> optional = StrategyFactory.simulator("BayesianMetaStrategy", buildConfig(), deque);
        optional.ifPresent(simulator -> {
            RunnerResult run = simulator.run();
            System.out.println("FINAL: " + run.snapshot());
            System.out.println();
            Deque<Snapshot> snapshots = run.deque();
            for (Snapshot snapshot : snapshots) {
//                if(snapshot.lastBets() != null && !snapshot.lastBets().isEmpty())
                System.out.println(snapshot.roundNumber() +
                        " realBalance: " + snapshot.realBalance() +
                        " net: " + snapshot.netProfit() +
                        " spot: " + (snapshot.lastSpot() == null ? " ": snapshot.lastSpot().getNumber()) +
                        " bet: " + snapshot.roundBetAmount()
                );
            }
        });
    }
    static RawConfig config() {
        return RawConfig.builder()
                .name("TEST")
                .type(RouletteType.AMERICAN)
                .startBalance(1_000L)
                .minBet(1L)
                .maxBet(1000L)
                .tableLimit(5000L)
                .stopLossPercentageStop(40)
                .takeProfitPercentageStop(10)
                .maxDrawdownPercentageStop(50)

//                .stagnationWindowStop(1000)

                .dangerZoneThresholdRisk(50)
                .profitZoneThresholdRisk(130)
                .normalZoneBetCapRisk(10)
                .penaltyBoxDurationRisk(0)

                .maxBetBalancePercentageLimit(20)

                .minWinRateThresholdLimit(5)

                .floatingMinBetPercentLimit(1)
                .build();
    }
    static Config buildConfig() {
        return ConfigBuilder.builder()
                .name("Test")
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

                .build();
    }
}
