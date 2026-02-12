package com.traderoom.analyzer.success.v4;

import com.traderoom.api.enums.RouletteType;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.SpotPrediction;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public class BayesianTest implements PredictorTest {
    private static final double PRIOR_WEIGHT = 1.0;

    public List<SpotPrediction> predict(List<Spot> history, RouletteType rouletteType, int windowSize) {
        List<Spot> window = split(history, windowSize);
        long totalSpins = window.size();
        Map<Spot, Long> frequencies = window.stream()
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

        List<Spot> availableSpots = Spot.getAvailableList(rouletteType);
        double denominator = totalSpins + (availableSpots.size() * PRIOR_WEIGHT);

        return availableSpots.stream()
                .map(spot -> {
                    long count = frequencies.getOrDefault(spot, 0L);
                    double probability = (count + PRIOR_WEIGHT) / denominator;
                    return SpotPrediction.of(spot, probability);
                })
                .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
                .toList();
    }
}
