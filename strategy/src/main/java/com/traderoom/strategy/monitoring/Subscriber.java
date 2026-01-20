package com.traderoom.strategy.monitoring;

import com.traderoom.strategy.model.context.Snapshot;

public interface Subscriber {
    void onRound(Snapshot snapshot);

    default void onGameEnd(Snapshot snapshot) {
    }
}