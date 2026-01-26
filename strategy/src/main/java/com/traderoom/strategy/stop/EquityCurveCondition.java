package com.traderoom.strategy.stop;

import com.traderoom.strategy.api.Metric;
import com.traderoom.strategy.model.context.State;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Optional;

public class EquityCurveCondition implements StopCondition {
    private final int smaPeriod = 20;
    private final Deque<Long> balances = new ArrayDeque<>(smaPeriod + 1);

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

            double sum = 0;
            for (Long val : balances) {
                sum += val;
            }
            double avg = sum / balances.size();

            return state.getBalance() < avg * 0.95;
        }
        return false;
    }
}