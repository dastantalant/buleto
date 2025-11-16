package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.predictor.Predictor;
import com.traderoom.strategy.predictor.RnnPredictor;
import com.traderoom.strategy.utils.BetHelper;
import org.deeplearning4j.nn.multilayer.MultiLayerNetwork;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

public class PredictorConfidenceStrategy extends BaseStrategy {

    private static final double MIN_PROBABILITY_THRESHOLD = 0.10;
    private static final double BUDGET_FRACTION_PER_ROUND = 0.05;
    private static final int MAX_BETS_PER_ROUND = 3;
    private final Predictor predictor;
    private final boolean isReady;

    public PredictorConfidenceStrategy(Context context, Optional<MultiLayerNetwork> rnnModelOpt) {
        super(context);
        isReady = rnnModelOpt.isPresent();
        predictor = rnnModelOpt.map(multiLayerNetwork -> new RnnPredictor(multiLayerNetwork, context.getRouletteType()))
                .orElse(null);
    }

    @Override
    public String getName() {
        return PredictorConfidenceStrategy.class.getSimpleName();
    }

    @Override
    protected List<Bet> getNextInternal(Context context) {
        if (!isReady) {
            return List.of();
        }

        List<SpotPrediction> predictions = predictor.getNextSpotPredictionList(context);
        if (predictions.isEmpty()) {
            return List.of();
        }
        long roundBudget = (long) (curBalance * BUDGET_FRACTION_PER_ROUND);
        if (roundBudget < context.getMin()) {
            return List.of();
        }

        return predictions.stream()
                .filter(p -> p.probability() >= MIN_PROBABILITY_THRESHOLD)
                .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
                .limit(MAX_BETS_PER_ROUND)
                .map(prediction -> {
                    long betValue = (long) (roundBudget * prediction.probability());
                    long clampedValue = Math.max(context.getMin(), betValue);
                    clampedValue = Math.min(clampedValue, context.getMax());
                    if (clampedValue > curBalance) return null;
                    return Bet.builder()
                            .type(BetHelper.getStraightUpBetType(prediction.spot()))
                            .value(clampedValue)
                            .build();
                })
                .filter(Objects::nonNull)
                .toList();
    }
}