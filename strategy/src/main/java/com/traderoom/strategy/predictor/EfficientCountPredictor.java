package com.traderoom.strategy.predictor;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.BetTypePrediction;
import com.traderoom.strategy.model.ColorPrediction;
import com.traderoom.strategy.model.SpotPrediction;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

public class EfficientCountPredictor implements Predictor {

    @Override
    public List<SpotPrediction> getNextSpotPredictionList(Context context) {
        validateContext(context);

        Map<Spot, Integer> frequencies = context.getSpotFrequencies();
        double totalCount = context.getSpotHistory().size();

        if (totalCount == 0) {
            return List.of();
        }

        List<Spot> availableSpots = Spot.getAvailableList(context.getRouletteType());

        return availableSpots.stream()
                .map(spot -> SpotPrediction.builder()
                        .spot(spot)
                        .probability(calculateProbability(frequencies.getOrDefault(spot, 0), totalCount))
                        .build())
                .toList();
    }

    @Override
    public List<BetTypePrediction> getNextBetTypePredictionList(Context context) {
        validateContext(context);

        Map<Spot, Integer> spotFrequencies = context.getSpotFrequencies();
        double totalCount = context.getSpotHistory().size();

        if (totalCount == 0) {
            return List.of();
        }

        List<BetType> availableTypes = BetType.getAvailableList(context.getRouletteType());
        EnumMap<BetType, Long> typeFrequencies = new EnumMap<>(BetType.class);

        EnumMap<Spot, List<BetType>> spotToWinningTypesMap = new EnumMap<>(Spot.class);
        for (BetType type : availableTypes) {
            for (Spot winningSpot : type.getWinningSpots()) {
                spotToWinningTypesMap.computeIfAbsent(winningSpot, k -> new java.util.ArrayList<>()).add(type);
            }
        }

        for (Map.Entry<Spot, Integer> spotEntry : spotFrequencies.entrySet()) {
            Spot spot = spotEntry.getKey();
            long count = spotEntry.getValue();
            List<BetType> winningTypes = spotToWinningTypesMap.get(spot);
            if (winningTypes != null) {
                for (BetType type : winningTypes) {
                    typeFrequencies.merge(type, count, Long::sum);
                }
            }
        }
        return availableTypes.stream()
                .map(type -> BetTypePrediction.builder()
                        .type(type)
                        .probability(calculateProbability(typeFrequencies.getOrDefault(type, 0L), totalCount))
                        .build())
                .toList();
    }

    @Override
    public ColorPrediction getNextColorPrediction(Context context) {
        validateContext(context);
        Map<Spot, Integer> frequencies = context.getSpotFrequencies();
        double totalCount = context.getSpotHistory().size();

        if (totalCount == 0) {
            return ColorPrediction.builder().red(0).black(0).green(0).build();
        }

        double redCount = frequencies.entrySet().stream()
                .filter(e -> e.getKey().isRed())
                .mapToDouble(Map.Entry::getValue)
                .sum();
        double blackCount = frequencies.entrySet().stream()
                .filter(e -> e.getKey().isBlack())
                .mapToDouble(Map.Entry::getValue)
                .sum();
        double greenCount = frequencies.entrySet().stream()
                .filter(e -> e.getKey().isGreen())
                .mapToDouble(Map.Entry::getValue)
                .sum();

        return ColorPrediction.builder()
                .red(calculateProbability(redCount, totalCount))
                .black(calculateProbability(blackCount, totalCount))
                .green(calculateProbability(greenCount, totalCount))
                .build();
    }

    private void validateContext(Context context) {
        Objects.requireNonNull(context, "Context must not be null");
        Objects.requireNonNull(context.getSpotHistory(), "Spot history must not be null");
    }

    private double calculateProbability(double occurrences, double totalCount) {
        return totalCount == 0 ? 0.0 : occurrences / totalCount;
    }
}