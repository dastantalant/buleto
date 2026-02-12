package com.traderoom.api.sizing;

import com.traderoom.api.IStrategy;
import com.traderoom.api.model.SpotPrediction;

public class MartingaleSizing implements Sizing {
    public static MartingaleSizing of() {
        return new MartingaleSizing();
    }

    @Override
    public long calculate(IStrategy strategy, SpotPrediction prediction, boolean isLastWin, long lastBet) {
        return isLastWin || lastBet == 0 ? strategy.getMinBet() : Math.min(lastBet * 2, strategy.getMaxBet());
    }
}