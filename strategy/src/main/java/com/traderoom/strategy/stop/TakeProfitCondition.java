package com.traderoom.strategy.stop;

import com.traderoom.strategy.api.Metric;
import com.traderoom.strategy.model.context.State;

import java.util.Optional;

import static java.util.Objects.requireNonNull;

public class TakeProfitCondition implements StopCondition {

    private final long takeProfitThreshold;

    public TakeProfitCondition(Long startBalance, Integer profitPercentage) {
        takeProfitThreshold = requireNonNull(profitPercentage) > 0 ? (long) (requireNonNull(startBalance) * (1.0 + profitPercentage / 100.0)) : 0;
    }

    public static StopCondition of(Long balance, Integer profitPercentage) {
        return new TakeProfitCondition(balance, profitPercentage);
    }

    public static Optional<StopCondition> createIfEnabled(Long balance, StopConditionConfig config) {
        try {
            if (config.takeProfitPercentage() > 0)
                return Optional.of(of(balance, config.takeProfitPercentage()));
        } catch (NullPointerException _) {
        }
        return Optional.empty();
    }

    @Override
    public boolean should(Metric metric, State state) {
        return takeProfitThreshold > 0 && state.getBalance() >= takeProfitThreshold;
    }
}