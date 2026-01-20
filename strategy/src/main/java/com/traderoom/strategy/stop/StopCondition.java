package com.traderoom.strategy.stop;

import com.traderoom.strategy.api.Metric;
import com.traderoom.strategy.model.context.State;

@FunctionalInterface
public interface StopCondition {
    boolean should(Metric metric, State state);
}