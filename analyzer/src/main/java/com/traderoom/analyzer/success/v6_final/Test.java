package com.traderoom.analyzer.success.v6_final;

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

import static com.traderoom.analyzer.BuletoConstants.DEQUE;

@Deprecated
public class Test {

    static int window = 120; // 120
    static int limitBet = 10; // 10
    static long balance = 1000_00;
    static long minBet = (long) (((double) balance / 100) * 1.5); // 1.5%
    static int stopLossPercentageStop = 80; // 80
    static int takeProfitPercentageStop = 1200; // 420
    static int floatingMinBetPercentLimit = 10; // 10

    static void main() {
        int loss = 0;
        int won = 0;
        long sum = 0;
        long warming = window;
        while (true) {
            var strategy = new FrequencyPatternStrategy(config(), window, limitBet);
            Deque<Integer> deque = split(deque(), warming);
            if (deque.isEmpty()) break;
            SpotSupplier supplier = BuletoSpotSupplier.european(deque);
            Simulator simulator = Simulator.create(strategy, supplier);
            var run = simulator.run();
            var snapshot = run.snapshot();
            System.out.printf("%4d: %6d\n", snapshot.roundNumber(), snapshot.netProfit() / 100);
//            for (var s : run.deque()) {
//                System.out.printf("%8d: %d\n", s.roundNumber(), s.netProfit() / 100);
//            }
            if (snapshot.netProfit() > 0) won++;
            else loss++;
            sum = sum + snapshot.netProfit();
            warming =run.deque().size() + warming + 120;
//            warming = warming + run.deque().size();
        }
        System.out.println("\nwon: " + won + " loss: " + loss);
        System.out.println("balance: " + balance / 100);
        System.out.println("sum: " + sum / 100);
    }

    static Config config() {
        return ConfigMapper.toRaw(RawConfigModel.builder()
                        .name("Test")
                        .realBalance(balance * 10)
                        .startBalance(balance)
                        .minBet(minBet)
                        .maxBet(15_000L)
                        .tableLimit(15_000L)
                        .stopLossPercentageStop(stopLossPercentageStop)
                        .takeProfitPercentageStop(takeProfitPercentageStop)
//                        .trailingStopPercentageStop(90)
//                        .maxDrawdownPercentageStop(90)
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
            deque.poll();
        }
        return deque;
    }

    private static Deque<Integer> deque() {
        Deque<Integer> deque = DEQUE;
        D20260123.deque(deque);
        D20260124.deque(deque);
        D20260125.deque(deque);
        D20260126.deque(deque);
        D20260127.deque(deque);
        D20260128.deque(deque);
        D20260129.deque(deque);
        D20260130.deque(deque);
        D20260201.deque(deque);
        return deque;
    }

}
