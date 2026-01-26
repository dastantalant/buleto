package com.traderoom.strategy.simulate;

import com.traderoom.strategy.exception.StrategyException;
import com.traderoom.strategy.StrategyFactory;
import com.traderoom.strategy.model.context.MetaConfig;
import com.traderoom.strategy.api.Subscriber;
import com.traderoom.strategy.runner.IRunner;

import java.util.*;
import java.util.concurrent.Callable;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public sealed interface SimulatorManager permits SimulatorManager.Base, SimulatorManager.Shared {

    List<SimulateResult> run();

    static SimulatorManager create(List<MetaConfig> meta) {
        return new Base(meta);
    }

    static SimulatorManager create(List<MetaConfig> meta, SpotSupplier sharedSupplier) {
        return new Shared(meta, sharedSupplier);
    }

    record Base(List<MetaConfig> meta) implements SimulatorManager {
        @Override
        public List<SimulateResult> run() {
            try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
                List<Callable<SimulateResult>> tasks = meta.stream()
                        .map(item -> (Callable<SimulateResult>) () -> {
                            Simulator simulator = Simulator.create(item);
                            Simulator.Result run = simulator.run();
                            return new SimulateResult(item.config().name(), run.strategy(), run);
                        })
                        .toList();
                return executor.invokeAll(tasks).stream()
                        .map(this::getFutureResult)
                        .toList();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                throw new StrategyException("Simulation interrupted", e);
            }
        }

        private SimulateResult getFutureResult(Future<SimulateResult> future) {
            try {
                return future.get();
            } catch (Exception e) {
                throw new StrategyException("Simulation failed", e);
            }
        }
    }

    record Shared(List<MetaConfig> meta, SpotSupplier sharedSupplier) implements SimulatorManager {
        @Override
        public List<SimulateResult> run() {
            StrategyFactory factory = StrategyFactory.getInstance();
            List<IRunner> runners = new ArrayList<>();
            Map<IRunner, Subscriber> subscribers = new HashMap<>();

            // Карта для сохранения связи "Конкретный раннер -> Имя конфига"
            Map<IRunner, String> configNameMap = new IdentityHashMap<>();

            for (MetaConfig item : meta) {
                var strategy = factory.create(item.clazz(), item.config());
                if (strategy != null) {
                    Subscriber sub = Subscriber.storage();
                    strategy.addSubscriber(sub);

                    IRunner runner = IRunner.of(strategy);
                    runners.add(runner);
                    subscribers.put(runner, sub);

                    // Запоминаем имя конфига для этого раннера
                    configNameMap.put(runner, item.config().name());
                }
            }

            if (runners.isEmpty()) {
                return List.of();
            }

            SharedSimulator simulator = new SharedSimulator(runners, subscribers, sharedSupplier);
            // Получаем результаты, привязанные к раннерам
            Map<IRunner, Simulator.Result> executionResults = simulator.run();

            // Собираем итоговый список, восстанавливая имя конфига из карты
            return executionResults.entrySet().stream()
                    .map(entry -> {
                        IRunner runner = entry.getKey();
                        Simulator.Result result = entry.getValue();
                        String configName = configNameMap.getOrDefault(runner, "UNKNOWN");

                        return new SimulateResult(configName, result.strategy(), result);
                    })
                    .toList();
        }
    }
}