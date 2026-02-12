package com.traderoom.strategy.predictor;

import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.SpotPrediction;
import com.traderoom.api.model.State;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.Predictor;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class SlidingWindowFreqPredictor implements Predictor {

    private final int windowSize;

    public SlidingWindowFreqPredictor() {
        this(960);
    }

    public SlidingWindowFreqPredictor(int windowSize) {
        this.windowSize = windowSize;
    }

    @Override
    public List<SpotPrediction> predictSpot(State state, Config config) {
        List<Spot> history = state.getMarket().getHistory();
        int historySize = history.size();

        int startIndex = Math.max(0, historySize - windowSize);
        List<Spot> window = history.subList(startIndex, historySize);
        double totalInWindow = window.size();

        Map<Spot, Long> counts = window.stream()
                .collect(Collectors.groupingBy(s -> s, Collectors.counting()));

        return counts.entrySet().stream()
                .map(e -> SpotPrediction.of(e.getKey(), e.getValue() / totalInWindow))
                .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
                .toList();
    }
}