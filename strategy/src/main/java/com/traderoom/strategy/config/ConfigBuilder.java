package com.traderoom.strategy.config;

import com.traderoom.strategy.enums.RouletteType;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.stop.StopCondition;
import com.traderoom.strategy.stop.StopConditionConfig;
import com.traderoom.strategy.stop.StopConditionFactory;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public final class ConfigBuilder {
    private final Config.ConfigBuilder config;
    private final StopConditionConfig.StopConditionConfigBuilder stopConfig;
    private final List<StopCondition> conditions;
    private Long balance;

    private ConfigBuilder() {
        config = Config.builder();
        stopConfig = StopConditionConfig.builder();
        conditions = new ArrayList<>();
        balance = 10_000L;
    }

    public static ConfigBuilder builder() {
        return new ConfigBuilder();
    }

    public ConfigBuilder name(String name) {
        config.name(name);
        return this;
    }

    public ConfigBuilder rouletteType(RouletteType type) {
        config.rouletteType(type);
        return this;
    }

    public ConfigBuilder european() {
        config.rouletteType(RouletteType.EUROPEAN);
        return this;
    }

    public ConfigBuilder american() {
        config.rouletteType(RouletteType.AMERICAN);
        return this;
    }

    public ConfigBuilder balance(Long balance) {
        if (balance <= 0) throw new IllegalArgumentException("balance <= 0");
        config.startBalance(balance);
        this.balance = balance;
        return this;
    }

    public ConfigBuilder limits(Long minBet, Long maxBet, Long tableLimit) {
        if (minBet <= 0) throw new IllegalArgumentException("minBet <= 0");
        if (maxBet < minBet) throw new IllegalArgumentException("maxBet < minBet");
        if (tableLimit < maxBet) throw new IllegalArgumentException("tableLimit < maxBet");

        config.minBet(minBet);
        config.maxBet(maxBet);
        config.tableLimit(tableLimit);
        return this;
    }

    public ConfigBuilder addCondition(StopCondition condition) {
        conditions.add(condition);
        return this;
    }

    public ConfigBuilder stopLossPercentage(Integer stopLossPercentage) {
        stopConfig.stopLossPercentage(stopLossPercentage);
        return this;
    }

    public ConfigBuilder takeProfitPercentage(Integer takeProfitPercentage) {
        stopConfig.takeProfitPercentage(takeProfitPercentage);
        return this;
    }

    public ConfigBuilder trailingStopPercentage(Integer trailingStopPercentage) {
        stopConfig.trailingStopPercentage(trailingStopPercentage);
        return this;
    }

    public ConfigBuilder maxDrawdownPercentage(Integer maxDrawdownPercentage) {
        stopConfig.maxDrawdownPercentage(maxDrawdownPercentage);
        return this;
    }

    public ConfigBuilder maxWinStreak(Integer maxWinStreak) {
        stopConfig.maxWinStreak(maxWinStreak);
        return this;
    }

    public ConfigBuilder maxLossStreak(Integer maxLossStreak) {
        stopConfig.maxLossStreak(maxLossStreak);
        return this;
    }

    public ConfigBuilder maxRounds(Long maxRounds) {
        stopConfig.maxRounds(maxRounds);
        return this;
    }

    public ConfigBuilder maxBetBalancePercentage(Double maxBetBalancePercentage) {
        stopConfig.maxBetBalancePercentage(maxBetBalancePercentage);
        return this;
    }

    public ConfigBuilder stagnationWindow(Integer stagnationWindow) {
        stopConfig.stagnationWindow(stagnationWindow);
        return this;
    }

    public ConfigBuilder minWinRateThreshold(Double minWinRateThreshold) {
        stopConfig.minWinRateThreshold(minWinRateThreshold);
        return this;
    }

    public ConfigBuilder minRoundsForWinRate(Long minRoundsForWinRate) {
        stopConfig.minRoundsForWinRate(minRoundsForWinRate);
        return this;
    }

    public Config build() {
        StopConditionConfig stop = stopConfig.build();
        conditions.addAll(StopConditionFactory.from(stop, balance));
        return config.stopConfig(stop)
                .stopConditions(Collections.unmodifiableList(conditions))
                .build();
    }
}
