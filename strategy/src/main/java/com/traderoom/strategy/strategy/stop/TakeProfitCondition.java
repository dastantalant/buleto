package com.traderoom.strategy.strategy.stop;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.strategy.BaseStrategy;

/**
 * Останавливает стратегию при достижении заданного процента прибыли от начального баланса.
 */
public class TakeProfitCondition implements StopCondition {

    private final long takeProfitThreshold;

    /**
     * @param startBalance     Начальный баланс.
     * @param profitPercentage Процент прибыли для остановки (например, 50 для 50%).
     */
    public TakeProfitCondition(long startBalance, int profitPercentage) {
        takeProfitThreshold = profitPercentage > 0 ? (long) (startBalance * (1.0 + profitPercentage / 100.0)): 0;
    }

    @Override
    public boolean shouldStop(BaseStrategy strategy, Context context) {
        return takeProfitThreshold > 0 && strategy.getCurBalance() >= takeProfitThreshold;
    }
}