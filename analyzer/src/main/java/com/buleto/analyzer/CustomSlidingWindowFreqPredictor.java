package com.buleto.analyzer;

import com.trading.roulette.api.Predictor;
import com.trading.roulette.api.enums.Spot;
import com.trading.roulette.api.model.SpotPrediction;
import com.trading.roulette.api.model.State;
import com.trading.roulette.api.model.config.Config;

import java.util.Comparator;
import java.util.Deque;
import java.util.EnumMap;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class CustomSlidingWindowFreqPredictor implements Predictor {

    private final int windowSize;

    public CustomSlidingWindowFreqPredictor() {
        this(960);
    }

    public CustomSlidingWindowFreqPredictor(int windowSize) {
        this.windowSize = windowSize;
    }

    @Override
    public List<SpotPrediction> predictSpot(State state, Config config) {
        Deque<Spot> history = state.getMarket().getHistory();
        if (history.isEmpty()) {
            return List.of();
        }

        int toTake = Math.min(windowSize, history.size());

        Map<Spot, Long> counts = new EnumMap<>(Spot.class);
        var it = history.descendingIterator();

        int taken = 0;
        while (it.hasNext() && taken < toTake) {
            Spot spot = it.next();
            counts.merge(spot, 1L, Long::sum);
            taken++;
        }

        if (taken == 0) return List.of();

        double total = taken;

        return counts.entrySet().stream()
                .map(e -> SpotPrediction.of(e.getKey(), e.getValue() / total))
                .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
                .toList();
    }
}