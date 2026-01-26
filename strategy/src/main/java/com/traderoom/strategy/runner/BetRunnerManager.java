package com.traderoom.strategy.runner;

import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.context.Snapshot;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

public class BetRunnerManager implements RunnerManager {

    private final Map<IRunner, Boolean> runners = new ConcurrentHashMap<>();

    public BetRunnerManager() {
        this(new ArrayList<>());
    }

    public BetRunnerManager(List<IRunner> strategies) {
        strategies.forEach(this::add);
    }

    @Override
    public Map<IRunner, Snapshot> apply(Spot spot) {
        Map<IRunner, Snapshot> roundResults = new HashMap<>();
        for (Map.Entry<IRunner, Boolean> entry : runners.entrySet()) {
            IRunner runner = entry.getKey();
            if (Boolean.FALSE.equals(entry.getValue())) continue;
            roundResults.put(runner, runner.apply(spot));
            runners.put(runner, runner.canContinue());
        }
        return roundResults;
    }

    @Override
    public Map<IRunner, Snapshot> snapshot() {
        Map<IRunner, Snapshot> map = HashMap.newHashMap(runners.size());
        runners.keySet().forEach(runner -> map.put(runner, runner.snapshot()));
        return map;
    }

    @Override
    public boolean canContinue() {
        return runners.entrySet().stream()
                .anyMatch(entry -> entry.getValue() && !entry.getKey().canContinue());
    }

    @Override
    public boolean allIsLive() {
        return runners.values().stream().allMatch(Boolean::booleanValue);
    }

    @Override
    public Set<IRunner> all() {
        return new HashSet<>(runners.keySet());
    }

    @Override
    public List<IRunner> add(List<IRunner> strategies) {
        strategies.forEach(this::add);
        return strategies;
    }

    @Override
    public IRunner add(IRunner runner) {
        runners.put(runner, !runner.isLive());
        return runner;
    }

    @Override
    public IRunner disable(IRunner runner) {
        runners.computeIfPresent(runner, (_, _) -> false);
        return runner;
    }

    @Override
    public boolean exists(IRunner runner) {
        return runners.containsKey(runner);
    }

    @Override
    public boolean remove(IRunner runner) {
        return runners.remove(runner) != null;
    }
}