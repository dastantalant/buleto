package com.traderoom.strategy.sizing;

import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.model.SpotPrediction;

public class KellySizing implements Sizing {
    private static final double FRACTION = 0.25;

    public static KellySizing of() {
        return new KellySizing();
    }

    @Override
    public long calculate(State state, boolean isLastWin, long lastBet, SpotPrediction prediction, Config config) {
        double p = prediction.probability();
        double b = 35.0;

        double q = 1.0 - p;
        double f = (b * p - q) / b;

        if (f <= 0) return 0;

        long bankroll = config.startBalance();
        long bet = (long) (bankroll * f * FRACTION);
        return Math.clamp(bet, config.minBet(), config.maxBet());
    }
}