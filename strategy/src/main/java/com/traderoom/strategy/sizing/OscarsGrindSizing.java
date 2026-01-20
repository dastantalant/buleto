package com.traderoom.strategy.sizing;

import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;

public class OscarsGrindSizing implements Sizing {
    @Override
    public long calculate(State state, boolean isLastWin, long lastBet, SpotPrediction prediction, Config config) {
        if (state.getBalance() >= config.startBalance()) {
            return config.minBet();
        }

        if (isLastWin) {
            long deficit = config.startBalance() - state.getBalance();
            long nextBet = lastBet + config.minBet();
            return Math.min(nextBet, deficit + config.minBet());
        } else {
            return Math.max(lastBet, config.minBet());
        }
    }
}