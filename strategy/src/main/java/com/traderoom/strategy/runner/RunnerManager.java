package com.traderoom.strategy.runner;

import com.traderoom.strategy.IStrategy;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.StrategyFactory;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.Snapshot;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

public interface RunnerManager extends Serializable {

    static RunnerManager of() {
        return new BetRunnerManager();
    }

    static RunnerManager of(List<IRunner> strategies) {
        return new BetRunnerManager(strategies);
    }

    static RunnerManager from(List<IStrategy> strategies) {
        List<IRunner> list = new ArrayList<>(strategies.size());
        for (IStrategy strategy : strategies) {
            list.add(IRunner.of(strategy));
        }
        return new BetRunnerManager(list);
    }

    static RunnerManager from(Config config, List<Class<IStrategy>> classes) {
        StrategyFactory factory = StrategyFactory.getInstance();
        List<IRunner> list = classes.stream()
                .map(clazz -> factory.create(clazz, config))
                .map(IRunner::of)
                .toList();
        return new BetRunnerManager(list);
    }

    Map<IRunner, Snapshot> apply(Spot spot);

    Map<IRunner, Snapshot> snapshot();

    boolean canContinue();

    boolean allIsLive();

    Set<IRunner> all();

    List<IRunner> add(List<IRunner> strategies);

    IRunner add(IRunner strategy);

    IRunner disable(IRunner strategy);

    boolean exists(IRunner strategy);

    boolean remove(IRunner strategy);

}
