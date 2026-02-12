package com.traderoom.analyzer.success.v1;

import com.traderoom.analyzer.D20260123;
import com.traderoom.analyzer.D20260124;
import com.traderoom.analyzer.D20260125;
import com.traderoom.analyzer.D20260126;
import com.traderoom.analyzer.D20260127;
import com.traderoom.analyzer.D20260128;
import com.traderoom.analyzer.D20260129;
import com.traderoom.analyzer.D20260130;
import com.traderoom.analyzer.D20260201;
import com.traderoom.analyzer.example.BuletoSpotSupplier;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.runner.Simulator;
import com.traderoom.api.runner.supplier.SpotSupplier;
import com.traderoom.web.mapper.ConfigMapper;
import com.traderoom.web.model.RawConfigModel;

import java.util.Deque;
import java.util.LinkedList;

import static com.traderoom.analyzer.BuletoConstants.DEQUE;

// NeighborAnalysisStrategy
public class CustomStrategyTest {

    static void main() {

        var old = false;
        int i = 0;
        int win = 120;
        int loss = 0;
        int won = 0;
        int summ = 0;
        long war = win;
        while (true) {
            var strategy = new CustomStrategy(config(), win, 12);
            Deque<Integer> deque = split(deque(old), war);
            if (deque.isEmpty()) break;
            SpotSupplier supplier = BuletoSpotSupplier.european(deque);
            Simulator simulator = Simulator.create(strategy, supplier);
            var run = simulator.run();
            var snapshot = run.snapshot();
            i++;
//            System.out.println(snapshot.roundNumber() + ": " + (snapshot.netProfit() > 0 ? "+" + snapshot.netProfit() : snapshot.netProfit()));
            System.out.println(snapshot.roundNumber() + ": " + (snapshot.netProfit()));
//            for (var s : run.deque()) {
//                System.out.printf("%6d: %d\n", s.roundNumber(), s.netProfit());
//            }
            if (snapshot.netProfit() > 0) won++;
            else loss++;
            summ += snapshot.netProfit();
            war = war + 120;
        }
        System.out.println(won + "/" + loss + " " + summ);

    }


    static Deque<Integer> split(Deque<Integer> deque, long count) {
        for (int i = 0; i < count && !deque.isEmpty(); i++) {
            deque.pollFirst();
        }
        return deque;
    }

    static Deque<Integer> deque(boolean old) {
        return old ? new LinkedList<>(DEQUE) : new LinkedList<>() {{
            addAll(D20260123.deque());
            addAll(D20260124.deque());
            addAll(D20260125.deque());
            addAll(D20260126.deque());
            addAll(D20260127.deque());
            addAll(D20260128.deque());
            addAll(D20260129.deque());
            addAll(D20260130.deque());
            addAll(D20260201.deque());
        }};
    }

    static Config config() {
        int balance = 1000;
        return ConfigMapper.toRaw(RawConfigModel.builder()
                        .name("Test")
                        .realBalance((long) (balance * 10))
                        .startBalance((long) balance)
                        .minBet(15L)
                        .maxBet(15_000L)
                        .tableLimit(15_000L)
//                        .riskConfig(RiskConfig.disabled())

                        .stopLossPercentageStop(50)
                        .takeProfitPercentageStop(120)
//                        .trailingStopPercentageStop(50)
//                        .maxDrawdownPercentageStop(50)
//                        .maxWinStreakStop(5)
//                        .maxLossStreakStop(10)
//                        .maxRoundsStop()
//                        .stagnationWindowStop(50)
//                        .minWinRateThresholdStop()
//                        .minRoundsForWinRateStop()


                        .dangerZoneThresholdRisk(0)
                        .profitZoneThresholdRisk(0)
                        .normalZoneBetCapRisk(100)
                        .penaltyBoxDurationRisk(0)

//                        .maxBetBalancePercentageLimit()
//                        .peakProtectDrawdownStepLimit(30)
//                        .peakProtectReductionFactorLimit()
//                        .minWinRateThresholdLimit()
//                        .minWinRateRoundsLimit()
                        .floatingMinBetPercentLimit(10)
                        .build())
                .toConfig();
    }
}
