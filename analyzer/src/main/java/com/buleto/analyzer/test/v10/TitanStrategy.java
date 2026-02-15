package com.buleto.analyzer.test.v10;

import com.trading.roulette.api.*;
import com.trading.roulette.api.annotation.Strategy;
import com.trading.roulette.api.enums.Spot;
import com.trading.roulette.api.model.*;
import com.trading.roulette.api.model.config.Config;
import com.trading.roulette.api.utils.BetHelper;
import java.util.*;

@Strategy(name = "TitanV10")
public class TitanStrategy extends AbstractStrategy {
    private final TitanPredictor predictor;
    private final int analysisWindow;
    private int roundsSinceLastBet = 0;

    // Прогрессия: Уровни ставки (в юнитах).
    // Пологая прогрессия позволяет пережить просадки.
    private static final int[] PROGRESSION = {1, 1, 1, 2, 2, 3, 4, 5, 7, 9, 12, 16};
    private int progressionIndex = 0;
    private long currentUnit;

    public TitanStrategy(Config config) {
        this(config, 25); // Анализируем последние 25 спинов
    }

    public TitanStrategy(Config config, int window) {
        super(config);
        this.analysisWindow = window;
        this.predictor = new TitanPredictor(window);
        this.currentUnit = config.minBet();
    }

    @Override
    public List<Bet> decide() {
        // 1. Проверяем историю
        if (getMarket().getHistory().size() < analysisWindow) {
            return List.of();
        }

        // 2. Управление ставками (Progression Logic)
        if (isLastBet()) {
            if (isLastBetWon()) {
                // Победа: Сброс на начало или откат на 2 ступени (безопасный сброс)
                progressionIndex = Math.max(0, progressionIndex - 2);
                // Если мы в хорошем плюсе относительно старта, сбрасываем полностью
                if (getVirtualBalance() > getStartBalance()) {
                    progressionIndex = 0;
                }
            } else {
                // Поражение: Двигаемся по лестнице вверх
                progressionIndex++;
                if (progressionIndex >= PROGRESSION.length) {
                    progressionIndex = PROGRESSION.length - 1; // Cap at max
                }
            }
        }

        // 3. Получаем прогноз
        List<SpotPrediction> predictions = predictor.predictSpot(getState(), getConfig());
        if (predictions.isEmpty()) return List.of();

        Spot center = predictions.getFirst().spot();
        List<Spot> sector = predictor.getSector(center); // Получаем 9 чисел

        // 4. Формируем ставки
        long betValue = currentUnit * PROGRESSION[progressionIndex];

        // Safety check: не превышаем макс ставку
        if (betValue > getMaxBet()) betValue = getMaxBet();
        // Если баланс критический, уменьшаем ставку
        if (betValue * sector.size() > getVirtualBalance()) {
            betValue = Math.max(1, getVirtualBalance() / sector.size());
        }

        long finalBet = betValue;
        return sector.stream()
                .map(s -> BetHelper.betting(s, finalBet))
                .toList();
    }
}