package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.predictor.MultiOrderMarkovPredictor;
import com.traderoom.strategy.predictor.Predictor;
import com.traderoom.strategy.base.AbstractStrategy;
import com.traderoom.strategy.utils.BetHelper;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@AStrategy
public class StraightUpStrategy extends AbstractStrategy {

    private final Predictor predictor;

    public StraightUpStrategy(Config config) {
        super(config);
        predictor = new MultiOrderMarkovPredictor();
    }

    @Override
    public List<Bet> decide(State state) {
        Optional<SpotPrediction> optional = predictor.getNextSpot(state, getConfig()).stream()
                .max(Comparator.comparingDouble(SpotPrediction::probability));
        if (optional.isEmpty()) {
            return List.of();
        }
        Spot spot = optional.get().spot();
        return Bet.list(BetHelper.getStraightUp(spot), getConfig().minBet());
    }
}