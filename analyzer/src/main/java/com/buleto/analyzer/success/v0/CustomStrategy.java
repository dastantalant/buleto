package com.buleto.analyzer.success.v0;

import com.trading.roulette.api.AbstractStrategy;
import com.trading.roulette.api.Predictor;
import com.trading.roulette.api.annotation.Strategy;
import com.trading.roulette.api.model.Bet;
import com.trading.roulette.api.model.SpotPrediction;
import com.trading.roulette.api.model.config.Config;
import com.trading.roulette.api.utils.BetHelper;

import java.util.ArrayList;
import java.util.List;

@Strategy
public class CustomStrategy extends AbstractStrategy {

    private final Predictor predictor;

    public CustomStrategy(Config config) {
        this(config, 300);
    }

    public CustomStrategy(Config config, int windowSize) {
        super(config);
        predictor = CustomPredictor.createDefaultEnsemble(windowSize);
    }

    @Override
    public List<Bet> decide() {
        List<SpotPrediction> predictions = predictor.predictSpot(getState(), getConfig());
        if (predictions.isEmpty()) {
            return List.of();
        }
        List<Bet> bets = new ArrayList<>();
        long fixedBetAmount = getMinBet();
        if (fixedBetAmount <= 0 || fixedBetAmount > getVirtualBalance()) {
            return List.of();
        }
        for (SpotPrediction prediction : predictions) {
            bets.add(BetHelper.betting(prediction, fixedBetAmount));
        }
        return bets;
    }
}
