package com.buleto.analyzer.predictor.test;

import com.trading.roulette.api.enums.RouletteType;
import com.trading.roulette.api.enums.Spot;
import com.trading.roulette.api.model.SpotPrediction;

import java.util.Comparator;
import java.util.Deque;
import java.util.EnumMap;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Deprecated
public class MultiOrderMarkovTest implements PredictorTest {
    private final double weightOrder1 = 0.35;
    private final double weightOrder2 = 0.65;

    @Override
    public List<SpotPrediction> predict(Deque<Spot> history, RouletteType rouletteType, int windowSize) {
        List<Spot> window = split(history, windowSize);
        if(window.size() < 2) return List.of();

        Map<Spot, Map<Spot, Long>> order1Map = new EnumMap<>(Spot.class);
        Map<String, Map<Spot, Long>> order2Map = new HashMap<>();

        for (int i = 2; i < window.size(); i++) {
            Spot s1 = window.get(i - 2);
            Spot s2 = window.get(i - 1);
            Spot target = window.get(i);

            order1Map.computeIfAbsent(s2, _ -> new EnumMap<>(Spot.class))
                    .merge(target, 1L, Long::sum);

            String key = s1.name() + "|" + s2.name();
            order2Map.computeIfAbsent(key, _ -> new EnumMap<>(Spot.class))
                    .merge(target, 1L, Long::sum);
        }

        Spot lastSpot = window.getLast();
        Spot prevSpot = window.get(window.size() - 2);

        Map<Spot, Double> scores = new EnumMap<>(Spot.class);

        Map<Spot, Long> o1Candidates = order1Map.getOrDefault(lastSpot, Map.of());
        double o1Total = o1Candidates.values().stream().mapToLong(l -> l).sum();
        if (o1Total > 0) {
            o1Candidates.forEach((spot, count) ->
                    scores.merge(spot, (count / o1Total) * weightOrder1, Double::sum));
        }

        String keyOrder2 = prevSpot.name() + "|" + lastSpot.name();
        Map<Spot, Long> o2Candidates = order2Map.getOrDefault(keyOrder2, Map.of());
        double o2Total = o2Candidates.values().stream().mapToLong(l -> l).sum();
        if (o2Total > 0) {
            o2Candidates.forEach((spot, count) ->
                    scores.merge(spot, (count / o2Total) * weightOrder2, Double::sum));
        }

        if (scores.isEmpty()) return List.of();
        return normalize(scores);
    }

    private List<SpotPrediction> normalize(Map<Spot, Double> scores) {
        double sum = scores.values().stream().mapToDouble(v -> v).sum();
        if (sum == 0) return List.of();

        return scores.entrySet().stream()
                .map(e -> SpotPrediction.of(e.getKey(), e.getValue() / sum))
                .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
                .toList();
    }
}
