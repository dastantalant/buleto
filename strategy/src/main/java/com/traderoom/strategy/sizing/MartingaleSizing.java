package com.traderoom.strategy.sizing;

import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.model.SpotPrediction;

public class MartingaleSizing implements Sizing {
    public static MartingaleSizing of() {
        return new MartingaleSizing();
    }

    @Override
    public long calculate(State state, boolean isLastWin, long lastBet, SpotPrediction prediction, Config config) {
        return isLastWin || lastBet == 0 ? config.minBet() : Math.min(lastBet * 2, config.maxBet());
    }
}