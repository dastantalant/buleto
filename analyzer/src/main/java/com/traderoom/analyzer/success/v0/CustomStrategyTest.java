package com.traderoom.analyzer.success.v0;

import com.traderoom.analyzer.D20260123;
import com.traderoom.analyzer.D20260124;
import com.traderoom.analyzer.D20260125;
import com.traderoom.analyzer.D20260126;
import com.traderoom.analyzer.D20260127;
import com.traderoom.analyzer.D20260128;
import com.traderoom.analyzer.D20260129;
import com.traderoom.analyzer.example.BuletoSpotSupplier;
import com.traderoom.api.ConfigBuilder;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.model.config.RiskConfig;
import com.traderoom.api.runner.Simulator;
import com.traderoom.api.runner.supplier.SpotSupplier;

import java.util.Deque;
import java.util.LinkedList;

import static com.traderoom.analyzer.BuletoConstants.DEQUE;

@Deprecated
public class CustomStrategyTest {

    static void main() {
        int i = 0;
        int loss = 0;
        int won = 0;
        int summ = 0;
        while (true) {
            var strategy = new CustomStrategy(config());
            Deque<Integer> deque = split(deque(old), win * i);
            if (deque.isEmpty()) break;
            SpotSupplier supplier = BuletoSpotSupplier.of(deque);
            Simulator simulator = Simulator.create(strategy, supplier);
            var run = simulator.run();
            var snapshot = run.snapshot();
            i++;
//            System.out.println(snapshot.netProfit() > 0 ? "+"+snapshot.netProfit() :snapshot.netProfit());
            if (snapshot.netProfit() > 0) won++;
            else loss++;
            summ += snapshot.netProfit();
        }
        System.out.println("won: " + won + " loss: " + loss + " profit: " + summ);
    }

    static int old = 0;
    static int win = 960;
    static long balance = 10000;
    static long maxBet = 15000;
    static long minBet = 100;
    static int stopLossPercentageStop = 60;
    static int takeProfitPercentageStop = 100;

    static Deque<Integer> split(Deque<Integer> deque, int count) {
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
        }};
    }

    static Config config() {
        return ConfigBuilder.builder()
                .name("Test")
                .american()
                .startBalance(balance)
                .realBalance(balance * 10)
                .minBet(minBet)
                .maxBet(maxBet)
                .tableLimit(maxBet)
                .riskConfig(RiskConfig.disabled())
//                .stagnationWindowStop(500)
                .stopLossPercentageStop(stopLossPercentageStop)
                .takeProfitPercentageStop(takeProfitPercentageStop)
//                .trailingStopPercentageStop(100)
//                .maxDrawdownPercentageStop(50)


//                .dangerZoneThresholdRisk(50)
//                .profitZoneThresholdRisk(130)
//                .normalZoneBetCapRisk(10)
//                .penaltyBoxDurationRisk(0)

//                .maxBetBalancePercentageLimit(20)
//                .minWinRateThresholdLimit(5)
//                .floatingMinBetPercentLimit(1)
                .build();
    }
}
