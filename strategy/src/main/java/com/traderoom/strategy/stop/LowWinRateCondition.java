package com.traderoom.strategy.stop;

import com.traderoom.strategy.api.Metric;
import com.traderoom.strategy.model.context.State;

import java.util.Objects;
import java.util.Optional;

public class LowWinRateCondition implements StopCondition {
    private final double minWinRate;
    private final long minRoundsToActivate;

    public LowWinRateCondition(Double minWinRate, Long minRoundsToActivate) {
        this.minWinRate = Objects.requireNonNull(minWinRate);
        this.minRoundsToActivate = Objects.requireNonNull(minRoundsToActivate);
    }

    public static StopCondition of(Double minWinRate, Long minRoundsToActivate) {
        return new LowWinRateCondition(minWinRate, minRoundsToActivate);
    }

    public static Optional<StopCondition> createIfEnabled(Long balance, StopConditionConfig config) {
        try {
            if (config.minWinRateThreshold() > 0)
                return Optional.of(of(config.minWinRateThreshold(), config.minRoundsForWinRate()));
        } catch (NullPointerException _) {
        }
        return Optional.empty();
    }

    @Override
    public boolean should(Metric metric, State state) {
        if (metric.getBetCount() < minRoundsToActivate) {
            return false;
        }

        double currentWinRate = (double) metric.getWonCount() / metric.getBetCount();
        return currentWinRate < minWinRate;
    }
}