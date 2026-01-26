package com.traderoom.strategy.base.strategies.v2;

import com.traderoom.strategy.utils.BetHelper;
import com.traderoom.strategy.base.AbstractStrategy;
import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.predictor.EfficientCountPredictor;
import com.traderoom.strategy.predictor.Predictor;

import java.util.Comparator;
import java.util.List;

/**
 * V2 версия стратегии StraightUpStrategy2.
 * Улучшения для игры 24/7:
 * 1. Динамический порог вероятности (снижается, если долго нет ставок).
 * 2. Защита от полной остановки (минимальная ставка всегда разрешена, если есть сигнал).
 * 3. Kelly Criterion (упрощенный) для управления капиталом, чтобы не слить всё.
 */
@AStrategy
public class StraightUpStrategy2_v2 extends AbstractStrategy {

    private final Predictor predictor;
    private double currentThreshold;
    private final double baseThreshold = 0.03;
    private final double minThreshold = 0.02; // Не опускаемся ниже 1/37 (~0.027) слишком сильно
    private int roundsWithoutBet = 0;

    public StraightUpStrategy2_v2(Config config) {
        super(config);
        this.predictor = new EfficientCountPredictor(); // Или любой другой сильный предиктор
        this.currentThreshold = baseThreshold;
    }

    @Override
    public List<Bet> decide(State state) {
        // 1. Получаем прогнозы
        List<SpotPrediction> predictions = predictor.getNextSpot(state, getConfig());

        // 2. Ищем кандидатов
        List<SpotPrediction> candidates = predictions.stream()
                .filter(p -> p.probability() >= currentThreshold)
                .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
                .limit(3) // Максимум 3 числа
                .toList();

        if (candidates.isEmpty()) {
            roundsWithoutBet++;
            // Если долго не ставим, понемногу снижаем планку, чтобы войти в игру
            if (roundsWithoutBet > 10 && currentThreshold > minThreshold) {
                currentThreshold *= 0.98;
            }
            return List.of();
        }

        // Сброс счетчика простоя
        roundsWithoutBet = 0;
        currentThreshold = baseThreshold; // Возвращаем порог на место

        // 3. Расчет ставки (Kelly-like)
        long balance = getBalance();
        // Используем 1% от банка как базу, масштабируем от уверенности
        long baseStake = Math.max(getConfig().minBet(), balance / 100);

        return candidates.stream()
                .map(p -> {
                    // Чем выше вероятность над порогом, тем выше ставка (до x2 от базы)
                    double confidenceMultiplier = 1.0 + (p.probability() - baseThreshold) * 10;
                    long value = (long) (baseStake * confidenceMultiplier);
                    value = Math.clamp(value, getConfig().minBet(), getConfig().maxBet());
                    return Bet.of(BetHelper.getStraightUp(p.spot()), value);
                })
                .toList();
    }
}