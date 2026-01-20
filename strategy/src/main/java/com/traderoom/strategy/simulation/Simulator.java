package com.traderoom.strategy.simulation;

import com.traderoom.strategy.model.context.Snapshot;

@FunctionalInterface
public interface Simulator {
    Snapshot run();
}
