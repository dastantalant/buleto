package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.predictor.EnsemblePredictor;
import com.traderoom.strategy.predictor.Predictor;
import com.traderoom.strategy.base.AbstractStrategy;
import com.traderoom.strategy.utils.BetHelper;

import java.util.ArrayList;
import java.util.List;

@AStrategy
public class EnsemblePredictionStrategy extends AbstractStrategy {

    private final Predictor predictor;
    private final double probabilityThreshold;
    private final double budgetAllocationPerSpot;
    private final int limit;

    public EnsemblePredictionStrategy(Config config) {
        super(config);
        predictor = EnsemblePredictor.createDefaultEnsemble();
        probabilityThreshold = 0.15;
        budgetAllocationPerSpot = 0.01;
        limit = 5;
    }

    public static EnsemblePredictionStrategy of(Config config) {
        return new EnsemblePredictionStrategy(config);
    }

    @Override
    public List<Bet> decide(State state) {
        List<SpotPrediction> predictions = predictor.getNextSpot(state, getConfig());
        if (predictions.isEmpty()) {
            return List.of();
        }

        List<Bet> result = new ArrayList<>(limit);
        for (SpotPrediction prediction : predictions) {
            boolean eligible = prediction.probability() >= probabilityThreshold;
            if (eligible) {
                long betValue = (long) (getBalance() * budgetAllocationPerSpot * prediction.probability() * 10);
                long safeBetValue = Math.clamp(betValue, getConfig().minBet(), getConfig().maxBet());
                eligible = safeBetValue > 0 && safeBetValue <= getBalance();
                if (eligible) {
                    result.add(Bet.of(BetHelper.getStraightUp(prediction.spot()), safeBetValue));
                }
            }
            if (result.size() == limit) {
                break;
            }
        }
        return result;
    }
}