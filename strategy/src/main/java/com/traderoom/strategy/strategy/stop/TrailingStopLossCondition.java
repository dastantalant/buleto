package com.traderoom.strategy.strategy.stop;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.strategy.BaseStrategy;

/**
 * Останавливает стратегию, если баланс падает ниже определенного процента от максимального достигнутого баланса (трейлинг-стоп).
 * Срабатывает только после того, как был достигнут новый максимум баланса.
 */
public class TrailingStopLossCondition implements StopCondition {

    private final double trailingStopPercentage;

    public TrailingStopLossCondition(int trailingStopPercentage) {
        this.trailingStopPercentage = trailingStopPercentage / 100.0;
    }

    @Override
    public boolean shouldStop(BaseStrategy strategy, Context context) {
        if (trailingStopPercentage > 0 && strategy.getMaxBalance() > strategy.getStartBalance()) {
            long trailingStopThreshold = (long) (strategy.getMaxBalance() * (1.0 - trailingStopPercentage));
            return strategy.getCurBalance() < trailingStopThreshold;
        }
        return false;
    }
}