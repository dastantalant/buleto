package com.traderoom.strategy.stop;

import com.traderoom.strategy.api.Metric;
import com.traderoom.strategy.model.context.State;

import java.util.Objects;
import java.util.Optional;

public class TrailingStopLossCondition implements StopCondition {

    private final double trailingStopPercentage;

    public TrailingStopLossCondition(Integer trailingStopPercentage) {
        this.trailingStopPercentage = Objects.requireNonNull(trailingStopPercentage) / 100.0;
    }

    public static StopCondition of(Integer trailingStopPercentage) {
        return new TrailingStopLossCondition(trailingStopPercentage);
    }

    public static Optional<StopCondition> createIfEnabled(Long balance, StopConditionConfig config) {

        try {
            if (config.trailingStopPercentage() > 0)
                return Optional.of(of(config.trailingStopPercentage()));
        } catch (NullPointerException _) {
        }
        return Optional.empty();
    }

    @Override
    public boolean should(Metric metric, State state) {
        if (trailingStopPercentage > 0 && metric.getPeakBalance() > metric.getStartBalance()) {
            long trailingStopThreshold = (long) (metric.getPeakBalance() * (1.0 - trailingStopPercentage));
            return state.getBalance() < trailingStopThreshold;
        }
        return false;
    }
}