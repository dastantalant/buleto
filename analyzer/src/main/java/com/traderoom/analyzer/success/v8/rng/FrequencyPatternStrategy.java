package com.traderoom.analyzer.success.v8.rng;

import com.traderoom.api.AbstractStrategy;
import com.traderoom.api.Predictor;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.SpotPrediction;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.utils.BetHelper;

import java.util.*;

    @Strategy
    public class FrequencyPatternStrategy extends AbstractStrategy {
        private final Predictor predictor;
        private final int limitBet;

        // --- Логика циклов ---
        private static final int WARMUP_ROUNDS = 120; // Ожидание
        private static final int ATTACK_ROUNDS = 10;  // Атака (короткая!)

        // Внутренний счетчик для цикла (сбрасывается после цикла)
        private int cycleRoundCounter = 0;

        // Сохраняем "цели" на фазу атаки, чтобы не менять их каждый спин
        private List<Bet> lockedBets = null;

        public FrequencyPatternStrategy(Config config, int windowSize, int limitBet) {
            super(config);
            this.limitBet = limitBet;
            // Объединяем RNG предикторы
            this.predictor = new FrequencyPatternPredictor(windowSize, limitBet);
        }

        // Конструктор для тестов
        public FrequencyPatternStrategy(Config config, Predictor predictor, int limitBet) {
            super(config);
            this.predictor = predictor;
            this.limitBet = limitBet;
        }

        @Override
        public List<Bet> decide() {
            cycleRoundCounter++;

            // 1. ФАЗА ОЖИДАНИЯ (1-120)
            // Мы копим историю в State (AbstractStrategy делает это сама), но не ставим.
            if (cycleRoundCounter <= WARMUP_ROUNDS) {
                return List.of();
            }

            // 2. МОМЕНТ АНАЛИЗА (121)
            // Как только прогрев закончился, один раз запрашиваем прогноз и фиксируем его
            if (cycleRoundCounter == WARMUP_ROUNDS + 1) {
                List<SpotPrediction> predictions = predictor.predictSpot(getState(), getConfig());

                if (predictions.isEmpty()) {
                    // Если сигналов нет, сразу сбрасываем цикл, не тратим деньги
                    resetCycle();
                    return List.of();
                }

                // Берем Топ N (limitBet)
                List<Spot> targets = predictions.stream()
                        .limit(limitBet)
                        .map(SpotPrediction::spot)
                        .toList();

                // Формируем ставки
                long amount = getMinBet();
                // Умная ставка: если мы в минусе (относительно старта игры), чуть увеличиваем
                if (getVirtualBalance() < getStartBalance()) {
                    amount = (long) (amount * 1.5); // Мягкое восстановление
                    amount = Math.min(amount, getMaxBet());
                }

                long finalAmount = amount;
                lockedBets = targets.stream()
                        .map(s -> BetHelper.betting(s, finalAmount))
                        .toList();
            }

            // 3. ФАЗА АТАКИ (121-130)
            if (cycleRoundCounter <= WARMUP_ROUNDS + ATTACK_ROUNDS) {
                // Если мы выиграли в прошлом раунде, можно завершить атаку досрочно (Take Profit)
                if (isLastBetWon()) {
                    resetCycle();
                    return List.of();
                }
                return lockedBets != null ? lockedBets : List.of();
            }

            // 4. СБРОС (131...)
            // Если атака не удалась за 10 спинов, уходим. Не догоняем.
            resetCycle();
            return List.of();
        }

        private void resetCycle() {
            cycleRoundCounter = 0;
            lockedBets = null;
            // Опционально: можно очищать историю в predictor'е, если нужно полное обнуление,
            // но здесь мы полагаемся на скользящее окно State.
        }
    }