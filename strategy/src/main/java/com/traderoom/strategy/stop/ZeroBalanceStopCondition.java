package com.traderoom.strategy.stop;

import com.traderoom.strategy.api.Metric;
import com.traderoom.strategy.model.context.State;

import java.util.Optional;

public class ZeroBalanceStopCondition implements StopCondition {

    public static StopCondition of() {
        return new ZeroBalanceStopCondition();
    }

    public static Optional<StopCondition> createIfEnabled(Long balance, StopConditionConfig config) {
        return Optional.of(of());
    }

    @Override
    public boolean should(Metric metric, State state) {
        return state.getBalance() <= 0;
    }
}