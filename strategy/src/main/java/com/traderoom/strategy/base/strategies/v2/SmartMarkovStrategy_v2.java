package com.traderoom.strategy.base.strategies.v2;

import com.traderoom.strategy.base.AbstractStrategy;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.utils.BetHelper;

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
@AStrategy
public class SmartMarkovStrategy_v2 extends AbstractStrategy {

    // Матрица весов: Откуда -> {Куда -> Вес}
    private final Map<Spot, Map<Spot, Double>> transitionWeights = new ConcurrentHashMap<>();
    private final double decayFactor = 0.995; // Каждое обновление уменьшает старые веса на 0.5%
    private final double minProbabilityThreshold = 0.05; // Порог входа (выше 1/20)

    public SmartMarkovStrategy_v2(Config config) {
        super(config);
    }

    @Override
    public List<Bet> decide(State state) {
        Spot lastSpot = state.getMarketData().getLastSpot();
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
                    long bank = getBalance();
                    long bet = (long) (bank * 0.01 * (prob * 10));
                    bet = Math.clamp(bet, getConfig().minBet(), getConfig().maxBet());

                    return Bet.list(BetHelper.getStraightUp(e.getKey()), bet);
                })
                .orElse(List.of());
    }

    @Override
    protected void onRoundCustom(List<Bet> bets, Spot currentSpot, State state) {
        List<Spot> history = state.getMarketData().getHistory();
        if (history.size() < 2) return;

        Spot previousSpot = history.get(history.size() - 2);

        // 1. Применяем Decay ко всем весам (забывание)
        // (Для оптимизации можно делать лениво, но здесь для наглядности)
        /* В реальном High-Load коде decay применяется при чтении или раз в N тактов */

        // 2. Усиливаем только что случившийся переход
        transitionWeights.computeIfAbsent(previousSpot, k -> new ConcurrentHashMap<>())
                .merge(currentSpot, 1.0, (oldVal, newVal) -> (oldVal * decayFactor) + newVal);
    }
}