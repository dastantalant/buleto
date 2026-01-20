package com.traderoom.strategy.factory;

import com.traderoom.strategy.api.IStrategy;
import com.traderoom.strategy.model.context.Config;

import java.util.Optional;

public record StrategyDefinition(String name, Class<IStrategy> clazz) {

    public static StrategyDefinition of(String name, Class<IStrategy> clazz) {
        return new StrategyDefinition(name, clazz);
    }

    public Optional<IStrategy> instance(Config config) {
        try {
            return Optional.of(clazz.getConstructor(Config.class).newInstance(config));
        } catch (Exception _) {
            return Optional.empty();
        }
    }
}