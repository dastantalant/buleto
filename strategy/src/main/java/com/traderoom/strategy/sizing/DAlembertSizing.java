package com.traderoom.strategy.sizing;

import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.model.SpotPrediction;

public class DAlembertSizing implements Sizing {

    public static DAlembertSizing of() {
        return new DAlembertSizing();
    }

    @Override
    public long calculate(State state, boolean isLastWin, long lastBet, SpotPrediction prediction, Config config) {
        long min = config.minBet();
        long max = config.maxBet();

        if (lastBet == 0) {
            return min;
        }

        long nextBet;

        if (isLastWin) {
            nextBet = lastBet - min;
            if (nextBet < min) {
                nextBet = min;
            }
        } else {
            nextBet = lastBet + min;
        }

        return Math.min(nextBet, max);
    }
}