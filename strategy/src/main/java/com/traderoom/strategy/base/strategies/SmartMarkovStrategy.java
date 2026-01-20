package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.predictor.Predictor;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.predictor.MultiOrderMarkovPredictor;
import com.traderoom.strategy.base.AbstractStrategy;
import com.traderoom.strategy.utils.BetHelper;

import java.util.List;

@AStrategy
public class SmartMarkovStrategy extends AbstractStrategy {
    private final Predictor predictor;
    private final double min;

    public SmartMarkovStrategy(Config config) {
        super(config);
        predictor = new MultiOrderMarkovPredictor();
        min = 0.05;
    }

    @Override
    public List<Bet> decide(State state) {
        return predictor.getNextSpot(state, getConfig()).stream()
                .filter(prediction -> prediction.probability() > min)
                .limit(3)
                .map(prediction -> Bet.of(BetHelper.getStraightUp(prediction.spot()), getConfig().minBet()))
                .toList();
    }
}