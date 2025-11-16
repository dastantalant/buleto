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
import java.util.Optional;

/**
 * Стратегия, использующая Критерий Келли для определения оптимального размера ставки.
 * Размер ставки зависит от вероятности выигрыша и коэффициента выплаты,
 * что позволяет максимизировать долгосрочный рост капитала.
 */
public class KellyCriterionStrategy extends BaseStrategy {

    /**
     * Множитель для "дробного" Келли. 1.0 - полный Келли (очень рискованно).
     * Значения 0.25 - 0.5 являются более безопасными.
     */
    private static final double FRACTIONAL_KELLY_MULTIPLIER = 0.3;
    private final Predictor predictor;
    private final boolean isReady;

    public KellyCriterionStrategy(Context context, Optional<MultiLayerNetwork> rnnModelOpt) {
        super(context);
        isReady = rnnModelOpt.isPresent();
        predictor = rnnModelOpt
                .map(net -> new RnnPredictor(net, context.getRouletteType()))
                .orElse(null);
    }

    @Override
    public String getName() {
        return KellyCriterionStrategy.class.getSimpleName();
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

        long clampedValue = Math.max(context.getMin(), betValue);
        clampedValue = Math.min(clampedValue, context.getMax());

        if (clampedValue > curBalance || clampedValue < context.getMin()) {
            return List.of();
        }

        return List.of(Bet.builder().type(bestBet.betType()).value(clampedValue).build());
    }

    private Optional<CalculatedKellyBet> calculateKellyFraction(SpotPrediction prediction) {
        var betType = BetHelper.getStraightUpBetType(prediction.spot());
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