package com.traderoom.strategy.simulate;

import com.traderoom.strategy.IStrategy;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.StrategyFactory;
import com.traderoom.strategy.model.context.MetaConfig;
import com.traderoom.strategy.model.context.Snapshot;
import com.traderoom.strategy.api.Subscriber;
import com.traderoom.strategy.runner.IRunner;

import java.io.Serializable;
import java.util.Deque;

public sealed interface Simulator extends Serializable permits Simulator.Base {

    Result run();

    static Simulator create(MetaConfig meta) {
        StrategyFactory factory = StrategyFactory.getInstance();
        IStrategy strategy = factory.create(meta.clazz(), meta.config());
        return create(strategy, meta.supplier());
    }

    static Simulator create(IStrategy strategy, SpotSupplier supplier) {
        Subscriber subscriber = Subscriber.storage();
        strategy.addSubscriber(subscriber);
        return new Base(IRunner.of(strategy), subscriber, supplier);
    }

    record Result(String strategy, Snapshot snapshot, Deque<Snapshot> deque) {
    }

    record Base(IRunner runner, Subscriber subscriber, SpotSupplier supplier) implements Simulator {
        public Result run() {
            boolean canContinue = runner.canContinue();
            boolean hasNext = supplier.hasNext();
            while (canContinue && hasNext) {
                Spot spot = supplier.get();
                if (spot == null) break;
                runner.apply(spot);
                canContinue = runner.canContinue();
                hasNext = supplier.hasNext();
            }
            Snapshot snapshot = runner.stop();
            return new Result(runner.getStrategy().getName(), snapshot, subscriber.deque());
        }
    }
}
