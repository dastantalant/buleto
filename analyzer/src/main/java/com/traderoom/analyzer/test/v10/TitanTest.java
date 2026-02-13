package com.traderoom.analyzer.test.v10;


import com.traderoom.api.*;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.Snapshot;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.runner.Runner;
import com.traderoom.common.service.RoundDAO;

import java.util.Deque;
import java.util.LinkedList;

public class TitanTest {
        // Настройки симуляции
        private static final int window = 30; // Окно анализа
        private static long realTotalBalance = 1000_00; // Наш общий банк (1000.00)
        private static final long SESSION_START_BALANCE = 100_00; // Банк на одну сессию (100.00)

        // Лимиты стола
        private static final long MIN_BET = 10; // 0.10
        private static final long MAX_BET = 15000_00;

         static void main() {
            // Загружаем данные
            Deque<Integer> futureData = european();
            System.out.println("Loaded rounds: " + futureData.size());

            // Начальная история для разогрева первого раннера
            Deque<Integer> warmUpHistory = split(futureData, window);

            Runner runner = createRunner(warmUpHistory);

            long totalProfit = 0;
            int sessionsWon = 0;
            int sessionsLost = 0;

            while (!futureData.isEmpty()) {
                Integer nextNumber = futureData.poll();
                Spot spot = Spot.getByNumber(nextNumber);

                // Совершаем ход
                Snapshot snapshot = runner.victory(spot);

                // Если сессия завершилась (TakeProfit или StopLoss сработал)
                if (!runner.isLive()) {
                    long sessionProfit = snapshot.netProfit();
                    totalProfit += sessionProfit;
                    realTotalBalance += sessionProfit;

                    if (sessionProfit > 0) sessionsWon++;
                    else sessionsLost++;

                    // Логирование каждые 10 сессий или при крупном изменении
                    IO.println(String.format("Session End. Profit: %6d | Bank: %8d | W/L: %d/%d",
                            sessionProfit, realTotalBalance, sessionsWon, sessionsLost));

                    // === КРИТИЧЕСКИЙ МОМЕНТ ===
                    // Мы берем последние N чисел из ТОЛЬКО ЧТО сыгранных,
                    // чтобы следующий бот начал уже с актуальной статистикой.
                    // В реальной жизни мы просто ждем N спинов перед стартом.
                    warmUpHistory = new LinkedList<>(runner.getState().getMarket().getHistory().stream()
                            .map(Spot::getNumber)
                            .toList());
                    // Орезаем историю до размера окна, чтобы не тащить лишнее
                    while(warmUpHistory.size() > window) warmUpHistory.pollFirst();

                    // Создаем нового бота для новой сессии
                    runner = createRunner(warmUpHistory);
                }
            }

            IO.println("=========================================");
            IO.println("FINAL RESULT");
            IO.println("Total Profit: " + totalProfit);
            IO.println("Final Balance: " + realTotalBalance);
            IO.println("Sessions Won: " + sessionsWon);
            IO.println("Sessions Lost: " + sessionsLost);
        }

        private static Runner createRunner(Deque<Integer> history) {
            Config config = ConfigBuilder.builder()
                    .european()
                    .name("TitanRunner")
                    .startBalance(SESSION_START_BALANCE)
                    .minBet(MIN_BET)
                    .maxBet(MAX_BET)
                    .tableLimit(MAX_BET * 10)
                    // === НАСТРОЙКИ "ВСЕГДА В ПЛЮСЕ" ===
                    .stopLossPercentageStop(30)   // Если просели на 30%, стоп. Не сливаем всё.
                    .takeProfitPercentageStop(5)  // Как только заработали 5%, убегаем.
                    .initialHistory(history)      // Загружаем историю для немедленного старта
                    .riskDisabled()               // Отключаем встроенный риск-менеджер, управляем сами
                    .build();

            return Runner.of(new TitanStrategy(config, window));
        }

        // Вспомогательный метод для забора данных из стека
        static Deque<Integer> split(Deque<Integer> deque, int count) {
            var split = new LinkedList<Integer>();
            for (int i = 0; i < count && !deque.isEmpty(); i++) {
                split.add(deque.poll());
            }
            return split;
        }

        // Эмуляция загрузки данных (оставляем ваш код доступа к БД)
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