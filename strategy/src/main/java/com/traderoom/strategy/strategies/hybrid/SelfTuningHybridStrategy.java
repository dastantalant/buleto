package com.traderoom.strategy.strategies.hybrid;

import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.model.SpotPrediction;

import java.util.List;

@Strategy(tags = {Tag.HYBRID})
public class SelfTuningHybridStrategy extends AbstractHybridPredictorStrategy {

    public SelfTuningHybridStrategy(Config config) {
        super(config);
    }

    @Override
    public List<Bet> decide() {
        if (getState().getMarket().getCurrentLoopCount() > 0 && getState().getMarket().getCurrentLoopCount() % window == 0 && getBetCount() > 0) {
            adjustParameters();
        }

        List<SpotPrediction> top = getTop( markov, count, dynamicConfidence);
        if (top.isEmpty()) return List.of();
        long budget = (long) (getVirtualBalance() * dynamicFraction);
        return process( top, budget);
    }

    private void adjustParameters() {
        double average = getAverage();
        if (average < lowWinRate) {
            dynamicConfidence = Math.min(confidence * 1.25, 0.15);
            dynamicFraction = Math.max(fraction * 0.5, 0.01);
        } else if (average > highWinRate) {
            dynamicConfidence = Math.max(confidence * 0.9, 0.05);
            dynamicFraction = Math.min(fraction * 1.1, 0.075);
        } else {
            if (dynamicConfidence != confidence || dynamicFraction != fraction) {
                dynamicConfidence = confidence;
                dynamicFraction = fraction;
            }
        }
        resetCount();
    }
}