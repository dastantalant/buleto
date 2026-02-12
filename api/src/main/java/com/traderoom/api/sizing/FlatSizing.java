package com.traderoom.api.sizing;

import com.traderoom.api.IStrategy;
import com.traderoom.api.model.SpotPrediction;

public class FlatSizing implements Sizing {
    @Override
    public long calculate(IStrategy strategy, SpotPrediction prediction, boolean isLastWin, long lastBet) {
        return strategy.getMinBet();
    }
}