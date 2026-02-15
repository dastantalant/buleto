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
public class TestRngSmartCoverage_V2 {

    private static final long START_BALANCE = 1000;

    // Риск 0.3% (чуть выше консервативного, чтобы был разгон)
    private static final double RISK_PER_ROUND = 0.003;

    // --- НАСТРОЙКИ ЗАЩИТЫ ---
    // Если баланс упал на 25% от Максимума (Пика) -> СБРОС ставок на минимум
    private static final double PANIC_DROP_PERCENT = 0.25;

    public static void main(String[] args) {
        long currentBalance = START_BALANCE;
        long maxPeak = START_BALANCE; // Самый высокий баланс за всю историю
        long vault = 0; // "Сейф" - деньги, выведенные из риска

        // Стартовая минимальная ставка
        long baseMinBet = Math.max(1, (long)(START_BALANCE * RISK_PER_ROUND));

        Runner runner = createRunner(currentBalance, baseMinBet);
        Deque<Integer> deque = european();

        int wins = 0;
        int losses = 0;

        System.out.println("Start Balance: " + START_BALANCE);

        while (!deque.isEmpty()) {
            Integer item = deque.poll();
            Snapshot snapshot = runner.victory(Spot.getByNumber(item));

            if (!runner.isLive()) {
                long profit = snapshot.netProfit();
                currentBalance += profit;

                if (profit > 0) wins++; else losses++;

                // 1. Обновляем Пик
                if (currentBalance > maxPeak) {
                    maxPeak = currentBalance;
                    // ЛОГИКА СЕЙФА: Каждое удвоение депозита фиксируем в "Сейф"
                    // Если баланс вырос на +2000 от прошлого сейфа -> сохраняем 1000
                    if (currentBalance - vault > START_BALANCE * 2) {
                        vault += START_BALANCE;
                        System.out.println(">>> VAULT LOCKED! Total Safe: " + vault);
                    }
                }

                // 2. УПРАВЛЕНИЕ СТАВКОЙ (Smart Risk)
                long nextMinBet;

                // Проверка на "Панику": Если мы упали на 25% от Пика
                if (currentBalance < maxPeak * (1.0 - PANIC_DROP_PERCENT)) {
                    // АВАРИЙНЫЙ РЕЖИМ: Возвращаемся к самой первой ставке
                    // Мы сохраняем остатки прибыли, но перестаем рисковать по-крупному
                    nextMinBet = (long)(START_BALANCE * RISK_PER_ROUND);
                    // Сбрасываем пик, чтобы выйти из режима паники только когда снова вырастем
                    maxPeak = currentBalance;
                } else {
                    // НОРМАЛЬНЫЙ РЕЖИМ: Ставка растет вместе с балансом
                    nextMinBet = (long)(currentBalance * RISK_PER_ROUND);
                }

                // Защита от нуля
                nextMinBet = Math.max(1, nextMinBet);

                // 3. ПРОВЕРКА НА БАНКРОТСТВО
                if (currentBalance < 100) {
                    System.out.println("GAME OVER (Low Balance)");
                    break;
                }

                runner = createRunner(currentBalance, nextMinBet);
            }
        }

        System.out.println("=================================");
        System.out.println("Final Balance: " + currentBalance);
        System.out.println("Max Peak: " + maxPeak);
        System.out.println("Secure Vault (Virtual): " + vault);
        System.out.println("Net Profit: " + (currentBalance - START_BALANCE));
        System.out.println("Wins: " + wins + " | Losses: " + losses);
    }

    static Runner createRunner(long currentBalance, long minBet) {
        Config config = ConfigBuilder.builder()
                .european()
                .name("RNG V10 Secure")
                .realBalance(currentBalance * 10)
                .startBalance(currentBalance)
                .minBet(minBet)
                .maxBet(currentBalance)
                .tableLimit(currentBalance * 20)
                // Те же настройки сессии
                .stopLossPercentageStop(20)   // -20% за сессию
                .takeProfitPercentageStop(5)  // +5% за сессию
                .riskDisabled()
                .floatingMinBetPercentLimit(0)
                .build();

        return Runner.of(new RngSmartCoverageStrategy(config));
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