package com.traderoom.analyzer.test.v12;


import com.traderoom.api.*;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.Snapshot;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.runner.Runner;
import com.traderoom.common.service.RoundDAO;

import java.util.Deque;
import java.util.LinkedList;

public class RunnerTest {

    // Реальный баланс (общий кошелек)
    private static long realTotalBalance = 2000_00;

    // Баланс, выделяемый на одну сессию (100.00)
    private static final long SESSION_START = 100_00;

    // Минимальная ставка 1.00 (1% от банка сессии)
    private static final long MIN_BET = 1_00;

    // Макс ставка стола (не важна для нас, так как мы не дойдем до 150.00)
    private static final long MAX_BET = 15_000_00;

    public static void main(String[] args) {
        Deque<Integer> data = european();

        // Разогрев (история для первого запуска)
        Deque<Integer> history = split(data, 10);

        Runner runner = createRunner(history);

        long totalProfit = 0;
        int wins = 0;
        int losses = 0;
        long maxDrawdownTotal = 0;

        while (!data.isEmpty()) {
            Integer num = data.poll();
            Spot spot = Spot.getByNumber(num);

            // Обновляем историю
            history.add(num);
            if (history.size() > 20) history.poll();

            Snapshot s = runner.victory(spot);

            if (!runner.isLive()) {
                long profit = s.netProfit();
                totalProfit += profit;
                realTotalBalance += profit;

                if (profit > 0) wins++; else losses++;

                // Печатаем результат каждые 100 сессий или при сильной просадке
                if (wins % 100 == 0 || realTotalBalance < 1000_00) {
                    IO.println(String.format("Bank: %8.2f | Session: %6.2f | W/L: %d/%d",
                            (double)realTotalBalance/100, (double)profit/100, wins, losses));
                }

                // Создаем нового бота
                runner = createRunner(history);
            }
        }

        IO.println("================ DONE ================");
        IO.println("Final Balance: " + (double)realTotalBalance/100);
        IO.println("Total Net Profit: " + (double)totalProfit/100);
        IO.println("Wins: " + wins + " | Losses: " + losses);
    }

    static Runner createRunner(Deque<Integer> history) {
        Deque<Integer> initialHistory = new LinkedList<>(history);

        Config config = ConfigBuilder.builder()
                .european()
                .name("TrendMaster")
                .startBalance(SESSION_START) // 100_00
                .minBet(MIN_BET)             // 1_00
                .maxBet(MAX_BET)             // 15_000_00
                .tableLimit(MAX_BET * 10)
                // === КЛЮЧЕВЫЕ НАСТРОЙКИ ===
                .stopLossPercentageStop(70)   // Разрешаем просадку до -70.00 (чтобы выдержать 6 шагов)
                .takeProfitPercentageStop(10) // Цель +10.00 (10% от сессии, 10 выигрышных ставок)
                .initialHistory(initialHistory)
                .riskDisabled()               // Отключаем встроенный риск-менеджер, рулим сами
                .build();

        return Runner.of(new TrendMasterStrategy(config));
    }

    static Deque<Integer> split(Deque<Integer> deque, int count) {
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
        } catch (Exception e) {
            return new LinkedList<>();
        }
    }
}