package com.buleto.analyzer.success.v5_final;

import com.trading.roulette.api.Predictor;
import com.trading.roulette.api.enums.Spot;
import com.trading.roulette.api.model.SpotPrediction;
import com.trading.roulette.api.model.State;
import com.trading.roulette.api.model.config.Config;
import com.trading.roulette.api.utils.HistoryUtil;

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
        List<Spot> window = HistoryUtil.window(state, windowSize);
        double size = window.size();
        Map<Spot, Long> counts = window.stream()
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
        return counts.entrySet()
                .stream()
                .map(entry -> SpotPrediction.of(entry.getKey(), entry.getValue() / size))
                .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
                .toList();
    }
}