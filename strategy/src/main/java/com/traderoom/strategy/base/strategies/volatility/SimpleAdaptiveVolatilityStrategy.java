package com.traderoom.strategy.base.strategies.volatility;

import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;

import java.util.List;
import java.util.LongSummaryStatistics;

@AStrategy
public class SimpleAdaptiveVolatilityStrategy extends AbstractVolatilityStrategy {

    private final double lowVolatilityThresholdPercent;

    public SimpleAdaptiveVolatilityStrategy(Config config) {
        super(config);
        lowVolatilityThresholdPercent = 0.05;
    }

    @Override
    public List<Bet> decide(State state) {
        var historyBalance = getHistoryBalance();
        if (historyBalance.isEmpty()) {
            return create(type, getConfig().minBet(), state);
        }

        LongSummaryStatistics stats = historyBalance.stream()
                .mapToLong(Long::longValue)
                .summaryStatistics();

        long range = stats.getMax() - stats.getMin();
        double multi = getStartBalance() * lowVolatilityThresholdPercent;

        if (range < multi) {
            return create(type, getConfig().minBet(), state);
        } else if (getBalance() > stats.getAverage()) {
            long nextBetValue = isLastBetWon(state) ? getLastBet() * 2 : getConfig().minBet();
            return create(type, nextBetValue, state);
        }
        return create(type, getConfig().minBet(), state);
    }
}