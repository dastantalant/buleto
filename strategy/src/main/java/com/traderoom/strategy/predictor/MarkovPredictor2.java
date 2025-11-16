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

public class MarkovPredictor2 implements Predictor {

    private static final int MIN_SIZE = 2;
    private static final double PROBABILITY = 0.0;

    private final EnumMap<Spot, EnumMap<Spot, Long>> spotMap;
    private final EnumMap<BetType, EnumMap<BetType, Long>> typeMap;
    private long transitions;

    public MarkovPredictor2() {
        spotMap = new EnumMap<>(Spot.class);
        typeMap = new EnumMap<>(BetType.class);
        transitions = 0;
    }

    @Override
    public List<SpotPrediction> getNextSpotPredictionList(Context context) {
        validateContext(context);
        if (context.getSpotHistory().size() < MIN_SIZE) {
            return List.of();
        }

        updateMarkovModel(context);
        EnumMap<Spot, Long> enumMap = spotMap.getOrDefault(context.getLastSpot(), new EnumMap<>(Spot.class));

        List<Spot> availableSpots = Spot.getAvailableList(context.getRouletteType());
        if (availableSpots.isEmpty()) {
            return List.of();
        }

        return availableSpots.stream()
                .map(spot -> SpotPrediction.builder()
                        .spot(spot)
                        .probability(calculateProbability(enumMap.getOrDefault(spot, 0L)))
                        .build())
                .filter(prediction -> prediction.probability() > 0)
                .toList();
    }

    @Override
    public List<BetTypePrediction> getNextBetTypePredictionList(Context context) {
        validateContext(context);
        if (context.getSpotHistory().size() < MIN_SIZE) {
            return List.of();
        }

        updateMarkovModel(context);
        List<BetType> lastSpotBetTypes = BetType.getAvailableList(context.getRouletteType()).stream()
                .filter(type -> BetHelper.isWin(type, context.getLastSpot()))
                .toList();

        List<BetType> availableTypes = BetType.getAvailableList(context.getRouletteType());
        if (availableTypes.isEmpty()) {
            return List.of();
        }

        return lastSpotBetTypes.stream()
                .flatMap(lastType -> {
                    EnumMap<BetType, Long> enumMap = typeMap.getOrDefault(lastType, new EnumMap<>(BetType.class));
                    return availableTypes.stream()
                            .map(nextType -> BetTypePrediction.builder()
                                    .type(nextType)
                                    .probability(calculateProbability(enumMap.getOrDefault(nextType, 0L)))
                                    .build())
                            .filter(prediction -> prediction.probability() > 0);
                })
                .toList();
    }

    @Override
    public ColorPrediction getNextColorPrediction(Context context) {
        validateContext(context);
        return ColorPrediction.builder()
                .red(PROBABILITY)
                .black(PROBABILITY)
                .green(PROBABILITY)
                .build();
    }

    private void updateMarkovModel(Context context) {
        if (context.getSpotHistory().size() < MIN_SIZE) {
            return;
        }

        for (int i = 0; i < context.getSpotHistory().size() - 1; i++) {
            Spot spot1 = context.getSpotHistory().get(i);
            Spot spot2 = context.getSpotHistory().get(i + 1);
            spotMap.computeIfAbsent(spot1, k -> new EnumMap<>(Spot.class))
                    .merge(spot2, 1L, Long::sum);
        }

        for (int i = 0; i < context.getSpotHistory().size() - 1; i++) {
            Spot spot1 = context.getSpotHistory().get(i);
            Spot spot2 = context.getSpotHistory().get(i + 1);
            List<BetType> betTypeList1 = BetType.getAvailableList(context.getRouletteType()).stream()
                    .filter(type -> BetHelper.isWin(type, spot1))
                    .toList();
            List<BetType> betTypeList2 = BetType.getAvailableList(context.getRouletteType()).stream()
                    .filter(type -> BetHelper.isWin(type, spot2))
                    .toList();

            for (BetType betType1 : betTypeList1) {
                for (BetType betType2 : betTypeList2) {
                    typeMap.computeIfAbsent(betType1, k -> new EnumMap<>(BetType.class))
                            .merge(betType2, 1L, Long::sum);
                }
            }
        }
        transitions = context.getSpotHistory().size() - 1L;
    }

    private void validateContext(Context context) {
        Objects.requireNonNull(context, "Context must not be null");
        Objects.requireNonNull(context.getSpotHistory(), "Spot history must not be null");
        Objects.requireNonNull(context.getLastSpot(), "Last spot must not be null");
        Objects.requireNonNull(context.getRouletteType(), "Roulette type must not be null");
    }

    private double calculateProbability(long occurrences) {
        return transitions == 0 ? PROBABILITY : (double) occurrences / transitions;
    }

    public void reset() {
        spotMap.clear();
        typeMap.clear();
        transitions = 0;
    }
}