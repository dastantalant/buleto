package com.traderoom.analyzer.success.v8.rng;

import com.traderoom.api.Predictor;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.SpotPrediction;
import com.traderoom.api.model.State;
import com.traderoom.api.model.config.Config;

import java.util.Comparator;
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
        List<Spot> history = state.getMarket().getHistory();
        if (history.isEmpty()) return List.of();

        // Берем последние N спинов
        int limit = Math.min(history.size(), windowSize);
        int start = history.size() - limit;

        Map<Spot, Double> weights = new EnumMap<>(Spot.class);

        // Проходим от самого старого к новому
        double currentWeight = 1.0;
        for (int i = start; i < history.size(); i++) {
            Spot spot = history.get(i);
            // Увеличиваем вес спота
            weights.merge(spot, currentWeight, Double::sum);
            // Увеличиваем множитель для следующих чисел (чем новее, тем весомее)
            currentWeight /= decayFactor;
        }

        double totalWeight = weights.values().stream().mapToDouble(d -> d).sum();

        return weights.entrySet().stream()
                .map(entry -> SpotPrediction.of(entry.getKey(), entry.getValue() / totalWeight))
                .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
                .toList();
    }
}