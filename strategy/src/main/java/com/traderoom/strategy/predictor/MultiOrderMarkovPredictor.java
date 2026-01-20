package com.traderoom.strategy.predictor;

import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.BetTypePrediction;
import com.traderoom.strategy.model.ColorPrediction;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.model.SpotPrediction;

import java.util.Comparator;
import java.util.EnumMap;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MultiOrderMarkovPredictor implements Predictor {

    private final double order1;
    private final double order2;
    private final int min;
    private final Map<Spot, Map<Spot, Long>> order1Map;
    private final Map<String, Map<Spot, Long>> order2Map;
    private int processed;

    public MultiOrderMarkovPredictor() {
        order1 = 0.35;
        order2 = 0.65;
        min = 3;
        order1Map = new EnumMap<>(Spot.class);
        order2Map = new HashMap<>();
    }
    public static MultiOrderMarkovPredictor of(){
        return new MultiOrderMarkovPredictor();
    }

    @Override
    public List<SpotPrediction> getNextSpot(State state, Config config) {
        updateModel(state);

        List<Spot> history = state.getMarketData().getHistory();
        if (history.size() < min) {
            return List.of();
        }

        Spot lastSpot = history.getLast();
        Spot prevSpot = history.get(history.size() - 2);

        Map<Spot, Double> scores = new EnumMap<>(Spot.class);

        Map<Spot, Long> o1Candidates = order1Map.getOrDefault(lastSpot, Map.of());
        double o1Total = o1Candidates.values()
                .stream()
                .mapToLong(Long::longValue)
                .sum();

        if (o1Total > 0) {
            o1Candidates.forEach((spot, count) ->
                    scores.merge(spot, (count / o1Total) * order1, Double::sum));
        }

        String keyOrder2 = makeKey(prevSpot, lastSpot);
        Map<Spot, Long> o2Candidates = order2Map.getOrDefault(keyOrder2, Map.of());
        double o2Total = o2Candidates.values()
                .stream()
                .mapToLong(Long::longValue)
                .sum();

        if (o2Total > 0) {
            o2Candidates.forEach((spot, count) ->
                    scores.merge(spot, (count / o2Total) * order2, Double::sum));
        }

        if (scores.isEmpty()) {
            return List.of();
        }

        return normalize(scores);
    }

    private void updateModel(State state) {
        List<Spot> history = state.getMarketData().getHistory();
        int currentSize = history.size();

        if (currentSize < min || currentSize <= processed) {
            return;
        }

        int startIndex = Math.max(2, processed);

        for (int i = startIndex; i < currentSize; i++) {
            Spot s1 = history.get(i - 2);
            Spot s2 = history.get(i - 1);
            Spot target = history.get(i);

            order1Map.computeIfAbsent(s2, k -> new EnumMap<>(Spot.class))
                    .merge(target, 1L, Long::sum);

            String key = makeKey(s1, s2);
            order2Map.computeIfAbsent(key, k -> new EnumMap<>(Spot.class))
                    .merge(target, 1L, Long::sum);
        }

        processed = currentSize;
    }

    private String makeKey(Spot s1, Spot s2) {
        return s1.name() + "|" + s2.name();
    }

    private List<SpotPrediction> normalize(Map<Spot, Double> scores) {
        double sum = scores.values()
                .stream()
                .mapToDouble(Double::doubleValue)
                .sum();

        return (sum == 0) ? List.of()
                : scores.entrySet()
                .stream()
                .map(entry -> SpotPrediction.of(entry.getKey(), entry.getValue() / sum))
                .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
                .toList();
    }

    @Override
    public List<BetTypePrediction> getNextType(State state, Config config) {
        return List.of();
    }

    @Override
    public ColorPrediction getNextColor(State state, Config config) {
        List<SpotPrediction> list = getNextSpot(state, config);
        double red = 0;
        double black = 0;
        double green = 0;

        for (SpotPrediction p : list) {
            if (p.spot().isRed()) red += p.probability();
            else if (p.spot().isBlack()) black += p.probability();
            else if (p.spot().isGreen()) green += p.probability();
        }

        return ColorPrediction.of(red, black, green);
    }
}