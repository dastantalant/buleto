package com.traderoom.analyzer.test.v15;


import com.traderoom.api.*;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.Snapshot;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.runner.Runner;
import com.traderoom.common.service.RoundDAO;

import java.util.Deque;
import java.util.LinkedList;

public class RunnerTest {

    // "Я могу достать любые деньги" -> 100 000.00 (10 миллионов копеек)
    private static long realTotalBalance = 100_000_00;

    // Огромный банк на сессию, чтобы Д'Аламбер мог работать свободно
    // Мы не боимся просадки, мы боимся лимита стола.
    private static final long SESSION_START = 1_000_00;

    // Шаг 1.00
    private static final long MIN_BET = 1_00;

    // Лимит 15 000.00 (15 тысяч шагов)
    private static final long MAX_BET = 15_000_00;

    public static void main(String[] args) {
        Deque<Integer> data = european();
        Deque<Integer> history = split(data, 10); // История не особо важна для тренда

        Runner runner = createRunner(history);

        long totalProfit = 0;
        int wins = 0;
        int losses = 0;
        long maxDrawdown = 0;

        while (!data.isEmpty()) {
            Integer num = data.poll();
            Spot spot = Spot.getByNumber(num);

            history.add(num);
            if (history.size() > 10) history.poll();

            Snapshot s = runner.victory(spot);

            // Отслеживаем просадку внутри сессии для интереса
            long currentDD = SESSION_START - s.virtualBalance();
            if (currentDD > maxDrawdown) maxDrawdown = currentDD;

            if (!runner.isLive()) {
                long profit = s.netProfit();
                totalProfit += profit;
                realTotalBalance += profit;

                if (profit > 0) wins++; else losses++;

                // Лог реже, так как сессии будут длинными
                if (wins % 10 == 0 || profit < 0) {
                    IO.println(String.format("Bank: %10.2f | Last Profit: %6.2f | W/L: %d/%d | MaxDD: %d",
                            (double)realTotalBalance/100, (double)profit/100, wins, losses, maxDrawdown/100));
                }

                // Сбрасываем MaxDD для новой сессии
                maxDrawdown = 0;
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
                .name("HeavyTank")
                .startBalance(SESSION_START) // 5000.00
                .minBet(MIN_BET)             // 1.00
                .maxBet(MAX_BET)             // 15000.00
                .tableLimit(MAX_BET * 100)   // Игнорируем общий лимит
                // === КОНФИГ ТАНКА ===
                // StopLoss не нужен, у нас "любые деньги".
                // Ставим формальный 90%, чтобы не упало с ошибкой
                .stopLossPercentageStop(90)
                // TakeProfit ставим умеренный. Д'Аламбер накапливает прибыль волнами.
                // 200.00 прибыли за сессию достаточно, чтобы перезагрузиться.
                // Это 200 шагов чистого выигрыша.
                .takeProfitPercentageStop(10) // 4% от 5000 = 200.00
                .initialHistory(initialHistory)
                .riskDisabled()
                .build();

        return Runner.of(new HeavyTankStrategy(config));
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