package com.traderoom.analyzer.success.v8.rng;

import com.traderoom.api.Predictor;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.SpotPrediction;
import com.traderoom.api.model.State;
import com.traderoom.api.model.config.Config;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public class FrequencyPredictor implements Predictor {
    private final int windowSize; // Для ГСЧ идеально 37 или 50

    public FrequencyPredictor(int windowSize) {
        this.windowSize = windowSize;
    }

    @Override
    public List<SpotPrediction> predictSpot(State state, Config config) {
        List<Spot> history = state.getMarket().getHistory();
        if (history.isEmpty()) return List.of();

        // Берем срез (Window)
        int size = history.size();
        int start = Math.max(0, size - windowSize);
        List<Spot> window = history.subList(start, size);
        double windowLen = window.size();

        // Считаем частоту
        Map<Spot, Long> counts = window.stream()
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

        return counts.entrySet().stream()
                // Фильтр для ГСЧ: Игнорируем числа, выпавшие всего 1 раз (шум).
                // Ищем те, что подтвердили активность (>= 2 раз)
                .filter(entry -> entry.getValue() >= 2)
                .map(entry -> SpotPrediction.of(entry.getKey(), entry.getValue() / windowLen))
                .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
                .toList();
    }
}
