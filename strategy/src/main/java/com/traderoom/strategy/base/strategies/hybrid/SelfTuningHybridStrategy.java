package com.traderoom.strategy.base.strategies.hybrid;

import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.model.SpotPrediction;

import java.util.List;

@AStrategy
public class SelfTuningHybridStrategy extends AbstractHybridPredictorStrategy {

    public SelfTuningHybridStrategy(Config config) {
        super(config);
    }

    @Override
    public List<Bet> decide(State state) {
        if (state.getMarketData().getCurrentLoopCount() > 0 && state.getMarketData().getCurrentLoopCount() % window == 0 && getBetCount() > 0) {
            adjustParameters();
        }

        List<SpotPrediction> top = getTop(state, markov, count, dynamicConfidence);
        if (top.isEmpty()) return List.of();
        long budget = (long) (getBalance() * dynamicFraction);
        return process(state, top, budget);
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
        setWonCount(0);
        setLostCount(0);
        setBetCount(0);
    }
}