package com.traderoom.analyzer.success.v2_1;

import com.traderoom.api.Predictor;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.SpotPrediction;
import com.traderoom.api.model.State;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.utils.HistoryUtil;

import java.util.Comparator;
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
        List<Spot> window = HistoryUtil.window(state, windowSize);
        double totalInWindow = window.size();

        Map<Spot, Long> counts = window.stream()
                .collect(Collectors.groupingBy(s -> s, Collectors.counting()));

        return counts.entrySet().stream()
                .map(e -> SpotPrediction.of(e.getKey(), e.getValue() / totalInWindow))
                .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
                .toList();
    }
}