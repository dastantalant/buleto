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
public class TestRngSmartCoverage {
    // Начальный депозит
    private static final long INITIAL_BALANCE = 2000;

    // Риск на сделку (0.2% как у вас, это 4 фишки при старте)
    private static final double RISK_PERCENT = 0.003;
    private static final double PANIC_DROP_PERCENT = 0.25;
    private static long balance = 2000;

    // Базовая ставка на 1 число = 200 (0.2%).
    // При покрытии 7 чисел общая ставка будет 1400 (1.4%).
    // Это выдержит ~70 промахов подряд.
    private static final long baseBetPerSpot = 4;

    // Настройки сессии
    private static final int takeProfitPercent = 5;  // +5% (5000) - Быстрый выход
    private static final int stopLossPercent = 20;   // -20% (20000) - Запас прочности

    public static void main(String[] args) {
        long currentBalance = INITIAL_BALANCE;

        Runner runner = createRunner(currentBalance);
        Deque<Integer> deque = european();

        int loss = 0;
        int won = 0;

        // Для статистики
        long maxBalance = currentBalance;
        long minBalance = currentBalance;

        while (!deque.isEmpty()) {
            Integer item = deque.poll();
            Snapshot snapshot = runner.victory(Spot.getByNumber(item));

            if (!runner.isLive()) {
                long sessionProfit = snapshot.netProfit();

                // ВАЖНО: Обновляем реальный баланс
                currentBalance += sessionProfit;

                // Статистика
                if (currentBalance > maxBalance) maxBalance = currentBalance;
                if (currentBalance < minBalance) minBalance = currentBalance;

                if (sessionProfit > 0) won++; else loss++;

                // Если банкрот - стоп
                if (currentBalance < INITIAL_BALANCE * 0.1) {
                    System.out.println("BANKRUPTCY");
                    break;
                }

                // ВАЖНО: Создаем нового раннера С НОВЫМ БАЛАНСОМ
                // Ставка MinBet пересчитается автоматически от currentBalance
                runner = createRunner(currentBalance);
            }
        }

        System.out.println("=================================");
        System.out.println("Start Balance: " + INITIAL_BALANCE);
        System.out.println("FINAL BALANCE: " + currentBalance);
        System.out.println("Total Net Profit: " + (currentBalance - INITIAL_BALANCE));
        System.out.println("Max Peak: " + maxBalance);
        System.out.println("Wins: " + won + " | Losses: " + loss);
    }

    static Runner createRunner(long currentBalance) {
        long dynamicMinBet = Math.max(1, (long)(currentBalance * RISK_PERCENT)); // 0.2%

        Config config = ConfigBuilder.builder()
                .european()
                .name("RNG Compounding")
//                .realBalance(currentBalance * 10) // Просто запас для эмулятора
                .startBalance(currentBalance)     // ! Важно
                .minBet(dynamicMinBet)            // ! Важно: ставка растет с банком
                .maxBet(15_000_00)
                .tableLimit(15_000_00)
                .stopLossPercentageStop(20)       // Те же 20%
                .takeProfitPercentageStop(5)      // Те же 5%
                .riskDisabled()
                .floatingMinBetPercentLimit(0)
                .build();

        return Runner.of(new RngSmartCoverageStrategy(config));
    }
//    static Config config() {
//        return config(balance);
//    }
//    static Config config(long balance) {
//        return ConfigBuilder.builder()
//                .european()
//                .name("RNG V10")
//                .startBalance(balance)
//                .minBet(baseBetPerSpot) // Это база для расчета внутри стратегии
//                .maxBet(15_000_00)
//                .tableLimit(15_000_00)
//                .stopLossPercentageStop(stopLossPercent)
//                .takeProfitPercentageStop(takeProfitPercent)
//                .riskDisabled()
//                .floatingMinBetPercentLimit(0)
//                .build();
//    }

    private static Deque<Integer> european() {
        Deque<Integer> deque = new LinkedList<>(DEQUE); // Ваш источник
        Deque<Integer> result = new LinkedList<>();
        while (!deque.isEmpty()) {
            Integer spot = deque.poll();
            result.add(spot == -1 ? 0 : spot);
        }
        return result;
    }
}