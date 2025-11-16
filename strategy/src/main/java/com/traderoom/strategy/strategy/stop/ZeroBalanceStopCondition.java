package com.traderoom.strategy.strategy.stop;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.strategy.BaseStrategy;

/**
 * Останавливает стратегию, если баланс достиг нуля или стал отрицательным.
 */
public class ZeroBalanceStopCondition implements StopCondition {

    @Override
    public boolean shouldStop(BaseStrategy strategy, Context context) {
        return strategy.getCurBalance() <= 0;
    }
}