package com.traderoom.strategy.predictor;

import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.BetTypePrediction;
import com.traderoom.strategy.model.ColorPrediction;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.model.SpotPrediction;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;

public class PatternPredictor implements Predictor {

    private final double hotSpotWeight;
    private final double coldSpotWeight;
    private final double neverSeenWeight;
    private final double consecutiveWeight;
    private final double repeatingPatternWeight;
    private final double lastSpotWeight;
    private final int window;
    private final int cold;
    private final int min;
    private final double probability;

    public PatternPredictor() {
        hotSpotWeight = 1.2;
        coldSpotWeight = 0.8;
        neverSeenWeight = 0.5;
        consecutiveWeight = 1.3;
        repeatingPatternWeight = 1.1;
        lastSpotWeight = 0.7;
        window = 10;
        cold = 15;
        min = 4;
        probability = 0.0;
    }

    public static PatternPredictor of() {
        return new PatternPredictor();
    }

    @Override
    public List<SpotPrediction> getNextSpot(State state, Config config) {
        if (state.getMarketData().getHistory().isEmpty()) {
            return List.of();
        }

        EnumMap<Spot, Double> baseFrequency = calculateBaseFrequency(state);
        EnumMap<Spot, Double> hotColdWeights = calculateHotColdWeights(state, config);
        EnumMap<Spot, Double> patternWeights = calculatePatternWeights(state, config);

        List<Spot> list = Spot.getAvailableList(config.rouletteType());
        if (list.isEmpty()) {
            return List.of();
        }

        List<SpotPrediction> predictions = list.stream()
                .map(spot -> SpotPrediction.of(spot, (baseFrequency.getOrDefault(spot, probability)
                        * hotColdWeights.getOrDefault(spot, 1.0)
                        * patternWeights.getOrDefault(spot, 1.0))))
                .filter(prediction -> prediction.probability() > 0)
                .toList();

        return normalizeProbabilities(predictions);
    }

    @Override
    public List<BetTypePrediction> getNextType(State state, Config config) {
        return List.of();
    }

    @Override
    public ColorPrediction getNextColor(State state, Config config) {
        return ColorPrediction.builder()
                .red(probability)
                .black(probability)
                .green(probability)
                .build();
    }

    private EnumMap<Spot, Double> calculateBaseFrequency(State state) {
        EnumMap<Spot, Double> frequency = new EnumMap<>(Spot.class);
        Map<Spot, Integer> spotCount = state.getMarketData().getFrequencies();
        long totalCount = spotCount.values().stream().mapToLong(Integer::longValue).sum();

        if (totalCount == 0) {
            return frequency;
        }

        spotCount.forEach((spot, count) -> frequency.put(spot, (double) count / totalCount));
        return frequency;
    }

    private EnumMap<Spot, Double> calculateHotColdWeights(State state, Config config) {
        EnumMap<Spot, Double> weights = new EnumMap<>(Spot.class);
        List<Spot> history = state.getMarketData().getHistory();
        int historySize = history.size();
        int wind = Math.min(window, historySize);

        EnumMap<Spot, Integer> recentCount = new EnumMap<>(Spot.class);
        EnumMap<Spot, Integer> lastAppearance = new EnumMap<>(Spot.class);

        for (int i = 0; i < historySize; i++) {
            Spot spot = history.get(i);
            lastAppearance.put(spot, i);
            if (i >= historySize - wind) {
                recentCount.merge(spot, 1, Integer::sum);
            }
        }

        for (Spot spot : Spot.getAvailableList(config.rouletteType())) {
            double weight = 1.0;
            int recentAppearances = recentCount.getOrDefault(spot, 0);
            if (recentAppearances > 1) {
                weight *= hotSpotWeight;
            }
            Integer lastPos = lastAppearance.get(spot);
            if (lastPos != null) {
                int gapSinceLastAppearance = historySize - lastPos - 1;
                if (gapSinceLastAppearance > cold) {
                    weight *= coldSpotWeight;
                }
            } else {
                weight *= neverSeenWeight;
            }
            weights.put(spot, weight);
        }
        return weights;
    }

    private EnumMap<Spot, Double> calculatePatternWeights(State state, Config config) {
        EnumMap<Spot, Double> weights = new EnumMap<>(Spot.class);
        List<Spot> list = Spot.getAvailableList(config.rouletteType());
        if (state.getMarketData().getHistory().size() < min - 1) {
            list.forEach(spot -> weights.put(spot, 1.0));
            return weights;
        }

        Spot lastSpot = state.getMarketData().getLastSpot();
        assert lastSpot != null;
        for (Spot spot : list) {
            double weight = 1.0;
            if (isConsecutiveNumber(lastSpot, spot)) {
                weight *= consecutiveWeight;
            }
            if (hasRepeatingPattern(state, spot)) {
                weight *= repeatingPatternWeight;
            }
            if (lastSpot == spot) {
                weight *= lastSpotWeight;
            }
            weights.put(spot, weight);
        }
        return weights;
    }

    private boolean isConsecutiveNumber(Spot spot1, Spot spot2) {
        int num1 = spot1.getNumber();
        int num2 = spot2.getNumber();
        return num1 > 0 && num2 > 0 && Math.abs(num1 - num2) == 1;
    }

    private boolean hasRepeatingPattern(State state, Spot targetSpot) {
        List<Spot> history = state.getMarketData().getHistory();
        if (history.size() < min) {
            return false;
        }
        int size = history.size();
        return history.get(size - 3) == history.get(size - 1) && targetSpot == history.get(size - 2);
    }

    private List<SpotPrediction> normalizeProbabilities(List<SpotPrediction> predictions) {
        double sum = predictions.stream()
                .mapToDouble(SpotPrediction::probability)
                .sum();
        boolean bool = (sum <= 0 || Double.isNaN(sum) || Double.isInfinite(sum));
        return predictions.stream().map(p -> SpotPrediction.of(p.spot(), bool ? probability : p.probability() / sum)).toList();
    }
}