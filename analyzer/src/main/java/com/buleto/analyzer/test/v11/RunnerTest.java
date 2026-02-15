package com.buleto.analyzer.test.v11;


import com.trading.roulette.api.*;
import com.trading.roulette.api.enums.Spot;
import com.trading.roulette.api.model.Snapshot;
import com.trading.roulette.api.model.config.Config;
import com.trading.roulette.api.runner.Runner;
import com.buleto.core.service.RoundDAO;

import java.util.Deque;
import java.util.LinkedList;

public class RunnerTest {
    // Настройки баланса
    private static long realTotalBalance = 2000_00; // Общий банк 1000.00
    private static final long SESSION_START = 100_00; // Банк на сессию 50.00

    // Ставки
    private static final long MIN_BET =(long) (SESSION_START * 0.01);
    private static final long MAX_BET = 15_000_00;

     static void main() {
        Deque<Integer> data = european(); // Загрузка из БД

        // Инициализируем историю для "разогрева" (берем первые 24 числа)
        Deque<Integer> history = split(data, 24);

        Runner runner = createRunner(history);

        long totalProfit = 0;
        int wins = 0;
        int losses = 0;

        while (!data.isEmpty()) {
            Integer num = data.poll();
            Spot spot = Spot.getByNumber(num);

            // Добавляем число в историю для следующего бота
            history.add(num);
            if (history.size() > 24) history.poll(); // Держим размер окна 24

            Snapshot s = runner.victory(spot);

            if (!runner.isLive()) {
                long profit = s.netProfit();
                totalProfit += profit;
                realTotalBalance += profit;

                if (profit > 0) wins++; else losses++;

                // Вывод каждые 50 сессий, чтобы не спамить, или если крупный убыток
                if (wins % 50 == 0 || profit < 0) {
                    IO.println(String.format("Profit: %6d | Bank: %8d | Wins: %d | Loss: %d",
                            profit/100, realTotalBalance/100, wins, losses));
                }

                // Перезапуск с актуальной историей
                runner = createRunner(history);
            }
        }

        IO.println("================ DONE ================");
        IO.println("Final Balance: " + realTotalBalance/100);
        IO.println("Total Net Profit: " + totalProfit/100);
        IO.println("Wins: " + wins + " | Losses: " + losses);
    }

    static Runner createRunner(Deque<Integer> history) {
        // Копия истории для конфига
        Deque<Integer> initialHistory = new LinkedList<>(history);

        Config config = ConfigBuilder.builder()
                .european()
                .name("SmartCollector")
                .startBalance(SESSION_START)
                .minBet(MIN_BET)
                .maxBet(MAX_BET)
                .tableLimit(MAX_BET)
                .stopLossPercentageStop(10)
                .takeProfitPercentageStop(15)
                .initialHistory(initialHistory)
                .riskDisabled()
                .build();

        return Runner.of(new SmartCollectorStrategy(config));
    }

    // --- Вспомогательные методы ---

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