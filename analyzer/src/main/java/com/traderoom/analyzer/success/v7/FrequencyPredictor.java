package com.traderoom.analyzer.success.v7;

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

    private final int windowSize;

    public FrequencyPredictor(int windowSize) {
        this.windowSize = windowSize;
    }

    @Override
    public List<SpotPrediction> predictSpot(State state, Config config) {
        List<Spot> window = split(state.getMarket().getHistory(), windowSize);
        double size = window.size();
        Map<Spot, Long> counts = window.stream()
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
        return counts.entrySet()
                .stream()
                .map(entry -> SpotPrediction.of(entry.getKey(), entry.getValue() / size))
                .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
                .toList();
    }

    private List<Spot> split(List<Spot> history, int windowSize) {
        int historySize = history.size();
        int startIndex = Math.max(0, historySize - windowSize);
        return  history.subList(startIndex, historySize);
    }
}