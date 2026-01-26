package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.predictor.Predictor;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.predictor.EfficientCountPredictor;
import com.traderoom.strategy.base.AbstractStrategy;
import com.traderoom.strategy.utils.BetHelper;

import java.util.List;

@AStrategy
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
    public List<Bet> decide(State state) {
        long limit = (long) (Math.max(getBalance(), getConfig().startBalance()) * fraction);
        List<SpotPrediction> predictions = predictor.getNextSpot(state, getConfig());

        return predictions.stream()
                .filter(item -> item.probability() > probability)
                .map(item -> Bet.of(BetHelper.getStraightUp(item.spot()),
                        Math.max(getConfig().minBet(), (long) (limit * item.probability()))))
                .toList();
    }
}