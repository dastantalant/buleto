package com.traderoom.strategy.strategies;

import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.Predictor;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.model.SpotPrediction;
import com.traderoom.strategy.predictor.EfficientCountPredictor;
import com.traderoom.api.AbstractStrategy;
import com.traderoom.api.utils.BetHelper;

import java.util.List;

@Strategy
public class StraightUpStrategy2 extends AbstractStrategy {

    private final Predictor predictor;
    private final double probability;
    private final double fraction;


    public StraightUpStrategy2(Config config) {
        super(config);
        predictor = new EfficientCountPredictor();
        probability = 0.03;
        fraction = 0.1;
    }

    @Override
    public List<Bet> decide() {
        long limit = (long) (Math.max(getVirtualBalance(), getConfig().startBalance()) * fraction);
        List<SpotPrediction> predictions = predictor.predictSpot(getState(), getConfig());

        return predictions.stream()
                .filter(item -> item.probability() > probability)
                .map(item -> Bet.of(BetHelper.straightUp(item.spot()),
                        Math.max(getMinBet(), (long) (limit * item.probability()))))
                .toList();
    }
}