package com.buleto.analyzer.success.v6_final;

import com.trading.roulette.api.AbstractStrategy;
import com.trading.roulette.api.Predictor;
import com.trading.roulette.api.annotation.Strategy;
import com.trading.roulette.api.model.Bet;
import com.trading.roulette.api.model.SpotPrediction;
import com.trading.roulette.api.model.config.Config;
import com.trading.roulette.api.utils.BetHelper;

import java.util.List;

@Strategy
public class FrequencyPatternStrategy extends AbstractStrategy {

    private final Predictor predictor;
    private final int limitBet;

    public FrequencyPatternStrategy(Config config, Predictor predictor, int limitBet) {
        super(config);
        this.predictor = predictor;
        this.limitBet = limitBet;
    }

    public FrequencyPatternStrategy(Config config, int windowSize, int limitBet) {
        super(config);
        this.limitBet = limitBet;
        predictor = new FrequencyPatternPredictor(windowSize, limitBet);
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
