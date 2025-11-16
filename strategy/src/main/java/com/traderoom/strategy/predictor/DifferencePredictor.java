package com.traderoom.strategy.predictor;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.BetTypePrediction;
import com.traderoom.strategy.model.ColorPrediction;
import com.traderoom.strategy.model.SpotPrediction;

import java.util.List;
import java.util.Objects;

public class DifferencePredictor implements Predictor {

    @Override
    public List<SpotPrediction> getNextSpotPredictionList(Context context) {
        Objects.requireNonNull(context, "Context must not be null");
        Objects.requireNonNull(context.getSpotHistory(), "Spot history must not be null");
        Objects.requireNonNull(context.getLastSpot(), "Last spot must not be null");
        if (context.getSpotHistory().isEmpty()) {
            return List.of();
        }
        double average = context.getSpotHistory().stream()
                .mapToInt(Spot::getNumber)
                .average()
                .orElse(0.0);
        int lastSpotNumber = context.getLastSpot().getNumber();
        return List.of(SpotPrediction.builder()
                        .spot(Spot.getByNumber((int) (lastSpotNumber + average)))
                        .probability(0.5)
                        .build(),
                SpotPrediction.builder()
                        .spot(Spot.getByNumber((int) (lastSpotNumber - average)))
                        .probability(0.5)
                        .build());
    }

    @Override
    public List<BetTypePrediction> getNextBetTypePredictionList(Context context) {
        return List.of();
    }

    @Override
    public ColorPrediction getNextColorPrediction(Context context) {
        return ColorPrediction.builder()
                .red(0)
                .black(0)
                .green(0)
                .build();
    }
}