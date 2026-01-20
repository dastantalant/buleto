package com.traderoom.strategy.base.strategies.volatility;

import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;

import java.util.List;
import java.util.LongSummaryStatistics;

@AStrategy
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
    public List<Bet> decide(State state) {
        var historyBalance = getHistoryBalance();
        if (historyBalance.size() < historyWindowSize) {
            return create(type, getConfig().minBet(), state);
        }

        LongSummaryStatistics stats = historyBalance.stream()
                .mapToLong(Long::longValue)
                .summaryStatistics();

        long balanceRange = stats.getMax() - stats.getMin();
        double lowVolatilityThreshold = getStartBalance() * lowVolatilityThresholdPercent;

        if (balanceRange < lowVolatilityThreshold) {
            return create(type, getConfig().minBet(), state);
        }

        if (isLastBetWon(state) && getBalance() > stats.getAverage()) {
            long nextBetValue = (long) (getLastBet() * reverseMartingaleMultiplier);
            return create(type, nextBetValue, state);
        }

        return create(type, getConfig().minBet(), state);
    }
}