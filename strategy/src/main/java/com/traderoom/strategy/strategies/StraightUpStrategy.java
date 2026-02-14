package com.traderoom.strategy.strategies;

import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.SpotPrediction;
import com.traderoom.strategy.predictor.MultiOrderMarkovPredictor;
import com.traderoom.api.Predictor;
import com.traderoom.api.AbstractStrategy;
import com.traderoom.api.utils.BetHelper;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Strategy(tags = {Tag.PREDICTIVE})
public class StraightUpStrategy extends AbstractStrategy {

    private final Predictor predictor;

    public StraightUpStrategy(Config config) {
        super(config);
        predictor = new MultiOrderMarkovPredictor();
    }

    @Override
    public List<Bet> decide() {
        Optional<SpotPrediction> optional = predictor.predictSpot(getState(), getConfig()).stream()
                .max(Comparator.comparingDouble(SpotPrediction::probability));
        if (optional.isEmpty()) {
            return List.of();
        }
        Spot spot = optional.get().spot();
        return Bet.list(BetHelper.straightUp(spot), getMinBet());
    }
}