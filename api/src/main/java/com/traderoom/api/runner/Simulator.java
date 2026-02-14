package com.traderoom.api.runner;

import com.traderoom.api.IStrategy;
import com.traderoom.api.Subscriber;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.exception.StrategyException;
import com.traderoom.api.model.Snapshot;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.runner.supplier.SpotSupplier;

public sealed interface Simulator permits Simulator.Base {

    RunnerResult run();

    static Simulator create(MetaConfig meta) {
        try {
            return create(meta.clazz().getConstructor(Config.class).newInstance(meta.config()), meta.supplier());
        } catch (Exception e) {
            throw new StrategyException("Create Simulator failed", e);
        }
    }

    static Simulator create(IStrategy strategy, SpotSupplier supplier) {
        Subscriber subscriber = Subscriber.storage();
        strategy.addSubscriber(subscriber);
        return new Base(Runner.of(strategy), subscriber, supplier);
    }

    record Base(Runner runner, Subscriber subscriber, SpotSupplier supplier) implements Simulator {
        public RunnerResult run() {
            boolean isLive = runner.isLive();
            boolean hasNext = supplier.hasNext();
            Snapshot snapshot = null;
            while (isLive && hasNext) {
                Spot spot = supplier.get();
                if (spot == null) break;
                snapshot = runner.victory(spot);
                isLive = runner.isLive();
                hasNext = supplier.hasNext();
            }
            return RunnerResult.of(runner.getStrategy().getName(), snapshot, subscriber.deque());
        }
    }
}
