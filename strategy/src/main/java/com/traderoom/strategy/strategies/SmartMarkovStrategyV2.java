package com.traderoom.strategy.strategies;

import com.traderoom.api.AbstractStrategy;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.utils.BetHelper;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * V2 версия SmartMarkovStrategy.
 * <p>
 * Улучшения:
 * 1. <strong>Затухающая память (Decay):</strong> Старые переходы теряют вес. Это позволяет стратегии адаптироваться к изменению поведения ГСЧ/Дилера.
 * 2. <strong>Фильтр шума:</strong> Ставит только если вероятность перехода значительно выше случайной (1/37).
 * 3. <strong>Топ-1 вместо Топ-3:</strong> Концентрация бюджета на самом вероятном исходе для максимизации ROI.
 */
@Strategy(tags = {Tag.PREDICTIVE})
public class SmartMarkovStrategyV2 extends AbstractStrategy {

    // Матрица весов: Откуда -> {Куда -> Вес}
    private final Map<Spot, Map<Spot, Double>> transitionWeights = new ConcurrentHashMap<>();
    private final double decayFactor = 0.995; // Каждое обновление уменьшает старые веса на 0.5%
    private final double minProbabilityThreshold = 0.05; // Порог входа (выше 1/20)

    public SmartMarkovStrategyV2(Config config) {
        super(config);
        List<Spot> history = getMarket().getHistory();
        if (history.size() >= 2) {
            for (int i = 1; i < history.size(); i++) {
                Spot prev = history.get(i - 1);
                Spot curr = history.get(i);
                updateModel(prev, curr);
            }
        }
    }

    @Override
    public List<Bet> decide() {
        Spot lastSpot = getMarket().getLastSpot();
        if (lastSpot == null) return List.of();

        Map<Spot, Double> candidates = transitionWeights.get(lastSpot);
        if (candidates == null || candidates.isEmpty()) return List.of();

        // Нормализация весов для текущего узла
        double totalWeight = candidates.values().stream().mapToDouble(d -> d).sum();

        // Ищем лучший переход
        return candidates.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .filter(e -> (e.getValue() / totalWeight) >= minProbabilityThreshold)
                .map(e -> {
                    // Kelly-lite сайзинг
                    double prob = e.getValue() / totalWeight;
                    long bank = getVirtualBalance();
                    long bet = (long) (bank * 0.01 * (prob * 10));
                    bet = Math.clamp(bet, getMinBet(), getMaxBet());

                    return Bet.list(BetHelper.getStraightUp(e.getKey()), bet);
                })
                .orElse(List.of());
    }

    @Override
    protected void onRoundCustom(Spot currentSpot, List<Bet> bets) {
        List<Spot> history = getMarket().getHistory();
        if (history.size() < 2) return;
        Spot previousSpot = history.get(history.size() - 2); // Предпоследний элемент, так как текущий уже добавлен

        updateModel(previousSpot, currentSpot);
    }

    private void updateModel(Spot prev, Spot curr) {
        transitionWeights.computeIfAbsent(prev, k -> new ConcurrentHashMap<>())
                .merge(curr, 1.0, (oldVal, newVal) -> (oldVal * decayFactor) + newVal);
    }
}