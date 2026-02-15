package com.buleto.analyzer.predictor;

import com.buleto.analyzer.D20260123;
import com.buleto.analyzer.D20260124;
import com.buleto.analyzer.D20260125;
import com.buleto.analyzer.D20260126;
import com.buleto.analyzer.D20260127;
import com.buleto.analyzer.D20260128;
import com.buleto.analyzer.D20260129;
import com.buleto.analyzer.D20260130;
import com.buleto.analyzer.D20260201;
import com.buleto.analyzer.example.BuletoSpotSupplier;
import com.trading.roulette.api.model.config.Config;
import com.trading.roulette.api.runner.Simulator;
import com.trading.roulette.api.runner.supplier.SpotSupplier;
import com.buleto.common.mapper.ConfigMapper;
import com.buleto.common.model.RawConfigModel;

import java.util.Deque;
import java.util.LinkedList;

import static com.buleto.analyzer.BuletoConstants.DEQUE;

public class StrategyTestMain {

    static void main() {
        int loss = 0;
        int won = 0;
        long summ = 0;
        long war = window;
        var victory = deque(old);
        while (true) {
            var strategy = new StrategyTest(config(), limitBet, window);
            Deque<Integer> deque = split(new LinkedList<>(victory), war);
            if (deque.isEmpty()) break;
            SpotSupplier supplier = BuletoSpotSupplier.of(deque);
            Simulator simulator = Simulator.create(strategy, supplier);
            var run = simulator.run();
            var snapshot = run.snapshot();
//            System.out.println((snapshot.netProfit() > 0 ? "+"+snapshot.netProfit() :"+("+ snapshot.netProfit()+")"));
//            System.out.printf("%4d:%6d\n", snapshot.roundNumber() , snapshot.netProfit());
//            if (snapshot.netProfit() < 0)
//                for (var s : run.deque()) System.out.printf("%8d: %d\n", s.roundNumber(), s.netProfit());
            if (snapshot.netProfit() > 0) won++;
            else loss++;
            summ = summ + snapshot.netProfit();
            war = war + 120;
        }
        System.out.println((won + loss) + ": won: " + won + " loss: " + loss + " result: " + summ);
    }

    static int old = 0;
    static int window = 240;
    static int limitBet = 10;
    static long balance = 10000;
    static long minBet = 150;
    static int stopLossPercentageStop = 40;
    static int takeProfitPercentageStop = 400;

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
//                        .floatingMinBetPercentLimit(10)
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
        return old == 1 ? new LinkedList<>(DEQUE) : new LinkedList<>() {{
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
}
