package com.buleto.analyzer.success.v8.rng;

import com.trading.roulette.api.Predictor;
import com.trading.roulette.api.enums.Spot;
import com.trading.roulette.api.model.SpotPrediction;
import com.trading.roulette.api.model.State;
import com.trading.roulette.api.model.config.Config;

import java.util.Comparator;
import java.util.Deque;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

public class FrequencyPredictor2 implements Predictor {
    private final int windowSize;
    // Коэффициент затухания. Чем выше (0.99), тем дольше помнит историю.
    // 0.95 - быстрая реакция на тренды.
    private final double decayFactor = 0.98;

    public FrequencyPredictor2(int windowSize) {
        this.windowSize = windowSize;
    }

    @Override
    public List<SpotPrediction> predictSpot(State state, Config config) {
        Deque<Spot> history = state.getMarket().getHistory();
        if (history.isEmpty()) return List.of();

        int limit = Math.min(history.size(), windowSize);

        Map<Spot, Double> weights = new EnumMap<>(Spot.class);
        double currentWeight = 1.0;

        var it = history.descendingIterator();

        // пропускаем старые, если history > windowSize
        int skip = history.size() - limit;
        for (int i = 0; i < skip && it.hasNext(); i++) {
            it.next();
        }

        // теперь идём от самого старого (в окне) к новому
        while (it.hasNext()) {
            Spot spot = it.next();
            weights.merge(spot, currentWeight, Double::sum);
            currentWeight /= decayFactor;
        }

        double totalWeight = weights.values().stream().mapToDouble(Double::doubleValue).sum();
        if (totalWeight == 0) return List.of();

        return weights.entrySet().stream()
                .map(e -> SpotPrediction.of(e.getKey(), e.getValue() / totalWeight))
                .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
                .toList();
    }
}