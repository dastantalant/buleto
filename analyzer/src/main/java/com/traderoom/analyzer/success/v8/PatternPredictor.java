package com.traderoom.analyzer.success.v8;

import com.traderoom.api.Predictor;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.SpotPrediction;
import com.traderoom.api.model.State;
import com.traderoom.api.model.config.Config;

import java.util.Collections;
import java.util.Comparator;
import java.util.EnumMap;
import java.util.List;

public class PatternPredictor implements Predictor {
    private final double hotSpotWeight = 1.2;
    private final double coldSpotWeight = 0.8;
    private final double neverSeenWeight = 0.5;
    private final double consecutiveWeight = 1.3;
    private final double repeatingPatternWeight = 1.1;
    private final double lastSpotWeight = 0.7;
    private final int analysisWindowSize;
    private final int hotWindowSize = 10;
    private final int coldThreshold = 15;
    private final int minHistoryRequired = 5; // 4
    private final double defaultProbability = 0.0;

    public PatternPredictor(int analysisWindowSize) {
        this.analysisWindowSize = analysisWindowSize;
    }

    public List<SpotPrediction> predictSpot(State state, Config config) {
        List<Spot> history = getSlidingWindow(state);
        if (history.size() < minHistoryRequired) return List.of();
        EnumMap<Spot, Double> baseFrequency = calculateBaseFrequency(history);
        EnumMap<Spot, Double> hotColdWeights = calculateHotColdWeights(history, config);
        EnumMap<Spot, Double> patternWeights = calculatePatternWeights(history, config);
        List<Spot> availableSpots = Spot.getAvailableList(config.rouletteType());
        if (availableSpots.isEmpty()) return List.of();
        List<SpotPrediction> predictions = availableSpots.stream()
                .map(spot -> {
                    double base = baseFrequency.getOrDefault(spot, defaultProbability);
                    double hotCold = hotColdWeights.getOrDefault(spot, 1.0);
                    double pattern = patternWeights.getOrDefault(spot, 1.0);
                    double combinedProb = base * hotCold * pattern;
                    return SpotPrediction.of(spot, combinedProb);
                })
                .filter(prediction -> prediction.probability() > 0)
                .toList();
        return normalizeProbabilities(predictions);
    }

    private List<Spot> getSlidingWindow(State state) {
        List<Spot> fullHistory = state.getMarket().getHistory();
        int size = fullHistory.size();
        if (size == 0) return Collections.emptyList();
        int start = Math.max(0, size - analysisWindowSize);
        return fullHistory.subList(start, size);
    }

    private EnumMap<Spot, Double> calculateBaseFrequency(List<Spot> history) {
        EnumMap<Spot, Double> frequency = new EnumMap<>(Spot.class);
        double totalCount = history.size();
        if (totalCount == 0) return frequency;
        for (Spot spot : history) {
            frequency.merge(spot, 1.0, Double::sum);
        }
        frequency.replaceAll((k, v) -> v / totalCount);
        return frequency;
    }

    private EnumMap<Spot, Double> calculateHotColdWeights(List<Spot> history, Config config) {
        EnumMap<Spot, Double> weights = new EnumMap<>(Spot.class);
        int size = history.size();
        int effectiveHotWindow = Math.min(hotWindowSize, size);
        EnumMap<Spot, Integer> recentCount = new EnumMap<>(Spot.class);
        EnumMap<Spot, Integer> lastAppearanceIndex = new EnumMap<>(Spot.class);
        for (int i = 0; i < size; i++) {
            Spot spot = history.get(i);
            lastAppearanceIndex.put(spot, i);
            if (i >= size - effectiveHotWindow) recentCount.merge(spot, 1, Integer::sum);
        }
        for (Spot spot : Spot.getAvailableList(config.rouletteType())) {
            double weight = 1.0;
            if (recentCount.getOrDefault(spot, 0) > 1) weight *= hotSpotWeight;
            Integer pos = lastAppearanceIndex.get(spot);
            weight = weight * (pos != null && (size - pos - 1) > coldThreshold
                    ? coldSpotWeight
                    : neverSeenWeight);
            weights.put(spot, weight);
        }
        return weights;
    }

    private EnumMap<Spot, Double> calculatePatternWeights(List<Spot> history, Config config) {
        EnumMap<Spot, Double> weights = new EnumMap<>(Spot.class);
        List<Spot> availableSpots = Spot.getAvailableList(config.rouletteType());
        if (history.size() < minHistoryRequired - 1) {
            availableSpots.forEach(spot -> weights.put(spot, 1.0));
            return weights;
        }
        Spot lastSpot = history.getLast();
        for (Spot spot : availableSpots) {
            double weight = 1.0;
            if (isConsecutiveNumber(lastSpot, spot)) {
                weight *= consecutiveWeight;
            }
            if (hasRepeatingPattern(history, spot)) {
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

    private boolean hasRepeatingPattern(List<Spot> history, Spot targetSpot) {
        int size = history.size();
        if (size < 3) return false;
        Spot a1 = history.get(size - 3);
        Spot b = history.get(size - 2);
        Spot a2 = history.get(size - 1);
        return a1 == a2 && b == targetSpot;
    }

    private List<SpotPrediction> normalizeProbabilities(List<SpotPrediction> predictions) {
        double sum = predictions.stream()
                .mapToDouble(SpotPrediction::probability)
                .sum();
        boolean invalidSum = (sum <= 0 || Double.isNaN(sum) || Double.isInfinite(sum));
        if (invalidSum && !predictions.isEmpty()) {
            double prob = 1.0 / predictions.size();
            return predictions.stream()
                    .map(prediction -> SpotPrediction.of(prediction.spot(), prob))
                    .toList();
        } else if (invalidSum) {
            return List.of();
        }
        return predictions.stream()
                .map(prediction -> SpotPrediction.of(prediction.spot(), prediction.probability() / sum))
                .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
                .toList();
    }
}