package com.traderoom.strategy.runner;

import com.traderoom.strategy.api.IStrategy;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.context.Snapshot;

import java.util.List;
import java.util.Map;

public interface RunnerManager {

    Map<IRunner, Snapshot> apply(Spot spot);

    Map<IRunner, Snapshot> snapshot();

    boolean canContinue();

    boolean allLive();

    List<IRunner> all();

    List<IRunner> add(List<IRunner> strategies);

    IRunner add(IRunner strategy);

    IRunner disable(IRunner strategy);

    boolean exists(IRunner strategy);

    boolean remove(IRunner strategy);

}
