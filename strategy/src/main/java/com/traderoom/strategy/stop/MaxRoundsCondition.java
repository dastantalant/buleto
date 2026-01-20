package com.traderoom.strategy.stop;

import com.traderoom.strategy.api.Metric;
import com.traderoom.strategy.model.context.State;

import java.util.Objects;
import java.util.Optional;

public class MaxRoundsCondition implements StopCondition {
    private final long maxRounds;

    public MaxRoundsCondition(Long maxRounds) {
        this.maxRounds = Objects.requireNonNull(maxRounds);
    }

    public static StopCondition of(Long maxRounds) {
        return new MaxRoundsCondition(maxRounds);
    }

    public static Optional<StopCondition> createIfEnabled(Long balance, StopConditionConfig config) {
        try {
            if (config.maxRounds() > 0)
                return Optional.of(of(config.maxRounds()));
        } catch (NullPointerException _) {
        }
        return Optional.empty();
    }

    @Override
    public boolean should(Metric metric, State sessionState) {
        return metric.getBetCount() >= maxRounds;
    }
}