package com.traderoom.strategy.stop;

import com.traderoom.strategy.api.Metric;
import com.traderoom.strategy.model.context.State;

import java.util.LinkedList;
import java.util.Optional;
import java.util.Queue;

public class EquityCurveCondition implements StopCondition {
    private final int smaPeriod = 20;
    private final Queue<Long> balances = new LinkedList<>();

    public static StopCondition of() {
        return new EquityCurveCondition();
    }

    public static Optional<StopCondition> createIfEnabled(Long balance, StopConditionConfig config) {
        return Optional.of(new EquityCurveCondition());
    }

    @Override
    public boolean should(Metric metric, State state) {
        balances.offer(state.getBalance());
        if (balances.size() > smaPeriod) {
            balances.poll();
            double avg = balances.stream().mapToLong(l -> l).average().orElse(0);
            return state.getBalance() < avg * 0.95;
        }
        return false;
    }
}