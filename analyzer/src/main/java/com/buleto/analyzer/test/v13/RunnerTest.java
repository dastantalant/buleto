package com.buleto.analyzer.test.v13;


import com.trading.roulette.api.*;
import com.trading.roulette.api.enums.Spot;
import com.trading.roulette.api.model.Snapshot;
import com.trading.roulette.api.model.config.Config;
import com.trading.roulette.api.runner.Runner;
import com.buleto.core.service.RoundPostgresDAO;

import java.util.Deque;
import java.util.LinkedList;

public class RunnerTest {

    // Реальный баланс (общий кошелек)
    private static long realTotalBalance = 2000_00;

    // Банк на сессию (100.00)
    private static final long SESSION_START = 100_00;

    // Ставка 1.00
    private static final long MIN_BET = 1_00;

    private static final long MAX_BET = 15_000_00;

    public static void main(String[] args) {
        Deque<Integer> data = european();

        // История для разогрева (18 чисел)
        Deque<Integer> history = split(data, 18);

        Runner runner = createRunner(history);

        long totalProfit = 0;
        int wins = 0;
        int losses = 0;

        while (!data.isEmpty()) {
            Integer num = data.poll();
            Spot spot = Spot.getByNumber(num);

            // Обновляем историю для следующего раннера
            history.add(num);
            if (history.size() > 18) history.poll(); // Держим окно 18

            Snapshot s = runner.victory(spot);

            if (!runner.isLive()) {
                long profit = s.netProfit();
                totalProfit += profit;
                realTotalBalance += profit;

                if (profit > 0) wins++; else losses++;

                // Лог каждые 50 побед или при убытке
                if (wins % 50 == 0 || profit < 0) {
                    // Формат для удобного чтения
                    IO.println(String.format("Bank: %8.2f | Session: %6.2f | W/L: %d/%d",
                            (double)realTotalBalance/100, (double)profit/100, wins, losses));
                }

                // Перезапуск
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
                .name("CycleBreakerV10")
                .startBalance(SESSION_START) // 100_00
                .minBet(MIN_BET)             // 1_00
                .maxBet(MAX_BET)
                .tableLimit(MAX_BET * 10)
                // === НАСТРОЙКИ СНАЙПЕРА ===
                .stopLossPercentageStop(50)   // Стоп -50.00 (даем 16 попыток попасть в число)
                .takeProfitPercentageStop(10) // Стоп +10.00 (Один выигрыш дает +33.00, срабатывает мгновенно)
                .maxRoundsStop(100L)          // На всякий случай
                .initialHistory(initialHistory)
                .riskDisabled()
                .build();

        return Runner.of(new CycleBreakerStrategy(config));
    }

    static Deque<Integer> split(Deque<Integer> deque, int count) {
        var split = new LinkedList<Integer>();
        for (int i = 0; i < count && !deque.isEmpty(); i++) {
            split.add(deque.poll());
        }
        return split;
    }

    private static Deque<Integer> european() {
        try (var dao = new RoundPostgresDAO()) {
            var all = dao.findAllDeque();
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