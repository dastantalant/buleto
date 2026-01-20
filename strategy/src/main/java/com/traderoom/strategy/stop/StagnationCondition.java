package com.traderoom.strategy.stop;

import com.traderoom.strategy.api.Metric;
import com.traderoom.strategy.model.context.State;

import java.util.LinkedList;
import java.util.Objects;
import java.util.Optional;
import java.util.Queue;

public class StagnationCondition implements StopCondition {
    private final int windowSize;
    private final Queue<Long> history;

    public StagnationCondition(Integer windowSize) {
        this.windowSize = Objects.requireNonNull(windowSize);
        history = new LinkedList<>();
    }

    public static StopCondition of(Integer window) {
        return new StagnationCondition(window);
    }

    public static Optional<StopCondition> createIfEnabled(Long balance, StopConditionConfig config) {
        try {
            if (config.stagnationWindow() > 0)
                return Optional.of(of(config.stagnationWindow()));
        } catch (NullPointerException _) {
        }
        return Optional.empty();
    }

    @Override
    public boolean should(Metric metric, State sessionState) {
        long currentBalance = metric.getBalance();
        history.offer(currentBalance);

        if (history.size() > windowSize) {
            Long poll = history.poll();
            long oldBalance = poll != null ? poll : 0;
            long diff = Math.abs(currentBalance - oldBalance);
            return diff == 0;
        }
        return false;
    }
}