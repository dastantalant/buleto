package com.buleto.analyzer.success.v8.rng;



import com.trading.roulette.api.AbstractStrategy;
import com.trading.roulette.api.annotation.Strategy;
import com.trading.roulette.api.enums.Spot;
import com.trading.roulette.api.model.Bet;
import com.trading.roulette.api.model.config.Config;
import com.trading.roulette.api.utils.BetHelper;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

    @Strategy
    public class RngParoliSniperStrategy extends AbstractStrategy {

        // История для анализа (храним последние 100 спинов)
        private final List<Spot> localHistory = new ArrayList<>(100);

        // Настройки фаз
        private final int waitRounds;    // Сколько ждать (50)
        private final int attackRounds;  // Длительность атаки (12)
        private final int targetsCount;  // На сколько чисел ставим (3)

        // Состояние сессии
        private int sessionRound = 0;
        private List<Spot> targetSpots = new ArrayList<>();

        // --- PAROLI LOGIC ---
        private long currentBaseBet;     // Базовая ставка
        private int consecutiveWins = 0; // Серия побед подряд

        public RngParoliSniperStrategy(Config config) {
            this(config, 50, 12, 3);
        }

        public RngParoliSniperStrategy(Config config, int wait, int attack, int targets) {
            super(config);
            waitRounds = wait;
            attackRounds = attack;
            targetsCount = targets;
            currentBaseBet = config.minBet();
        }

        @Override
        protected void onRoundCustom(Spot spot, List<Bet> bets) {
            if (spot != null) {
                localHistory.add(spot);
                if (localHistory.size() > waitRounds + attackRounds) {
                    localHistory.removeFirst();
                }
            }
        }

        @Override
        public List<Bet> decide() {
            sessionRound++;

            // 1. ФАЗА ОЖИДАНИЯ
            if (sessionRound <= waitRounds) {
                return List.of();
            }

            // 2. АНАЛИЗ (Точка входа)
            if (sessionRound == waitRounds + 1) {
                analyzeTargets();
                if (targetSpots.isEmpty()) {
                    resetCycle(); // Нет хороших целей -> ресет
                    return List.of();
                }
                // Сброс прогрессии перед атакой
                currentBaseBet = getMinBet();
                consecutiveWins = 0;
            }

            // 3. ФАЗА АТАКИ
            if (sessionRound <= waitRounds + attackRounds) {

                // ЛОГИКА PAROLI (Управление деньгами)
                if (isLastBetWon()) {
                    consecutiveWins++;
                    // Если выиграли: УДВАИВАЕМ ставку (играем на прибыль)
                    // Но не более 3 раз подряд (чтобы забрать куш)
                    if (consecutiveWins < 3) {
                        currentBaseBet *= 2;
                    } else {
                        // Выиграли 3 раза подряд? (Джекпот!)
                        // Сбрасываем цикл досрочно, мы заработали отлично.
                        resetCycle();
                        return List.of();
                    }
                } else if (isLastBet() && !isLastBetWon()) {
                    // Если проиграли после победы или просто проиграли:
                    // Возвращаемся к минимуму.
                    currentBaseBet = getMinBet();
                    consecutiveWins = 0;
                }

                // Защита от превышения баланса
                long safeBet = Math.min(currentBaseBet, getVirtualBalance() / (targetsCount + 1));
                safeBet = Math.min(safeBet, getMaxBet());

                long finalBet = safeBet;

                return targetSpots.stream()
                        .map(spot -> BetHelper.betting(spot, finalBet))
                        .toList();
            }

            // 4. КОНЕЦ ЦИКЛА
            resetCycle();
            return List.of();
        }

        private void analyzeTargets() {
            // Берем только последние N спинов (waitRounds)
            List<Spot> analysisWindow = localHistory.subList(Math.max(0, localHistory.size() - waitRounds), localHistory.size());

            Map<Spot, Long> counts = analysisWindow.stream()
                    .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

            targetSpots = counts.entrySet().stream()
                    .sorted(Map.Entry.<Spot, Long>comparingByValue().reversed())
                    .limit(targetsCount)
                    .map(Map.Entry::getKey)
                    .toList();

            // Фильтр: Число должно быть "Горячим" (выпасть чаще среднего)
            // Среднее за 50 спинов = 50/37 = 1.35.
            // Берем только если выпало >= 3 раз.
            long leaderCount = counts.getOrDefault(targetSpots.isEmpty() ? null : targetSpots.getFirst(), 0L);
            if (leaderCount < 3) {
                targetSpots = Collections.emptyList();
            }
        }

        private void resetCycle() {
            sessionRound = 0;
            consecutiveWins = 0;
            currentBaseBet = getMinBet();
            // Историю НЕ чистим полностью, она нужна для следующего скользящего анализа
            // Но targets сбрасываем
            targetSpots = Collections.emptyList();
        }
    }