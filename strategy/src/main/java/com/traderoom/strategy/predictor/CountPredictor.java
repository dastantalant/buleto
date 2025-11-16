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
import java.util.Objects;

public class CountPredictor implements Predictor {

    private final EnumMap<Spot, Long> spotMap;
    private final EnumMap<BetType, Long> typeMap;
    private long count;

    public CountPredictor() {
        spotMap = new EnumMap<>(Spot.class);
        typeMap = new EnumMap<>(BetType.class);
        count = 0;
    }

    @Override
    public List<SpotPrediction> getNextSpotPredictionList(Context context) {
        validateContext(context);
        updateParameter(context);
        return Spot.getAvailableList(context.getRouletteType()).stream()
                .map(spot -> SpotPrediction.builder()
                        .spot(spot)
                        .probability(calculateProbability(spotMap.getOrDefault(spot, 0L)))
                        .build())
                .toList();
    }

    @Override
    public List<BetTypePrediction> getNextBetTypePredictionList(Context context) {
        validateContext(context);
        updateParameter(context);
        return BetType.getAvailableList(context.getRouletteType()).stream()
                .map(type -> BetTypePrediction.builder()
                        .type(type)
                        .probability(calculateProbability(typeMap.getOrDefault(type, 0L)))
                        .build())
                .toList();
    }

    @Override
    public ColorPrediction getNextColorPrediction(Context context) {
        validateContext(context);
        updateParameter(context);

        double red = 0;
        double black = 0;
        double green = 0;
        for (Spot spot : Spot.getAvailableList(context.getRouletteType())) {
            long spotCount = spotMap.getOrDefault(spot, 0L);
            if (spot.isRed()) {
                red += spotCount;
            } else if (spot.isBlack()) {
                black += spotCount;
            } else if (spot.isGreen()) {
                green += spotCount;
            }
        }
        return ColorPrediction.builder()
                .red(calculateProbability(red))
                .black(calculateProbability(black))
                .green(calculateProbability(green))
                .build();
    }

    private void updateParameter(Context context) {
        spotMap.merge(context.getLastSpot(), 1L, Long::sum);
        for (BetType type : BetType.getAvailableList(context.getRouletteType())) {
            if (BetHelper.isWin(type, context.getLastSpot())) {
                typeMap.merge(type, 1L, Long::sum);
            }
        }
        count++;
    }

    private double calculateProbability(double occurrences) {
        return count == 0 ? 0.0 : occurrences / count;
    }

    private void validateContext(Context context) {
        Objects.requireNonNull(context, "Context must not be null");
        Objects.requireNonNull(context.getRouletteType(), "Roulette type must not be null");
    }
}