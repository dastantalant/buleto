package com.traderoom.analyzer.success.v3;

import com.traderoom.api.AbstractStrategy;
import com.traderoom.api.Predictor;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.SpotPrediction;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.utils.BetHelper;

import java.util.List;

@Strategy
public class CustomStrategy extends AbstractStrategy {

    private final Predictor predictor;
    private final int limitBet;

    public CustomStrategy(Config config, Predictor predictor, int limitBet) {
        super(config);
        this.predictor = predictor;
        this.limitBet = limitBet;
    }

    public CustomStrategy(Config config, int windowSize, int limitBet) {
        super(config);
        this.limitBet = limitBet;
        predictor = new CustomPredictor(windowSize, limitBet);
    }

    @Override
    public List<Bet> decide() {
        List<SpotPrediction> predictions = predictor.predictSpot(getState(), getConfig());
        if (predictions.isEmpty()) {
            return List.of();
        }
        long fixedBetAmount = getMinBet();
        if (fixedBetAmount <= 0 || fixedBetAmount > getVirtualBalance()) {
            return List.of();
        }
        return predictions.stream()
                .limit(limitBet)
                .map(prediction->BetHelper.betting(prediction, fixedBetAmount))
                .toList();
    }
}
