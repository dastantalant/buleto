package com.traderoom.strategy.strategies;

import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.Predictor;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.config.Config;
import com.traderoom.strategy.predictor.MultiOrderMarkovPredictor;
import com.traderoom.api.AbstractStrategy;
import com.traderoom.api.utils.BetHelper;

import java.util.List;

@Strategy(tags = {Tag.PREDICTIVE})
public class SmartMarkovStrategy extends AbstractStrategy {
    private final Predictor predictor;
    private final double min;

    public SmartMarkovStrategy(Config config) {
        super(config);
        predictor = new MultiOrderMarkovPredictor();
        min = 0.05;
    }

    @Override
    public List<Bet> decide() {
        return predictor.predictSpot(getState(), getConfig()).stream()
                .filter(prediction -> prediction.probability() > min)
                .limit(3)
                .map(prediction -> Bet.of(BetHelper.getStraightUp(prediction.spot()), getMinBet()))
                .toList();
    }
}