package com.traderoom.strategy.predictor;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.BetTypePrediction;
import com.traderoom.strategy.model.ColorPrediction;
import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.utils.BetHelper;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

public class CountPredictor2 implements Predictor {

    @Override
    public List<SpotPrediction> getNextSpotPredictionList(Context context) {
        validateContext(context);
        Map<Spot, Long> countMap = getSpotTypeCountMap(context);
        double totalCount = context.getSpotHistory().size();

        List<Spot> availableSpots = Spot.getAvailableList(context.getRouletteType());
        if (availableSpots.isEmpty()) {
            return List.of();
        }

        return availableSpots.stream()
                .map(spot -> SpotPrediction.builder()
                        .spot(spot)
                        .probability(calculateProbability(countMap.getOrDefault(spot, 0L), totalCount))
                        .build())
                .toList();
    }

    @Override
    public List<BetTypePrediction> getNextBetTypePredictionList(Context context) {
        validateContext(context);
        EnumMap<BetType, Long> countMap = getBetTypeCountMap(context);
        double totalCount = context.getSpotHistory().size();

        List<BetType> availableTypes = BetType.getAvailableList(context.getRouletteType());
        if (availableTypes.isEmpty()) {
            return List.of();
        }

        return availableTypes.stream()
                .map(type -> BetTypePrediction.builder()
                        .type(type)
                        .probability(calculateProbability(countMap.getOrDefault(type, 0L), totalCount))
                        .build())
                .toList();
    }

    @Override
    public ColorPrediction getNextColorPrediction(Context context) {
        validateContext(context);
        EnumMap<Spot, Long> countMap = getSpotTypeCountMap(context);
        List<Spot> availableSpots = Spot.getAvailableList(context.getRouletteType());
        if (availableSpots.isEmpty()) {
            return ColorPrediction.builder().red(0.0).black(0.0).green(0.0).build();
        }

        double red = 0;
        double black = 0;
        double green = 0;
        for (Spot spot : availableSpots) {
            long spotCount = countMap.getOrDefault(spot, 0L);
            if (spot.isRed()) {
                red += spotCount;
            } else if (spot.isBlack()) {
                black += spotCount;
            } else if (spot.isGreen()) {
                green += spotCount;
            }
        }
        double totalCount = red + black + green;

        return ColorPrediction.builder()
                .red(calculateProbability(red, totalCount))
                .black(calculateProbability(black, totalCount))
                .green(calculateProbability(green, totalCount))
                .build();
    }

    private EnumMap<Spot, Long> getSpotTypeCountMap(Context context) {
        EnumMap<Spot, Long> countMap = new EnumMap<>(Spot.class);
        for (Spot spot : context.getSpotHistory()) {
            countMap.merge(spot, 1L, Long::sum);
        }
        return countMap;
    }

    private EnumMap<BetType, Long> getBetTypeCountMap(Context context) {
        EnumMap<BetType, Long> countMap = new EnumMap<>(BetType.class);
        List<BetType> availableTypes = BetType.getAvailableList(context.getRouletteType());
        for (Spot spot : context.getSpotHistory()) {
            for (BetType betType : availableTypes) {
                if (BetHelper.isWin(betType, spot)) {
                    countMap.merge(betType, 1L, Long::sum);
                }
            }
        }
        return countMap;
    }

    private void validateContext(Context context) {
        Objects.requireNonNull(context, "Context must not be null");
        Objects.requireNonNull(context.getRouletteType(), "Roulette type must not be null");
        Objects.requireNonNull(context.getSpotHistory(), "Spot history must not be null");
    }

    private double calculateProbability(double occurrences, double totalCount) {
        return totalCount == 0 ? 0.0 : occurrences / totalCount;
    }
}