package com.traderoom.analyzer.success.v4;

import com.traderoom.api.AbstractStrategy;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.SpotPrediction;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.utils.BetHelper;

import java.util.List;

import static com.traderoom.api.enums.RouletteType.EUROPEAN;

public class StrategyTest extends AbstractStrategy {
    private final PredictorTest predictor;
    private final int limitBet;
    private final int windowSize;

    protected StrategyTest(Config config, int limitBet, int windowSize) {
        super(config);
        this.limitBet = limitBet;
        this.windowSize = windowSize;
        predictor = new EnsemblePredictor();
    }

    @Override
    public List<Bet> decide() {
        List<SpotPrediction> predictions = predictor.predict(getMarket().getHistory(), EUROPEAN, windowSize);
        if (predictions.isEmpty()) return List.of();
        long fixedBetAmount = getMinBet();
        if (fixedBetAmount <= 0 || fixedBetAmount > getVirtualBalance()) return List.of();
        return predictions.stream()
                .limit(limitBet)
                .map(prediction -> BetHelper.betting(prediction, fixedBetAmount))
                .toList();
    }
}
