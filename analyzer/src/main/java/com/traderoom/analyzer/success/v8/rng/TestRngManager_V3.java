package com.traderoom.analyzer.success.v8.rng;

import com.traderoom.api.ConfigBuilder;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.Snapshot;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.runner.Runner;

import java.util.Deque;
import java.util.LinkedList;

import static com.traderoom.analyzer.BuletoConstants.DEQUE;

@Deprecated
public class TestRngManager_V3 {

    // --- НАСТРОЙКИ ---
    private static final long START_DEPOSIT = 2000; // Рабочий стек
    private static final long TARGET_PROFIT = 1000; // Цель: заработать +1000 и вывести

    // Риск на ставку 0.25% от рабочего стека (5 фишек)
    private static final double BASE_RISK = 0.0025;

    public static void main(String[] args) {
        // ГЛОБАЛЬНЫЙ КОШЕЛЕК (Ваш реальный профит)
        long globalVault = 0;

        // Текущие деньги на столе
        long tableBalance = START_DEPOSIT;

        Deque<Integer> deque = european();
        Runner runner = createRunner(tableBalance);

        int sessionsWon = 0;
        int sessionsLost = 0;
        int rebuys = 0; // Сколько раз мы докупались из сейфа

        System.out.println("STARTED with " + tableBalance);

        while (!deque.isEmpty()) {
            Integer item = deque.poll();

            // Если баланс на столе кончился (меньше мин. ставки)
            if (tableBalance < 10) {
                // Попытка докупиться (Rebuy) из Сейфа
                if (globalVault >= START_DEPOSIT) {
                    globalVault -= START_DEPOSIT;
                    tableBalance = START_DEPOSIT;
                    rebuys++;
                    System.out.println(">>> REBUY! Taken from Vault. Vault left: " + globalVault);
                    runner = createRunner(tableBalance); // Сброс стратегии
                } else {
                    System.out.println("--- GAME OVER (No money left in Vault) ---");
                    break;
                }
            }

            Snapshot snapshot = runner.victory(Spot.getByNumber(item));

            if (!runner.isLive()) {
                long profit = snapshot.netProfit();
                tableBalance += profit;

                // ЛОГИКА CASH OUT (ВЫВОД СРЕДСТВ)
                // Если мы достигли цели (2000 + 1000 = 3000)
                if (tableBalance >= START_DEPOSIT + TARGET_PROFIT) {
                    long amountToWithdraw = tableBalance - START_DEPOSIT;
                    globalVault += amountToWithdraw;

                    System.out.printf("$$$ CASH OUT! Withdraw: %d | Vault Total: %d%n", amountToWithdraw, globalVault);

                    // СБРОС: Оставляем на столе только стартовые 2000
                    tableBalance = START_DEPOSIT;
                    sessionsWon++;

                    // Полный перезапуск раннера (сброс прогрессии ставок)
                    runner = createRunner(tableBalance);
                }
                // Если проиграли сессию (но еще не банкрот)
                else {
                    if (profit < 0) sessionsLost++;
                    // Просто пересоздаем раннер с текущим остатком
                    runner = createRunner(tableBalance);
                }
            }
        }

        System.out.println("=================================");
        System.out.println("SIMULATION ENDED");
        System.out.println("Table Balance: " + tableBalance);
        System.out.println("REAL VAULT (PROFIT): " + globalVault);
        System.out.println("Rebuys used: " + rebuys);
        System.out.println("Total Net Result: " + (globalVault + tableBalance - START_DEPOSIT));
    }

    static Runner createRunner(long currentBalance) {
        // Ставка всегда считается от текущего баланса на столе
        long minBet = Math.max(1, (long)(currentBalance * BASE_RISK));

        Config config = ConfigBuilder.builder()
                .european()
                .name("RNG V10 CashOut")
                .realBalance(currentBalance * 10)
                .startBalance(currentBalance)
                .minBet(minBet)
                .maxBet(15_000_00) // Макс ставка - весь стек
                .tableLimit(15_000_00)
                // Короткие сессии внутри стратегии
                .stopLossPercentageStop(15)  // -15% просадки -> перезапуск раннера
                .takeProfitPercentageStop(10) // +10% профита -> перезапуск раннера
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