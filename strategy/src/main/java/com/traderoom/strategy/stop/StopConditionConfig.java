package com.traderoom.strategy.stop;

import lombok.Builder;

import java.util.Objects;

@Builder
public record StopConditionConfig(
        Integer stopLossPercentage,
        Integer takeProfitPercentage,
        Integer trailingStopPercentage,
        Integer maxDrawdownPercentage,
        Integer maxWinStreak,
        Integer maxLossStreak,
        Long maxRounds,
        Double maxBetBalancePercentage,
        Integer stagnationWindow,
        Double minWinRateThreshold,
        Long minRoundsForWinRate
) {
    @Builder
    public StopConditionConfig(
            Integer stopLossPercentage,
            Integer takeProfitPercentage,
            Integer trailingStopPercentage,
            Integer maxDrawdownPercentage,
            Integer maxWinStreak,
            Integer maxLossStreak,
            Long maxRounds,
            Double maxBetBalancePercentage,
            Integer stagnationWindow,
            Double minWinRateThreshold,
            Long minRoundsForWinRate
    ) {
        this.stopLossPercentage = Objects.requireNonNull(stopLossPercentage);
        this.takeProfitPercentage = Objects.requireNonNull(takeProfitPercentage);
        this.trailingStopPercentage = Objects.requireNonNull(trailingStopPercentage);
        this.maxDrawdownPercentage = Objects.requireNonNull(maxDrawdownPercentage);
        this.maxWinStreak = Objects.requireNonNull(maxWinStreak);
        this.maxLossStreak = Objects.requireNonNull(maxLossStreak);
        this.maxRounds = (Objects.requireNonNull(maxRounds) < 0) ? 10_000 : maxRounds;
        this.maxBetBalancePercentage = Objects.requireNonNull(maxBetBalancePercentage);
        this.stagnationWindow = Objects.requireNonNull(stagnationWindow);
        this.minWinRateThreshold = Objects.requireNonNull(minWinRateThreshold);
        this.minRoundsForWinRate = Objects.requireNonNull(minRoundsForWinRate) < 0 ? 100 : minRoundsForWinRate;

        if (stopLossPercentage < 0 || stopLossPercentage > 100)
            throw new IllegalArgumentException("stopLossPercentage must be between 0 and 100");
        if (takeProfitPercentage < 0)
            throw new IllegalArgumentException("takeProfitPercentage must be greater than 0");
    }

    public static StopConditionConfig of() {
        return StopConditionConfig.builder().build();
    }
}