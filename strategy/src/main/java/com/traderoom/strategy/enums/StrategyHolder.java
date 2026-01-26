package com.traderoom.strategy.enums;

import com.traderoom.strategy.IStrategy;

import java.util.Collection;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public enum StrategyHolder {
    STRATEGY_HOLDER;
    private final ConcurrentMap<String, IStrategy> strategies = new ConcurrentHashMap<>();

    public StrategyHolder register(IStrategy strategy) {
        strategies.put(strategy.getName(), strategy);
        return this;
    }

    public StrategyHolder register(IStrategy... strategies) {
        for (IStrategy strategy : strategies) {
            this.strategies.put(strategy.getName(), strategy);
        }
        return this;
    }

    public StrategyHolder register(Collection<IStrategy> strategies) {
        for (IStrategy strategy : strategies) {
            this.strategies.put(strategy.getName(), strategy);
        }
        return this;
    }

    public Optional<IStrategy> get(String name) {
        return Optional.ofNullable(strategies.get(name));
    }

    public IStrategy remove(String name) {
        return strategies.remove(name);
    }

    public void clear() {
        strategies.clear();
    }
}