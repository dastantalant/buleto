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
public class TestRngRealMoney_V3 {

    private static final long START_DEPOSIT = 1000;

    // Цель: Как только на столе стало 3000 (+50%), снимаем 1000
    private static final long TARGET_TO_CASHOUT = 2000;

    public static void main(String[] args) {
        // РЕАЛЬНЫЙ СЕЙФ (Деньги в кармане)
        long pocketMoney = 0;

        // Деньги на столе (в риске)
        long tableBalance = START_DEPOSIT;

        Deque<Integer> deque = european();
        // Создаем стратегию с базовой ставкой от 2000
        Runner runner = createRunner(tableBalance);

        int rebuys = 0; // Сколько раз мы спасали игру деньгами из кармана

        System.out.println("STARTED with " + tableBalance);

        while (!deque.isEmpty()) {
            Integer item = deque.poll();

            // --- ЛОГИКА СПАСЕНИЯ (REBUY) ---
            // Если на столе кончились деньги (< 10)
            if (tableBalance < 10) {
                // Если в кармане есть деньги - берем оттуда
                if (pocketMoney >= START_DEPOSIT) {
                    pocketMoney -= START_DEPOSIT;
                    tableBalance = START_DEPOSIT;
                    rebuys++;
                    System.out.println(">>> REBUY! Saved by Vault. Pocket left: " + pocketMoney);
                    // Сбрасываем стратегию на начальные настройки
                    runner = createRunner(tableBalance);
                } else {
                    System.out.println("--- GAME OVER (Bankruptcy) ---");
                    break;
                }
            }

            // Играем раунд
            Snapshot snapshot = runner.victory(Spot.getByNumber(item));

            if (!runner.isLive()) {
                long profit = snapshot.netProfit();
                tableBalance += profit;

                // --- ЛОГИКА ВЫВОДА (CASH OUT) ---
                // Если на столе денег больше чем нужно (например, > 3000)
                if (tableBalance >= TARGET_TO_CASHOUT) {
                    // Оставляем на столе ровно 2000, остальное - в карман
                    long profitToTake = tableBalance - START_DEPOSIT;
                    pocketMoney += profitToTake;
                    tableBalance = START_DEPOSIT; // СБРОС БАЛАНСА СТОЛА

                    System.out.println("$$$ CASH OUT: +" + profitToTake + " | Total Pocket: " + pocketMoney);

                    // Перезапускаем стратегию (чтобы сбросить прогрессию ставок)
                    runner = createRunner(tableBalance);
                }
                else {
                    // Просто продолжаем играть с тем, что есть
                    runner = createRunner(tableBalance);
                }
            }
        }

        System.out.println("=================================");
        System.out.println("Table Balance (Leftover): " + tableBalance);
        System.out.println("REAL POCKET MONEY: " + pocketMoney);
        System.out.println("Rebuys used: " + rebuys);
        System.out.println("TOTAL NET PROFIT: " + (pocketMoney + tableBalance - START_DEPOSIT));
    }

    static Runner createRunner(long currentTableBalance) {
        // Ставка всегда 0.2% от текущих денег НА СТОЛЕ (а не от сейфа)
        long minBet = Math.max(1, (long)(currentTableBalance * 0.002));

        Config config = ConfigBuilder.builder()
                .european()
                .name("RNG V3 RealMoney")
                .realBalance(currentTableBalance * 10)
                .startBalance(currentTableBalance)
                .minBet(minBet)
                .maxBet(15_000_00)
                .tableLimit(15_000_00)
                .stopLossPercentageStop(20)
                .takeProfitPercentageStop(10) // Маленькие шаги +10%
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