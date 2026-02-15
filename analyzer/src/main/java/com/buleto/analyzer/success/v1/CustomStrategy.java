package com.buleto.analyzer.success.v1;

import com.trading.roulette.api.AbstractStrategy;
import com.trading.roulette.api.Predictor;
import com.trading.roulette.api.annotation.Strategy;
import com.trading.roulette.api.model.Bet;
import com.trading.roulette.api.model.SpotPrediction;
import com.trading.roulette.api.model.config.Config;
import com.trading.roulette.api.utils.BetHelper;

import java.util.List;

@Strategy
public class CustomStrategy extends AbstractStrategy {

    private final Predictor predictor;
    private final int limitBet;

    public CustomStrategy(Config config) {
        this(config, 960);
    }

    public CustomStrategy(Config config, int windowSize) {
        this(config, CustomPredictor.createDefaultEnsemble(windowSize));
    }

    public CustomStrategy(Config config, Predictor predictor) {
        this(config, predictor, 34);
    }

    public CustomStrategy(Config config, Predictor predictor, int limitBet) {
        super(config);
        this.predictor = predictor;
        this.limitBet = limitBet;
    }

    public CustomStrategy(Config config, int windowSize, int limitBet) {
        super(config);
        predictor = CustomPredictor.createDefaultEnsemble(windowSize);
        this.limitBet = limitBet;
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
