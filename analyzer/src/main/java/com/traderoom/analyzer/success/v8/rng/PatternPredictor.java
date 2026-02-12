package com.traderoom.analyzer.success.v8.rng;

import com.traderoom.api.Predictor;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.SpotPrediction;
import com.traderoom.api.model.State;
import com.traderoom.api.model.config.Config;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.EnumMap;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PatternPredictor implements Predictor {
    private final int analysisWindowSize;

    public PatternPredictor(int analysisWindowSize) {
        this.analysisWindowSize = analysisWindowSize;
    }

    @Override
    public List<SpotPrediction> predictSpot(State state, Config config) {
        List<Spot> history = state.getMarket().getHistory();
        int size = history.size();
        if (size < 10) return List.of();

        int start = Math.max(0, size - analysisWindowSize);
        List<Spot> window = history.subList(start, size);

        EnumMap<Spot, Double> weights = new EnumMap<>(Spot.class);

        // 1. Анализ "Средней дистанции" (Average Distance between hits)
        calculatePeriodicity(window, weights);

        // 2. Анализ "Мгновенного повтора" (Instant Repeat)
        calculateRepeaterProbability(window, weights);

        double sum = weights.values().stream().mapToDouble(d -> d).sum();
        if (sum == 0) return List.of();

        return weights.entrySet().stream()
                .map(e -> SpotPrediction.of(e.getKey(), e.getValue() / sum))
                .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
                .toList();
    }

    private void calculatePeriodicity(List<Spot> history, Map<Spot, Double> weights) {
        // Карта: Число -> Список индексов, когда оно выпадало
        Map<Spot, List<Integer>> appearances = new HashMap<>();
        for (int i = 0; i < history.size(); i++) {
            appearances.computeIfAbsent(history.get(i), k -> new ArrayList<>()).add(i);
        }

        int lastIndex = history.size() - 1;

        for (var entry : appearances.entrySet()) {
            Spot spot = entry.getKey();
            List<Integer> indices = entry.getValue();

            if (indices.size() < 2) continue; // Недостаточно данных для периода

            // Считаем среднее расстояние между выпадениями
            double totalDist = 0;
            for (int i = 1; i < indices.size(); i++) {
                totalDist += (indices.get(i) - indices.get(i - 1));
            }
            double avgDist = totalDist / (indices.size() - 1);

            // Сколько спинов прошло с последнего раза?
            int distFromLast = lastIndex - indices.getLast();

            // RNC ПАТТЕРН: Если текущая пауза близка к средней паузе этого числа
            // Например: выпадает каждые 12 спинов, и сейчас прошло 11-13 спинов.
            if (Math.abs(distFromLast - avgDist) <= 2.0) {
                weights.merge(spot, 2.0, Double::sum); // Высокий вес
            }
        }
    }

    private void calculateRepeaterProbability(List<Spot> history, Map<Spot, Double> weights) {
        if (history.isEmpty()) return;
        Spot lastSpot = history.getLast();

        // В ГСЧ вероятность повтора того же числа (Double Hit) выше, чем в физике.
        // Ставим небольшой бонус на последнее выпавшее число.
        weights.merge(lastSpot, 1.5, Double::sum);
    }
}