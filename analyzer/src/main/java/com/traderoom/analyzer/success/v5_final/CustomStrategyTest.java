package com.traderoom.analyzer.success.v5_final;

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
import com.traderoom.common.mapper.ConfigMapper;
import com.traderoom.common.model.RawConfigModel;

import java.util.Deque;
import java.util.LinkedList;

import static com.traderoom.analyzer.BuletoConstants.DEQUE;

@Deprecated
public class CustomStrategyTest {

    static int old = 1;
    static int window = 120;
    static int limitBet = 12;
    static long balance = 1000;
    static long minBet = 15L;
    static int stopLossPercentageStop = 80;
    static int takeProfitPercentageStop = 420;
    static int floatingMinBetPercentLimit = 10;

    static void main() {
        int loss = 0;
        int won = 0;
        long sum = 0;
        long warming = window;
        while (true) {
            var strategy = new CustomStrategy(config(), window, limitBet);
            Deque<Integer> deque = split(deque(old), warming);
            if (deque.isEmpty()) break;
            SpotSupplier supplier = BuletoSpotSupplier.european(deque);
            Simulator simulator = Simulator.create(strategy, supplier);
            var run = simulator.run();
            var snapshot = run.snapshot();
            System.out.println(snapshot.roundNumber() + ": " + snapshot.netProfit());
//            for (var s : run.deque()) {
//                System.out.printf("%6d: %d\n", s.roundNumber(), s.netProfit());
//            }
            if (snapshot.netProfit() > 0) won++;
            else loss++;
            sum += snapshot.netProfit();
            warming = warming + 120;
        }
        System.out.println("won: " + won + " loss: " + loss + " sum: " + sum);
    }

    static Config config() {
        return ConfigMapper.INSTANCE.toConfig(RawConfigModel.builder()
                        .name("Test")
                        .realBalance(balance * 10)
                        .startBalance(balance)
                        .minBet(minBet)
                        .maxBet(15_000L)
                        .tableLimit(15_000L)
                        .stopLossPercentageStop(stopLossPercentageStop)
                        .takeProfitPercentageStop(takeProfitPercentageStop)
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
                        .floatingMinBetPercentLimit(floatingMinBetPercentLimit)
                        .build())
                .toConfig();
    }

    static Deque<Integer> split(Deque<Integer> deque, long count) {
        for (int i = 0; i < count && !deque.isEmpty(); i++) {
            deque.pollFirst();
        }
        return deque;
    }

    static Deque<Integer> deque(int old) {
        if (old == 1) return new LinkedList<>(DEQUE);
        var deque = new LinkedList<Integer>();
        deque.addAll(D20260123.deque());
        deque.addAll(D20260124.deque());
        deque.addAll(D20260125.deque());
        deque.addAll(D20260126.deque());
        deque.addAll(D20260127.deque());
        deque.addAll(D20260128.deque());
        deque.addAll(D20260129.deque());
        deque.addAll(D20260130.deque());
        deque.addAll(D20260201.deque());
        return deque;
    }

}
