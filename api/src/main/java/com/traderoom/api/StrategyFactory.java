package com.traderoom.api;

import com.traderoom.api.model.config.Config;
import com.traderoom.api.model.config.RawConfig;
import com.traderoom.api.enums.GenerateType;
import com.traderoom.api.runner.MetaConfigMap;
import com.traderoom.api.runner.Runner;
import com.traderoom.api.runner.Simulator;
import com.traderoom.api.runner.SimulatorManager;
import com.traderoom.api.runner.supplier.QueueSpotSupplier;
import com.traderoom.api.runner.supplier.RandomSpotSupplier;
import com.traderoom.api.runner.supplier.SpotSupplier;
import com.traderoom.api.runner.web.WebSimulatorManager;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Deque;
import java.util.Map;
import java.util.Optional;

public final class StrategyFactory {

    private StrategyFactory() {
    }

    public static Optional<Runner> runner(String strategy, RawConfig rawConfig) {
        var config = ConfigBuilder.from(rawConfig);
        var optional = StrategyContext.findByClassName(strategy);
        if (optional.isPresent()) {
            Runner runner = Runner.from(config, optional.get());
            return Optional.of(runner);
        }
        return Optional.empty();
    }

    public static Optional<Simulator> simulator(String strategy, RawConfig rawConfig, long max) {
        return simulator(strategy, rawConfig, GenerateType.RANDOM, max);
    }

    public static Optional<Simulator> simulator(String strategy, RawConfig rawConfig, GenerateType generateType, long max) {
        return simulator(strategy, rawConfig, RandomSpotSupplier.of(rawConfig.type(), generateType, max));
    }

    public static Optional<Simulator> simulator(String strategy, RawConfig rawConfig, Deque<Integer> deque) {
        return simulator(strategy, rawConfig, QueueSpotSupplier.of(rawConfig.type(), deque));
    }
    public static Optional<Simulator> simulator(String strategy, RawConfig rawConfig, SpotSupplier supplier) {
        return simulator(strategy, ConfigBuilder.from(rawConfig), supplier);
    }



    public static Optional<Simulator> simulator(String strategy, Config config, long max) {
        return simulator(strategy, config, GenerateType.RANDOM, max);
    }

    public static Optional<Simulator> simulator(String strategy, Config config, GenerateType generateType, long max) {
        return simulator(strategy, config, RandomSpotSupplier.of(config.rouletteType(), generateType, max));
    }

    public static Optional<Simulator> simulator(String strategy, Config config, Deque<Integer> deque) {
        return simulator(strategy, config, QueueSpotSupplier.of(config.rouletteType(), deque));
    }

    public static Optional<Simulator> simulator(String strategy, Config config, SpotSupplier supplier) {
        var optional = StrategyContext.findByClassName(strategy);
        if (optional.isPresent()) {
            IStrategy iStrategy = StrategyContext.create(optional.get(), config);
            Simulator simulator = Simulator.create(iStrategy, supplier);
            return Optional.of(simulator);
        }
        return Optional.empty();
    }

    public static Simulator simulator(Class<? extends IStrategy> strategy, RawConfig rawConfig, SpotSupplier supplier) {
        var config = ConfigBuilder.from(rawConfig);
        var iStrategy = StrategyContext.create(strategy, config);
        return Simulator.create(iStrategy, supplier);
    }

    public static SimulatorManager simulatorManager(Collection<Class<? extends IStrategy>> strategies, RawConfig rawConfig, Deque<Integer> deque) {
        return simulatorManager(strategies, rawConfig, QueueSpotSupplier.of(rawConfig.type(), deque));
    }

    public static SimulatorManager simulatorManager(Collection<Class<? extends IStrategy>> strategies, RawConfig rawConfig, long max) {
        return simulatorManager(strategies, rawConfig, GenerateType.RANDOM, max);
    }

    public static SimulatorManager simulatorManager(Collection<Class<? extends IStrategy>> strategies, RawConfig rawConfig, GenerateType generateType, long max) {
        return simulatorManager(strategies, rawConfig, RandomSpotSupplier.of(rawConfig.type(), generateType, max));
    }

    public static SimulatorManager simulatorManager(Collection<Class<? extends IStrategy>> strategies, RawConfig rawConfig, SpotSupplier supplier) {
        var config = ConfigBuilder.from(rawConfig);
        var list = new ArrayList<MetaConfigMap>(strategies.size());
        for (Class<? extends IStrategy> strategy : strategies) {
            list.add(new MetaConfigMap(config, strategy));
        }
        return SimulatorManager.create(list, supplier);
    }

    public static WebSimulatorManager webSimulatorManager(Collection<Class<? extends IStrategy>> strategies, RawConfig rawConfig, Deque<Integer> deque) {
        return webSimulatorManager(strategies, rawConfig, QueueSpotSupplier.of(rawConfig.type(), deque));
    }

    public static WebSimulatorManager webSimulatorManager(Collection<Class<? extends IStrategy>> strategies, RawConfig rawConfig, long max) {
        return webSimulatorManager(strategies, rawConfig, GenerateType.RANDOM, max);
    }

    public static WebSimulatorManager webSimulatorManager(Collection<Class<? extends IStrategy>> strategies, RawConfig rawConfig, GenerateType generateType, long max) {
        return webSimulatorManager(strategies, rawConfig, RandomSpotSupplier.of(rawConfig.type(), generateType, max));
    }

    public static WebSimulatorManager webSimulatorManager(Collection<Class<? extends IStrategy>> strategies, RawConfig rawConfig, SpotSupplier supplier) {
        var config = ConfigBuilder.from(rawConfig);
        return WebSimulatorManager.create(strategies, config, supplier);
    }

    public static Map<String, String> getAll() {
        return StrategyContext.getAllMap();
    }
}
