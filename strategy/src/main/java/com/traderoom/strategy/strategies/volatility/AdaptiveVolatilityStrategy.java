package com.traderoom.strategy.strategies.volatility;

import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.config.Config;

import java.util.List;
import java.util.LongSummaryStatistics;

@Strategy(tags = {Tag.STATISTICAL})
public class AdaptiveVolatilityStrategy extends AbstractVolatilityStrategy {

    private final int historyWindowSize;
    private final double lowVolatilityThresholdPercent;
    private final double reverseMartingaleMultiplier;

    public AdaptiveVolatilityStrategy(Config config) {
        super(config);
        historyWindowSize = 20;
        lowVolatilityThresholdPercent = 0.10;
        reverseMartingaleMultiplier = 2.0;
    }

    @Override
    public List<Bet> decide() {
        var historyBalance = getHistoryBalance();
        if (historyBalance.size() < historyWindowSize) {
            return create(type, getMinBet());
        }

        LongSummaryStatistics stats = historyBalance.stream()
                .mapToLong(Long::longValue)
                .summaryStatistics();

        long balanceRange = stats.getMax() - stats.getMin();
        double lowVolatilityThreshold = getStartBalance() * lowVolatilityThresholdPercent;

        if (balanceRange < lowVolatilityThreshold) {
            return create(type, getMinBet());
        }

        if (isLastBetWon() && getVirtualBalance() > stats.getAverage()) {
            long nextBetValue = (long) (getLastBet() * reverseMartingaleMultiplier);
            return create(type, nextBetValue);
        }

        return create(type, getMinBet());
    }
}