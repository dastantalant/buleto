package com.traderoom.api.sizing;

import com.traderoom.api.IStrategy;
import com.traderoom.api.model.SpotPrediction;

public class OscarsGrindSizing implements Sizing {
    @Override
    public long calculate(IStrategy strategy, SpotPrediction prediction, boolean isLastWin, long lastBet) {
        if (strategy.getVirtualBalance() >= strategy.getStartBalance()) {
            return strategy.getMinBet();
        }

        if (isLastWin) {
            long deficit = strategy.getStartBalance() - strategy.getVirtualBalance();
            long nextBet = lastBet + strategy.getMinBet();
            return Math.min(nextBet, deficit + strategy.getMinBet());
        } else {
            return Math.max(lastBet, strategy.getMinBet());
        }
    }
}