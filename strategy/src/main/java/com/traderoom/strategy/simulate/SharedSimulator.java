package com.traderoom.strategy.simulate;

import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.api.Subscriber;
import com.traderoom.strategy.model.context.Snapshot;
import com.traderoom.strategy.runner.IRunner;

import java.io.Serializable;
import java.util.*;

public record SharedSimulator(
        List<IRunner> runners,
        Map<IRunner, Subscriber> subscribers,
        SpotSupplier supplier
) implements Serializable {

    // Возвращаем Map, чтобы сохранить связь экземпляра Runner с его результатом
    public Map<IRunner, Simulator.Result> run() {
        while (supplier.hasNext()) {
            boolean anyLive = runners.stream().anyMatch(IRunner::canContinue);
            if (!anyLive) {
                break;
            }

            Spot spot = supplier.get();
            if (spot == null) break;

            for (IRunner runner : runners) {
                if (runner.canContinue()) {
                    runner.apply(spot);
                }
            }
        }

        Map<IRunner, Simulator.Result> results = new LinkedHashMap<>();
        for (IRunner runner : runners) {
            Snapshot finalSnapshot = runner.stop();
            Subscriber sub = subscribers.get(runner);

            results.put(runner, new Simulator.Result(
                    runner.getStrategy().getName(),
                    finalSnapshot,
                    sub != null ? sub.deque() : new ArrayDeque<>()
            ));
        }
        return results;
    }
}