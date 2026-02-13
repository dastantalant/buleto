package com.traderoom.analyzer;

import com.traderoom.analyzer.example.BuletoSpotSupplier;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.runner.Simulator;
import com.traderoom.api.runner.supplier.SpotSupplier;
import com.traderoom.common.mapper.ConfigMapper;
import com.traderoom.common.model.RawConfigModel;

import java.util.Deque;
import java.util.LinkedList;

import static com.traderoom.analyzer.BuletoConstants.DEQUE;

// NeighborAnalysisStrategy
public class CustomStrategyTest {

    static void main() {
        int loss = 0;
        int won = 0;
        long summ = 0;
        long war = window;
        while (true) {
            var strategy = new CustomStrategy(config(), window, limitBet);
            Deque<Integer> deque = split(deque(old), war);
            if (deque.isEmpty()) break;
            SpotSupplier supplier = BuletoSpotSupplier.european(deque);
            Simulator simulator = Simulator.create(strategy, supplier);
            var run = simulator.run();
            var snapshot = run.snapshot();
//            System.out.println((snapshot.netProfit() > 0 ? "+"+snapshot.netProfit() :"+("+ snapshot.netProfit()+")"));
//            System.out.printf("%3d:%5d\n", snapshot.roundNumber() , snapshot.netProfit());
//            if (snapshot.netProfit() < 0)
//                for (var s : run.deque()) System.out.printf("%6d: %d\n", s.roundNumber(), s.netProfit());
            if (snapshot.netProfit() > 0) won++;
            else loss++;
            summ += snapshot.netProfit();
            war = war + 120;
        }
        System.out.println((won + loss)+": " +won + "/" + loss + " " + summ);

    }

    static int old = 1;
    static int window = 120;
    static int limitBet = 10;
    static long balance = 1000;
    static long minBet = 10L;
    static int stopLossPercentageStop = 40;
    static int takeProfitPercentageStop = 300;
    static int floatingMinBetPercentLimit =10;

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
        return old ==1 ? new LinkedList<>(DEQUE) : new LinkedList<>() {{
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
