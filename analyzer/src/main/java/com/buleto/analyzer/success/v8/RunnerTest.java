package com.buleto.analyzer.success.v8;

import com.trading.roulette.api.ConfigBuilder;
import com.trading.roulette.api.enums.Spot;
import com.trading.roulette.api.model.Snapshot;
import com.trading.roulette.api.model.config.Config;
import com.trading.roulette.api.runner.Runner;

import java.util.Deque;
import java.util.LinkedList;

import static com.buleto.analyzer.BuletoConstants.DEQUE;

/*
won: 45 loss: 451
balance: 100
sum: 21664
*/
public class RunnerTest {
    private static final int window = 120; // 120
    private static final int limitBet = 10; // 10
    private static final long balance = 200_00;
    private static final long minBet = (long) (((double) balance / 100) * 1.5); // 1.5%
    private static final long maxBet = 15_000_00;
    private static final int stopLossPercentageStop = 70; // 80
    private static final int takeProfitPercentageStop = 1000; // 420
    private static final int floatingMinBetPercentLimit = 10; // 10

    static void main() {
        Runner runner = Runner.of(new FrequencyPatternStrategy(config(), new PatternPredictor(window), limitBet));
        Deque<Integer> deque = european();
        int loss = 0;
        int won = 0;
        long sum = 0;
        while (!deque.isEmpty()) {
            Integer item = deque.poll();
            Snapshot snapshot = runner.victory(Spot.getByNumber(item));
            if (!runner.isLive()) {
                System.out.println(snapshot.netProfit() / 100);
                sum = sum + snapshot.netProfit();
                var split = split(deque, 120);
                runner = Runner.of(new FrequencyPatternStrategy(config(split), window, limitBet));
                if (snapshot.netProfit() > 0) {
                    won++;
                } else {
                    loss++;
                }
            }
        }
        System.out.println("start: " + balance / 100 + " result: " + sum / 100);
        System.out.println("win: " + won + " loss: " + loss);
    }

    static Config config() {
        return config(new LinkedList<>());
    }

    static Config config(Deque<Integer> deque) {
        return ConfigBuilder.builder()
                .european()
                .name("Test")
                .realBalance(balance * 10)
                .startBalance(balance)
                .minBet(minBet)
                .maxBet(maxBet)
                .tableLimit(maxBet)
                .stopLossPercentageStop(stopLossPercentageStop)
                .takeProfitPercentageStop(takeProfitPercentageStop)
                .dangerZoneThresholdRisk(0)
                .profitZoneThresholdRisk(0)
                .normalZoneBetCapRisk(100)
                .penaltyBoxDurationRisk(0)
                .floatingMinBetPercentLimit(floatingMinBetPercentLimit)
                .initialHistory(deque)
                .build();

    }

    static Deque<Integer> split(Deque<Integer> deque, long count) {
        Deque<Integer> split = new LinkedList<>();
        for (int i = 0; i < count && !deque.isEmpty(); i++) {
            split.add(deque.poll());
        }
        return split;
    }

    private static Deque<Integer> european() {
        Deque<Integer> deque = new LinkedList<>(DEQUE);
        Deque<Integer> result = new LinkedList<>();
        while (!deque.isEmpty()) {
            Integer spot = deque.poll();
            result.add(spot == -1 ? 0 : spot);
        }
        return result;
    }
}
