package com.traderoom.analyzer.test.v14;


import com.traderoom.api.*;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.Snapshot;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.runner.Runner;
import com.traderoom.common.service.RoundDAO;

import java.util.Deque;
import java.util.LinkedList;

public class RunnerTest {

    private static long realTotalBalance = 2000_00;
    private static final long SESSION_START = 200_00;
    private static final long MIN_BET = (long)(SESSION_START * 0.01);
    private static final long MAX_BET = 15_000_00;

     static void main() {
        Deque<Integer> data = european();

        // ВАЖНО: Загружаем минимум 200 спинов истории для старта
        // Иначе Long Window в предикторе будет пустым
        Deque<Integer> history = split(data, 200);

        Runner runner = createRunner(history);

        long totalProfit = 0;
        int wins = 0;
        int losses = 0;
        int roundsPlayed = 0;

        while (!data.isEmpty()) {
            Integer num = data.poll();
            Spot spot = Spot.getByNumber(num);

            // Поддерживаем историю актуальной и длинной (200 элементов)
            history.add(num);
            while (history.size() > 200) history.poll();

            Snapshot s = runner.victory(spot);
            roundsPlayed++;

            // Если раннер остановился (TakeProfit или банкрот)
            if (!runner.isLive()) {
                long profit = s.netProfit();
                totalProfit += profit;
                realTotalBalance += profit;

                if (profit > 0) wins++; else losses++;

                if (wins % 20 == 0 || profit < 0) {
                    IO.println(String.format("B: %6d | S: %6d | W/L: %d/%d | Rounds: %d",
                            (realTotalBalance/100), profit/100, wins, losses, roundsPlayed));
                }

                // ВАЖНО: Передаем ПОЛНУЮ историю (200) новому раннеру
                runner = createRunner(history);
            }
        }

        IO.println("================ DONE ================");
        IO.println("Final Balance: " + realTotalBalance/100);
        IO.println("Total Net Profit: " + totalProfit/100);
        IO.println("Wins: " + wins + " | Losses: " + losses);
    }

    static Runner createRunner(Deque<Integer> history) {
        // Создаем копию, чтобы не сломать основную очередь
        Deque<Integer> initialHistory = new LinkedList<>(history);

        Config config = ConfigBuilder.builder()
                .european()
                .name("ConsensusV1")
                .startBalance(SESSION_START) // 100_00
                .minBet(MIN_BET)             // 1_00
                .maxBet(MAX_BET)
                .tableLimit(MAX_BET)
                // === НАСТРОЙКИ ВЫЖИВАНИЯ ===
                .stopLossPercentageStop(80)   // Даем полный ход (20 спинов жизни)
                .takeProfitPercentageStop(200) // Цель +20.00. Один выигрыш дает +31.00. Хватает 1 попадания!
//                .maxRoundsStop(100L)
                .initialHistory(initialHistory) // Передаем 200 спинов
                .riskDisabled()
                .build();

        return Runner.of(new ConsensusStrategy(config));
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