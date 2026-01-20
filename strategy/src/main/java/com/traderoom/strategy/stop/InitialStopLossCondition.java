package com.traderoom.strategy.stop;

import com.traderoom.strategy.api.Metric;
import com.traderoom.strategy.model.context.State;

import java.util.Optional;

import static java.util.Objects.requireNonNull;

public class InitialStopLossCondition implements StopCondition {

    private final long initialStopLossThreshold;

    public InitialStopLossCondition(Long balance, Integer stopLossPercentage) {
        initialStopLossThreshold = requireNonNull(stopLossPercentage) > 0
                ? (long) (requireNonNull(balance) * (1.0 - stopLossPercentage / 100.0))
                : 0;
    }

    public static StopCondition of(Long balance, Integer stopLossPercentage) {
        return new InitialStopLossCondition(balance, stopLossPercentage);
    }

    public static Optional<StopCondition> createIfEnabled(Long balance, StopConditionConfig config) {
        try {
            if (config.stopLossPercentage() > 0 && config.stopLossPercentage() <= 100)
                return Optional.of(of(balance, config.stopLossPercentage()));
        } catch (NullPointerException _) {
        }
        return Optional.empty();
    }

    @Override
    public boolean should(Metric metric, State state) {
        return initialStopLossThreshold > 0
                && metric.getPeakBalance() <= metric.getStartBalance()
                && metric.getBalance() < initialStopLossThreshold;
    }
}