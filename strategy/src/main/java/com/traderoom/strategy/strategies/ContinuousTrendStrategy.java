package com.traderoom.strategy.strategies;


import com.traderoom.api.AbstractStrategy;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.enums.BetType;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.SpotPrediction;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.Predictor;
import com.traderoom.strategy.predictor.SlidingWindowFreqPredictor;

import java.util.Collections;
import java.util.List;

@Strategy(tags = {Tag.STATISTICAL, Tag.PROGRESSIVE})
public class ContinuousTrendStrategy extends AbstractStrategy {

    private final Predictor predictor;
    private final double betThreshold = 0.035;
    private final int spotsToBet = 3;

    public ContinuousTrendStrategy(Config config) {
        super(config);
        predictor = new SlidingWindowFreqPredictor(2048);
    }

    @Override
    public List<Bet> decide() {
        List<SpotPrediction> predictions = predictor.predictSpot(getState(), getConfig());

        if (predictions.isEmpty()) {
            return Collections.emptyList();
        }

        if (predictions.size() < spotsToBet) {
            return Collections.emptyList();
        }

        return predictions.stream()
                .limit(spotsToBet)
//                .filter(p -> p.probability() > betThreshold)
                .map(p -> Bet.of(BetType.getStraightUpBetFor(p.spot()), getMinBet()))
                .toList();
    }
}
