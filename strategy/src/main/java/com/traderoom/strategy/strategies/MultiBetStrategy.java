package com.traderoom.strategy.strategies;

import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.Predictor;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.config.Config;
import com.traderoom.strategy.predictor.MultiOrderMarkovPredictor;
import com.traderoom.api.AbstractStrategy;

import java.util.List;

@Strategy(tags = {Tag.PREDICTIVE})
public class MultiBetStrategy extends AbstractStrategy {

    private final Predictor predictor;

    public MultiBetStrategy(Config config) {
        super(config);
        predictor = new MultiOrderMarkovPredictor();
    }

    @Override
    public List<Bet> decide() {
        final long limit = Math.min(Math.max(getVirtualBalance(), getConfig().startBalance()) / 10, getMaxBet());
        return predictor.predictType(getState(), getConfig()).stream()
                .filter(pred -> pred.probability() > 0.3)
                .map(pred -> Bet.of(pred.type(), Math.max(getMinBet(), (long) (limit * pred.probability()))))
                .toList();
    }
}