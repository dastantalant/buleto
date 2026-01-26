package com.traderoom.analyzer.buleto;

import java.util.*;
import java.util.function.Supplier;

import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.MetaConfig;
import com.traderoom.strategy.simulate.*;
import com.traderoom.strategy.IStrategy;

import lombok.RequiredArgsConstructor;

import static com.traderoom.strategy.enums.RouletteType.AMERICAN;
import static com.traderoom.strategy.enums.SpotGenerateType.RANDOM;

@RequiredArgsConstructor
public class BuletoSimulator {

    private final Set<Config> configs;
    private final Set<Class<? extends IStrategy>> strategies;

    public List<SimulateResult> simulate(int count, int max) {
        List<SimulateResult> allResults = new ArrayList<>();
        // Генерируем комбинации конфигов и стратегий,
        final SpotSupplier supplier = ConfigurableSpotSupplier.of(AMERICAN, RANDOM, max);
        List<MetaConfig> combinations = combine(() -> supplier);

        for (int i = 0; i < count; i++) {
            // Запускаем пачку симуляций
            List<SimulateResult> roundResults = SimulatorManager.create(combinations, supplier).run();

            // Обогащаем результаты индексом повтора (если нужно) или просто добавляем
            // В SimulateResult можно было бы добавить поле int repeatId, но пока просто соберем все
            allResults.addAll(roundResults);
        }
        return allResults;
    }

    public List<SimulateResult> simulate(int count, final Supplier<SpotSupplier> supplier) {
        List<SimulateResult> allResults = new ArrayList<>();
        // Генерируем комбинации конфигов и стратегий
        List<MetaConfig> combinations = combine(supplier);

        for (int i = 0; i < count; i++) {
            // Запускаем пачку симуляций
            List<SimulateResult> roundResults = SimulatorManager.create(combinations).run();

            // Обогащаем результаты индексом повтора (если нужно) или просто добавляем
            // В SimulateResult можно было бы добавить поле int repeatId, но пока просто соберем все
            allResults.addAll(roundResults);
        }
        return allResults;
    }

    private List<MetaConfig> combine(Supplier<SpotSupplier> supplier) {
        List<MetaConfig> list = new ArrayList<>(strategies.size() * configs.size());
        for (Class<? extends IStrategy> clazz : strategies) {
            for (Config config : configs) {
                list.add(new MetaConfig(config, clazz, supplier.get()));
            }
        }
        return list;
    }
}