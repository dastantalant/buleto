package com.buleto.analyzer.success.v8.rng;

import com.trading.roulette.api.ConfigBuilder;
import com.trading.roulette.api.enums.Spot;
import com.trading.roulette.api.model.Snapshot;
import com.trading.roulette.api.model.config.Config;
import com.trading.roulette.api.runner.Runner;

import java.util.Deque;
import java.util.LinkedList;

import static com.buleto.analyzer.BuletoConstants.DEQUE;

public class TestRngParoli {

    // --- НАСТРОЙКИ ---
    private static final long balance = 1000_00;

    // Ставка: 0.5% (500 фишек).
    // На 3 числа = 1500 за спин.
    // При балансе 100к это безопасно.
    private static final long minBet = (long) (balance * 0.005);
    private static final int wait = 50;
    private static final int attack = 10;
    private static final int targets = 7;

    // Риск Менеджмент
    private static final int stopLossPercent = 5;   // Строгий стоп 10%
    private static final int takeProfitPercent = 20; // Цель 40% (Амбициозно, но с Paroli реально)

    static void main() {
        // Запускаем V9 с параметрами (Wait 50, Attack 12, Targets 3)
        Runner runner = Runner.of(new RngParoliSniperStrategy(config(), wait, attack, targets));
        Deque<Integer> deque = european();

        int loss = 0;
        int won = 0;
        long totalSum = 0;

        while (!deque.isEmpty()) {
            Integer item = deque.poll();
            Snapshot snapshot = runner.victory(Spot.getByNumber(item));

            if (!runner.isLive()) {
                long profit = snapshot.netProfit();
                totalSum += profit;

//                String result = profit > 0 ? "WIN" : "LOSS";
//                System.out.printf("[%s] Profit: %d | Total: %d%n", result, profit, totalSum);

                if (profit > 0) won++;
                else loss++;

                // Перезапуск
                runner = Runner.of(new RngParoliSniperStrategy(config(), wait, attack, targets));
            }
        }

//        System.out.println("=================================");
//        System.out.println("FINAL RESULT:");
        System.out.println("Start Balance: " + balance/100);
        System.out.println("Min Bet: " + minBet/100);
        System.out.println("Wins: " + won + " | Losses: " + loss);
        System.out.println("NET PROFIT: " + totalSum/100);
    }

    static Config config() {
        return ConfigBuilder.builder()
                .european()
                .name("RNG Paroli V9")
                .realBalance(balance)
                .startBalance(balance)
                .minBet(minBet)
                .maxBet(15_000_00)
                .tableLimit(15_000_00)
                .stopLossPercentageStop(stopLossPercent)
                .takeProfitPercentageStop(takeProfitPercent)
                .riskDisabled()
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