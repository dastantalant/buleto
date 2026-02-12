package com.traderoom.api.runner.web;

import com.traderoom.api.IStrategy;
import com.traderoom.api.Subscriber; // Импорт интерфейса
import com.traderoom.api.model.config.Config;
import com.traderoom.api.StrategyContext;
import com.traderoom.api.runner.Runner;
import com.traderoom.api.runner.SharedSimulator;
import com.traderoom.api.runner.supplier.SpotSupplier;

import java.util.*;

public interface WebSimulatorManager {

    Deque<WebSimulateResult> run();

    static WebSimulatorManager create(Collection<Class<? extends IStrategy>> strategies, Config config, SpotSupplier supplier) {
        return new WebOptimized(strategies, config, supplier);
    }

    record WebOptimized(Collection<Class<? extends IStrategy>> strategies, Config config, SpotSupplier supplier)
            implements WebSimulatorManager {

        @Override
        public Deque<WebSimulateResult> run() {
            List<Runner> runners = new ArrayList<>();
            // Используем IdentityHashMap для корректной работы с экземплярами
            Map<Runner, SamplingSubscriber> subscribersMap = new IdentityHashMap<>();
            // Карта для SharedSimulator (требует интерфейс Subscriber)
            Map<Runner, Subscriber> sharedSubscribersMap = new IdentityHashMap<>();

            Map<Runner, String> strategyNames = new IdentityHashMap<>();

            long maxRounds = supplier.getMax();

            for (Class<? extends IStrategy> clazz : strategies) {
                var strategy = StrategyContext.create(clazz, config);
                if (strategy != null) {
                    SamplingSubscriber sub = new SamplingSubscriber(maxRounds);
                    strategy.addSubscriber(sub);

                    Runner runner = Runner.of(strategy);
                    runners.add(runner);

                    subscribersMap.put(runner, sub);
                    sharedSubscribersMap.put(runner, sub); // Для симулятора
                    strategyNames.put(runner, strategy.getName());
                }
            }

            if (runners.isEmpty()) return new LinkedList<>();

            // Передаем реальных подписчиков, чтобы SharedSimulator мог (если нужно)
            // дергать их onGameEnd или использовать для логов.
            // Приводим типы, если нужно (Java Generics могут ругаться, но Map<Runner, Subscriber> валиден)
            SharedSimulator simulator = new SharedSimulator(runners, sharedSubscribersMap, supplier);

            simulator.run();

            Deque<WebSimulateResult> results = new LinkedList<>();

            for (Runner runner : runners) {
                SamplingSubscriber sub = subscribersMap.get(runner);
                String sName = strategyNames.get(runner);
                results.add(WebSimulateResult.of(sName, config.name(), sub.getFinalStats(), sub.getChart()));
            }

            return results;
        }
    }
}