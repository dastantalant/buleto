package com.traderoom.strategy.stop;

import com.traderoom.strategy.api.Metric;
import com.traderoom.strategy.model.context.State;

import java.io.Serializable;

@FunctionalInterface
public interface StopCondition extends Serializable {
    boolean should(Metric metric, State state);
}