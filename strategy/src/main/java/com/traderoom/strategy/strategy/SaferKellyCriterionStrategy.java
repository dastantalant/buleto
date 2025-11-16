package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.predictor.Predictor;
import com.traderoom.strategy.predictor.RnnPredictor;
import com.traderoom.strategy.utils.BetHelper;
import org.deeplearning4j.nn.multilayer.MultiLayerNetwork;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

public class SaferKellyCriterionStrategy extends BaseStrategy {

    private static final double FRACTIONAL_KELLY_MULTIPLIER = 0.3;
    private static final double MAX_BET_PERCENTAGE_CAP = 0.05;

    private final Predictor predictor;
    private final boolean isReady;

    public SaferKellyCriterionStrategy(Context context, Optional<MultiLayerNetwork> rnnModelOpt) {
        super(context);
        isReady = rnnModelOpt.isPresent();
        predictor = rnnModelOpt
                .map(net -> new RnnPredictor(net, context.getRouletteType()))
                .orElse(null);
    }

    @Override
    public String getName() {
        return SaferKellyCriterionStrategy.class.getSimpleName();
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

        Optional<CalculatedKellyBet> bestBetOptional = predictions.stream()
                .map(this::calculateKellyFraction)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .max(Comparator.comparingDouble(CalculatedKellyBet::kellyFraction));

        if (bestBetOptional.isEmpty()) {
            return List.of();
        }

        CalculatedKellyBet bestBet = bestBetOptional.get();

        long betValue = (long) (curBalance * bestBet.kellyFraction());

        long cappedBetValue = (long) (curBalance * MAX_BET_PERCENTAGE_CAP);
        betValue = Math.min(betValue, cappedBetValue);

        long clampedValue = Math.max(context.getMin(), betValue);
        clampedValue = Math.min(clampedValue, context.getMax());

        if (clampedValue > curBalance || clampedValue < context.getMin()) {
            return List.of();
        }

        return List.of(Bet.builder().type(bestBet.betType()).value(clampedValue).build());
    }

    private Optional<CalculatedKellyBet> calculateKellyFraction(SpotPrediction prediction) {
        BetType betType = BetHelper.getStraightUpBetType(prediction.spot());
        double p = prediction.probability();
        double b = betType.getPayout();
        double q = 1 - p;

        if (b <= 0) return Optional.empty();

        double kellyFraction = (b * p - q) / b;

        if (kellyFraction > 0) {
            return Optional.of(new CalculatedKellyBet(
                    betType,
                    kellyFraction * FRACTIONAL_KELLY_MULTIPLIER
            ));
        }

        return Optional.empty();
    }

    private record CalculatedKellyBet(com.traderoom.strategy.enums.BetType betType, double kellyFraction) {
    }
}