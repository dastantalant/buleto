package com.traderoom.strategy.runner;

import com.traderoom.strategy.api.IStrategy;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.context.Snapshot;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class BetRunnerManager implements RunnerManager {
    private final Map<IRunner, Boolean> activeStrategies;
    private final Map<IRunner, Snapshot> lastSnapshots;

    public BetRunnerManager() {
        this(new ArrayList<>());
    }

    public BetRunnerManager(List<IRunner> strategies) {
        activeStrategies = new ConcurrentHashMap<>();
        lastSnapshots = new ConcurrentHashMap<>();
        for (IRunner runner : strategies) {
            add(runner);
        }
    }

    public static BetRunnerManager of() {
        return new BetRunnerManager();
    }

    public static BetRunnerManager of(List<IRunner> strategies) {
        return new BetRunnerManager(strategies);
    }

    public static BetRunnerManager from(List<IStrategy> strategies) {
        List<IRunner> list = new ArrayList<>(strategies.size());
        for (IStrategy strategy : strategies) {
            list.add(BetRunner.of(strategy));
        }
        return new BetRunnerManager(list);
    }


    @Override
    public Map<IRunner, Snapshot> apply(Spot spot) {
        Map<IRunner, Snapshot> roundResults = new HashMap<>();
        for (Map.Entry<IRunner, Boolean> entry : activeStrategies.entrySet()) {
            IRunner runner = entry.getKey();
            if (!entry.getValue()) continue;
            if (runner.canContinue()) {
                Snapshot snapshot = runner.apply(spot);

                roundResults.put(runner, snapshot);
                lastSnapshots.put(runner, snapshot);
            } else {
                if (!runner.isStopped()) {
                    runner.stop();
                }
                activeStrategies.put(runner, false);
                lastSnapshots.put(runner, runner.snapshot());
            }
        }
        return roundResults;
    }

    @Override
    public Map<IRunner, Snapshot> snapshot() {
        for (IRunner runner : activeStrategies.keySet()) {
            if (!lastSnapshots.containsKey(runner)) {
                lastSnapshots.put(runner, runner.snapshot());
            }
        }
        return Collections.unmodifiableMap(lastSnapshots);
    }

    @Override
    public boolean canContinue() {
        return activeStrategies.entrySet().stream()
                .anyMatch(entry -> entry.getValue() && !entry.getKey().canContinue());
    }

    @Override
    public boolean allLive() {
        return activeStrategies.values().stream().allMatch(Boolean::booleanValue);
    }

    @Override
    public List<IRunner> all() {
        return new ArrayList<>(activeStrategies.keySet());
    }

    @Override
    public List<IRunner> add(List<IRunner> strategies) {
        strategies.forEach(this::add);
        return strategies;
    }

    @Override
    public IRunner add(IRunner runner) {
        activeStrategies.put(runner, true);
        lastSnapshots.put(runner, runner.snapshot());
        return runner;
    }

    @Override
    public IRunner disable(IRunner runner) {
        if (activeStrategies.containsKey(runner)) {
            activeStrategies.put(runner, false);
        }
        return runner;
    }

    @Override
    public boolean exists(IRunner runner) {
        return activeStrategies.containsKey(runner);
    }

    @Override
    public boolean remove(IRunner runner) {
        lastSnapshots.remove(runner);
        return activeStrategies.remove(runner) != null;
    }
}