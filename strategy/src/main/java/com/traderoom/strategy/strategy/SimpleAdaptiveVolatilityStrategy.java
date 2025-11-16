package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;

import java.util.Collections;
import java.util.List;
import java.util.LongSummaryStatistics;

public class SimpleAdaptiveVolatilityStrategy extends BaseStrategy {

    private static final BetType TYPE = BetType.RED;
    private static final double LOW_VOLATILITY_THRESHOLD_PERCENT = 0.05;

    public SimpleAdaptiveVolatilityStrategy(Context context) {
        super(context);
    }

    @Override
    public String getName() {
        return SimpleAdaptiveVolatilityStrategy.class.getSimpleName();
    }

    @Override
    protected List<Bet> getNextInternal(Context context) {
        if (historyBalance.isEmpty()) {
            return createBet(context.getMin(), context);
        }

        LongSummaryStatistics stats = historyBalance.stream()
                .mapToLong(Long::longValue)
                .summaryStatistics();

        long balanceRange = stats.getMax() - stats.getMin();
        double lowVolatilityThreshold = startBalance * LOW_VOLATILITY_THRESHOLD_PERCENT;

        if (balanceRange < lowVolatilityThreshold) {
            return createBet(context.getMin(), context);
        } else if (curBalance > stats.getAverage()) {
            long nextBetValue = wasLastBetWon(context) ? getLastTotalBetValue() * 2 : context.getMin();
            return createBet(nextBetValue, context);
        } else {
            return createBet(context.getMin(), context);
        }
    }

    private List<Bet> createBet(long value, Context context) {
        long safeValue = Math.max(context.getMin(), value);
        safeValue = Math.min(safeValue, context.getMax());
        safeValue = Math.min(safeValue, curBalance);

        if (safeValue < context.getMin()) {
            return Collections.emptyList();
        }

        return Collections.singletonList(Bet.builder().type(TYPE).value(safeValue).build());
    }
}