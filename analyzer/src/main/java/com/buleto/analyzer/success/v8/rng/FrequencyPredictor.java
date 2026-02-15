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
import java.util.function.Function;
import java.util.stream.Collectors;

public class FrequencyPredictor implements Predictor {
    private final int windowSize; // Для ГСЧ идеально 37 или 50

    public FrequencyPredictor(int windowSize) {
        this.windowSize = windowSize;
    }

    @Override
    public List<SpotPrediction> predictSpot(State state, Config config) {
        Deque<Spot> history = state.getMarket().getHistory();
        if (history.isEmpty()) return List.of();

        int toTake = Math.min(windowSize, history.size());

        Map<Spot, Long> counts = new EnumMap<>(Spot.class);

        var it = history.descendingIterator();
        int collected = 0;

        while (it.hasNext() && collected < toTake) {
            Spot spot = it.next();
            counts.merge(spot, 1L, Long::sum);
            collected++;
        }

        double windowLen = collected;
        if (windowLen == 0) return List.of();

        return counts.entrySet().stream()
                .filter(e -> e.getValue() >= 2)
                .map(e -> SpotPrediction.of(e.getKey(), e.getValue() / windowLen))
                .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
                .toList();
    }
}
