package com.traderoom.strategy.stop;

import com.traderoom.strategy.api.Metric;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.utils.BetHelper;

import java.util.Optional;

public class HighRiskBetCondition implements StopCondition {
    private final double maxPercentage;

    public HighRiskBetCondition(Double maxPercentage) {
        this.maxPercentage = maxPercentage;
    }

    public static StopCondition of(Double maxBetBalancePercentage) {
        return new HighRiskBetCondition(maxBetBalancePercentage);
    }

    public static Optional<StopCondition> createIfEnabled(Long balance, StopConditionConfig config) {
        try {
            if (config.maxBetBalancePercentage() > 0)
                return Optional.of(of(config.maxBetBalancePercentage()));
        } catch (NullPointerException _) {
        }
        return Optional.empty();
    }

    @Override
    public boolean should(Metric metric, State state) {
        long currentBalance = metric.getBalance();
        if (currentBalance <= 0) return true;
        long nextTotalBet = BetHelper.getTotalBetValue(metric.getLastBets());
        return (double) nextTotalBet / currentBalance > maxPercentage;
    }
}