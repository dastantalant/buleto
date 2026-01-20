package com.traderoom.strategy.stop;

import com.traderoom.strategy.api.Metric;
import com.traderoom.strategy.model.context.State;

import java.util.Optional;

import static java.util.Objects.requireNonNull;

public class MaxDrawdownStopCondition implements StopCondition {
    private final double maxAllowedDrawdown;

    public MaxDrawdownStopCondition(Integer maxDrawdownPercentage) {
        maxAllowedDrawdown = requireNonNull(maxDrawdownPercentage) / 100.0;
    }

    public static StopCondition of(Integer maxDrawdownPercentage) {
        return new MaxDrawdownStopCondition(maxDrawdownPercentage);
    }

    public static Optional<StopCondition> createIfEnabled(Long balance, StopConditionConfig config) {
        try {
            if (config.maxDrawdownPercentage() > 0)
                return Optional.of(of(config.maxDrawdownPercentage()));
        } catch (NullPointerException _) {
        }
        return Optional.empty();
    }

    @Override
    public boolean should(Metric metric, State state) {
        return metric.getMaxDrawdown() >= maxAllowedDrawdown;
    }
}