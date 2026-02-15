package com.buleto.analyzer.test.v10;

import com.trading.roulette.api.ConfigBuilder;
import com.trading.roulette.api.IStrategy;
import com.trading.roulette.api.enums.Spot;
import com.trading.roulette.api.model.config.Config;
import com.trading.roulette.api.runner.Runner;
import com.buleto.core.service.RoundDAO;

import java.util.Deque;
import java.util.LinkedList;

@Deprecated
public class RunnerTest {
    private static final int window = 120;
    private static final int limit = 10;
    private static final int attack = 10;

    private static long currentBalance = 5000_00;
    private static final long startBalance = 100_00;
    private static final long minBet = (long) (startBalance * 0.015);
    private static final long maxBet = 15_000_00;
    private static final int stopLossPercentageStop = 80;
    private static final int takeProfitPercentageStop = 200;
    private static final int floatingMinBetPercentLimit = 0;

    static void main() {
        var runner = Runner.of(strategy(config(), window, attack, limit));
        var deque = european();
        var loss = 0;
        var won = 0;
        var sum = 0L;
        currentBalance = currentBalance - startBalance;
        while (!deque.isEmpty()) {
            var item = deque.poll();
            var snapshot = runner.victory(Spot.getByNumber(item));
            if (!runner.isLive()) {
                sum = sum + snapshot.netProfit();
                currentBalance = currentBalance + snapshot.netProfit();
                IO.println(String.format("%6d %d", (snapshot.netProfit() / 100), (currentBalance / 100)));
                var split = split(deque, window);
                runner = Runner.of(strategy(config(split), window, attack, limit));
                currentBalance = currentBalance - startBalance;
                if (snapshot.netProfit() > 0) {
                    won++;
                } else {
                    loss++;
                }
            }
        }
        IO.println("currentBalance: " + currentBalance / 100);
        IO.println("startBalance: " + startBalance / 100);
        IO.println("profit: " + (sum - startBalance) / 100);
        IO.println("win: " + won + " loss: " + loss);
    }

    static IStrategy strategy(Config config, int window, int attack, int limit) {
        return new BaseStrategy(config, new PatternPredictor(window), window, attack, limit);
    }

    static Config config() {
        return config(new LinkedList<>());
    }

    static Config config(Deque<Integer> deque) {
        return ConfigBuilder.builder()
                .european()
                .name("Test")
                .realBalance(startBalance)
                .startBalance(startBalance)
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
        var split = new LinkedList<Integer>();
        for (int i = 0; i < count && !deque.isEmpty(); i++) {
            split.add(deque.poll());
        }
        return split;
    }

    private static Deque<Integer> european() {
        try (var dao = new RoundDAO()) {
            var all = dao.findAll();
            var result = new LinkedList<Integer>();
            while (!all.isEmpty()) {
                int cell = all.poll().cell();
                result.add(cell == 37 || cell == -1 ? 0 : cell);
            }
            return result;
        }
    }
}
