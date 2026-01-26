package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.predictor.Predictor;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.predictor.MultiOrderMarkovPredictor;
import com.traderoom.strategy.base.AbstractStrategy;

import java.util.List;

@AStrategy
public class MultiBetStrategy extends AbstractStrategy {

    private final Predictor predictor;

    public MultiBetStrategy(Config config) {
        super(config);
        predictor = new MultiOrderMarkovPredictor();
    }

    @Override
    public List<Bet> decide(State state) {
        final long limit = Math.min(Math.max(getBalance(), getConfig().startBalance()) / 10, getConfig().maxBet());
        return predictor.getNextType(state, getConfig()).stream()
                .filter(pred -> pred.probability() > 0.3)
                .map(pred -> Bet.of(pred.type(), Math.max(getConfig().minBet(), (long) (limit * pred.probability()))))
                .toList();
    }
}