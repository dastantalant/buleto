package com.traderoom.strategy.runner;

import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.context.Snapshot;
import com.traderoom.strategy.model.context.State;

public interface IRunner {

    Snapshot apply(Spot spot);

    Snapshot snapshot();

    boolean canContinue();

    boolean isLastApplied();

    State getState();

    Snapshot stop();

    boolean isStopped();
}
