package com.traderoom.strategy.strategy.stop;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.strategy.BaseStrategy;

/**
 * Останавливает стратегию, если баланс падает ниже начального порога стоп-лосса.
 * Срабатывает только до того, как был достигнут новый максимум баланса.
 */
public class InitialStopLossCondition implements StopCondition {

    private final long initialStopLossThreshold;

    public InitialStopLossCondition(long startBalance, int stopLossPercentage) {
        if (stopLossPercentage > 0) {
            this.initialStopLossThreshold = (long) (startBalance * (1.0 - stopLossPercentage / 100.0));
        } else {
            this.initialStopLossThreshold = 0;
        }
    }

    @Override
    public boolean shouldStop(BaseStrategy strategy, Context context) {
        return initialStopLossThreshold > 0
                && strategy.getMaxBalance() <= strategy.getStartBalance()
                && strategy.getCurBalance() < initialStopLossThreshold;
    }
}