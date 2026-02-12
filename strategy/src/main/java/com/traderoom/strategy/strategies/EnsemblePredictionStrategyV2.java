package com.traderoom.strategy.strategies;

import com.traderoom.api.AbstractStrategy;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.SpotPrediction;
import com.traderoom.api.model.config.Config;
import com.traderoom.strategy.predictor.EnsemblePredictorV3;
import com.traderoom.api.Predictor;
import com.traderoom.api.utils.BetHelper;

import java.util.ArrayList;
import java.util.List;

@Strategy(tags = {Tag.PREDICTIVE, Tag.HYBRID, Tag.AI})
public class EnsemblePredictionStrategyV2 extends AbstractStrategy {

    private final Predictor predictor;

    public EnsemblePredictionStrategyV2(Config config) {
        this(config, 300);
    }

    public EnsemblePredictionStrategyV2(Config config, int windowSize) {
        super(config);
        predictor = EnsemblePredictorV3.createDefaultEnsemble(windowSize);
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