package com.traderoom.strategy.base;

import com.traderoom.strategy.IStrategy;
import com.traderoom.strategy.api.Manager;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.StrategyFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public abstract class BaseManager extends AbstractStrategy implements Manager {
    protected static final int REEVALUATION_PERIOD = 25;

    protected final List<IStrategy> portfolio;
    protected final StrategyFactory strategyFactory;

    protected BaseManager(Config config) {
        super(config);
        portfolio = new ArrayList<>();
        strategyFactory = StrategyFactory.getInstance();
    }

    @Override
    public List<IStrategy> getPortfolio() {
        return List.copyOf(portfolio);
    }

    public IStrategy add(IStrategy strategy) {
        portfolio.add(strategy);
        return strategy;
    }

    public List<IStrategy> add(List<IStrategy> strategies) {
        strategies.forEach(this::add);
        return strategies;
    }

    public IStrategy remove(IStrategy strategy) {
        portfolio.remove(strategy);
        return strategy;
    }

    public Optional<IStrategy> create(Class<? extends IStrategy> clazz, Config config) {
        return Optional.ofNullable(strategyFactory.create(clazz, config));
    }
}
