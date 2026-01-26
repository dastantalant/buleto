package com.traderoom.strategy.base.strategies.kelly;

import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.base.AbstractStrategy;
import com.traderoom.strategy.predictor.Predictor;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.utils.BetHelper;

import java.util.Optional;

@AStrategy
public abstract class AbstractKellyCriterionStrategy extends AbstractStrategy {
    protected final double kelly;
    protected final double maxBetPercentageCap;
    protected final double minProbabilityThreshold;
    protected final Predictor predictor;

    protected AbstractKellyCriterionStrategy(Config config) {
        this(config, KellyContext.of());
    }

    protected AbstractKellyCriterionStrategy(Config config, KellyContext kContext) {
        super(config);
        kelly = kContext.getKelly();
        maxBetPercentageCap = kContext.getMaxBetPercentageCap();
        minProbabilityThreshold = kContext.getMinProbabilityThreshold();
        predictor = kContext.getPredictor();
    }

    protected Optional<KellyBet> calculateKellyFraction(SpotPrediction prediction, double kelly) {
        BetType type = BetHelper.getStraightUp(prediction.spot());
        double prob = prediction.probability();
        double payout = type.getPayout();
        if (payout > 0) {
            double kellyFraction = (payout * prob - (1 - prob)) / payout;
            if (kellyFraction > 0) {
                return Optional.of(KellyBet.of(type, kellyFraction * kelly));
            }
        }
        return Optional.empty();
    }
}
