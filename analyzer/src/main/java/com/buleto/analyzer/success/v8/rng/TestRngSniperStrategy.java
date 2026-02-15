package com.buleto.analyzer.success.v8.rng;

import com.trading.roulette.api.ConfigBuilder;
import com.trading.roulette.api.enums.Spot;
import com.trading.roulette.api.model.Snapshot;
import com.trading.roulette.api.model.config.Config;
import com.trading.roulette.api.runner.Runner;

import java.util.Deque;
import java.util.LinkedList;

import static com.buleto.analyzer.BuletoConstants.DEQUE;

@Deprecated
public class TestRngSniperStrategy {
    private static final int wait = 120;
    private static final int attack = 10;
    private static final int limit = 3;

    private static final long balance = 1000_00;
    private static final long minBet = (long) (balance * 0.002);
    private static final long maxBet = 15_000_00;

    private static final int stopLossPercentageStop = 40;
    private static final int takeProfitPercentageStop = 40;
    private static final int floatingMinBetPercentLimit = 0;

    static void main() {
        Runner runner = Runner.of(new RngSniperStrategy(config(), wait, attack, limit));
        Deque<Integer> deque = european();
        int loss = 0;
        int won = 0;
        long sum = 0;
        while (!deque.isEmpty()) {
            Integer item = deque.poll();
            Snapshot snapshot = runner.victory(Spot.getByNumber(item));
            if (!runner.isLive()) {
                long profit = snapshot.netProfit();
                System.out.printf("Session End. Profit: %d | Bal: %d%n", profit/100, snapshot.virtualBalance()/100);
                sum += profit;
                runner = Runner.of(new RngSniperStrategy(config(), wait, attack, limit));
                if (profit > 0) {
                    won++;
                } else {
                    loss++;
                }
            }
        }
        System.out.println("---------------------------");
        System.out.println("Start Balance: " + balance/100);
        System.out.println("Min Bet: " + minBet/100);
        System.out.println("Net Profit: " + sum/100);
        System.out.println("Sessions Won: " + won + " | Sessions Lost: " + loss);
    }

    static Config config() {
        return ConfigBuilder.builder()
                .european()
                .name("RNG Sniper V8")
                .realBalance(balance * 10)
                .startBalance(balance)
                .minBet(minBet)
                .maxBet(maxBet)
                .tableLimit(maxBet)
                .stopLossPercentageStop(stopLossPercentageStop)
                .takeProfitPercentageStop(takeProfitPercentageStop)
                .riskDisabled()
                .floatingMinBetPercentLimit(floatingMinBetPercentLimit)
                .build();
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