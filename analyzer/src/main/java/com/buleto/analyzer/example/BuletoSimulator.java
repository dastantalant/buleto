package com.buleto.analyzer.example;

import com.trading.roulette.api.IStrategy;
import com.trading.roulette.api.model.config.Config;
import com.trading.roulette.api.runner.MetaConfig;
import com.trading.roulette.api.runner.MetaConfigMap;
import com.trading.roulette.api.runner.SimulateResult;
import com.trading.roulette.api.runner.SimulatorManager;
import com.trading.roulette.api.runner.supplier.SpotSupplier;

import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Set;
import java.util.function.Supplier;

@RequiredArgsConstructor
public class BuletoSimulator {

    private final Set<Config> configs;
    private final Set<Class<? extends IStrategy>> strategies;

    public Collection<SimulateResult> single(int count, final Supplier<SpotSupplier> supplier) {
        Collection<MetaConfigMap> combinations = combine();
        Collection<SimulateResult> allResults = new ArrayList<>(combinations.size());
        for (int i = 0; i < count; i++) {
            SimulatorManager manager = SimulatorManager.create(combinations, supplier.get());
            Collection<SimulateResult> roundResults = manager.run();
            allResults.addAll(roundResults);
        }
        return allResults;
    }

    private Collection<MetaConfigMap> combine() {
        Collection<MetaConfigMap> list = new ArrayList<>(strategies.size() * configs.size());
        for (Class<? extends IStrategy> clazz : strategies) {
            for (Config config : configs) {
                list.add(new MetaConfigMap(config, clazz));
            }
        }
        return list;
    }

    public Collection<SimulateResult> simulate(int count, final Supplier<SpotSupplier> supplier) {
        Collection<MetaConfig> combinations = combine(supplier);
        Collection<SimulateResult> allResults = new ArrayList<>(combinations.size());
        for (int i = 0; i < count; i++) {
            Collection<SimulateResult> roundResults = SimulatorManager.create(combinations).run();
            allResults.addAll(roundResults);
        }
        return allResults;
    }

    private Collection<MetaConfig> combine(Supplier<SpotSupplier> supplier) {
        Collection<MetaConfig> list = new ArrayList<>(strategies.size() * configs.size());
        for (Class<? extends IStrategy> clazz : strategies) {
            for (Config config : configs) {
                list.add(new MetaConfig(config, clazz, supplier.get()));
            }
        }
        return list;
    }
}