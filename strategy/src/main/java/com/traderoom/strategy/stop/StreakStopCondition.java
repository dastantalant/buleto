package com.traderoom.strategy.stop;

import com.traderoom.strategy.api.Metric;
import com.traderoom.strategy.model.context.State;

import java.util.Optional;

import static java.util.Objects.requireNonNull;

public class StreakStopCondition implements StopCondition {
    private final int maxLossStreak;
    private final int maxWinStreak;

    private int currentLossStreak = 0;
    private int currentWinStreak = 0;
    private long lastBalance;

    public StreakStopCondition(Integer maxLossStreak, Integer maxWinStreak, Long startBalance) {
        this.maxLossStreak = requireNonNull(maxLossStreak);
        this.maxWinStreak = requireNonNull(maxWinStreak);
        lastBalance = requireNonNull(startBalance);
    }

    public static StopCondition of(Integer maxLossStreak, Integer maxWinStreak, Long balance) {
        return new StreakStopCondition(maxLossStreak, maxWinStreak, balance);
    }

    public static Optional<StopCondition> createIfEnabled(Long balance, StopConditionConfig config) {
        try {
            if (config.maxWinStreak() > 0 || config.maxLossStreak() > 0)
                return Optional.of(of(config.maxLossStreak(), config.maxWinStreak(), balance));
        } catch (NullPointerException _) {
        }
        return Optional.empty();
    }

    @Override
    public boolean should(Metric metric, State state) {
        long curBalance = state.getBalance();

        if (curBalance == lastBalance) {
            return false;
        }

        if (curBalance < lastBalance) {
            currentLossStreak++;
            currentWinStreak = 0;
        } else {
            currentWinStreak++;
            currentLossStreak = 0;
        }

        lastBalance = curBalance;

        if (maxLossStreak > 0 && currentLossStreak >= maxLossStreak) {
            return true;
        }

        return maxWinStreak > 0 && currentWinStreak >= maxWinStreak;
    }
}