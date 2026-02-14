package com.traderoom.api.sizing;

import com.traderoom.api.IStrategy;
import com.traderoom.api.enums.Constants;
import com.traderoom.api.model.SpotPrediction;

public class KellySizing implements Sizing {
    private static final double FRACTION = Constants.KELLY_FRACTION_DEFAULT;

    public static KellySizing of() {
        return new KellySizing();
    }

    @Override
    public long calculate(IStrategy strategy, SpotPrediction prediction, boolean isLastWin, long lastBet) {
        double p = prediction.probability();
        double b = 35.0;

        double q = 1.0 - p;
        double f = (b * p - q) / b;

        if (f <= 0) return 0;

        long bankroll = strategy.getStartBalance();
        long bet = (long) (bankroll * f * FRACTION);
        return Math.clamp(bet, strategy.getMinBet(), strategy.getMaxBet());
    }
}