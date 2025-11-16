package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.predictor.EnsemblePredictor;
import com.traderoom.strategy.predictor.Predictor;
import com.traderoom.strategy.utils.BetHelper;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;

public class EnsemblePredictionStrategy extends BaseStrategy {

    private static final Predictor PREDICTOR = EnsemblePredictor.createDefaultEnsemble();
    private static final double PROBABILITY_THRESHOLD = 0.15;
    private static final double BUDGET_ALLOCATION_PER_SPOT = 0.01;

    public EnsemblePredictionStrategy(Context context) {
        super(context);
    }

    @Override
    public String getName() {
        return EnsemblePredictionStrategy.class.getSimpleName();
    }

    @Override
    protected List<Bet> getNextInternal(Context context) {
        List<SpotPrediction> predictions = PREDICTOR.getNextSpotPredictionList(context);

        if (predictions.isEmpty()) {
            return List.of();
        }

        return predictions.stream()
                .filter(p -> p.probability() >= PROBABILITY_THRESHOLD)
                .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
                .map(prediction -> {
                    long betValue = (long) (curBalance * BUDGET_ALLOCATION_PER_SPOT * prediction.probability() * 10);
                    long safeBetValue = Math.max(context.getMin(), betValue);
                    safeBetValue = Math.min(safeBetValue, context.getMax());

                    if (safeBetValue <= 0 || safeBetValue > curBalance) {
                        return null;
                    }

                    return Bet.builder()
                            .type(BetHelper.getStraightUpBetType(prediction.spot()))
                            .value(safeBetValue)
                            .build();
                })
                .filter(Objects::nonNull)
                .limit(5)
                .toList();
    }
}