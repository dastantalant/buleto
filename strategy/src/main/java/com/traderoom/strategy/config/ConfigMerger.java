package com.traderoom.strategy.config;


import com.traderoom.strategy.model.context.Config;

public final class ConfigMerger {

    private ConfigMerger() {
    }

    public static Config merge(RawConfig def, RawConfig config) {
        return ConfigBuilder.builder()
                .name(v(config.getName(), def.getName()))
                .rouletteType(v(config.getType(), def.getType()))
                .balance(v(config.getBalance(), def.getBalance()))
                .limits(v(config.getMinBet(), def.getMinBet()),
                        v(config.getMaxBet(), def.getMaxBet()),
                        v(config.getLimit(), def.getLimit()))
                .stopLossPercentage(v(config.getStopLossPercentage(), def.getStopLossPercentage()))
                .takeProfitPercentage(v(config.getTakeProfitPercentage(), def.getTakeProfitPercentage()))
                .trailingStopPercentage(v(config.getTrailingStopPercentage(), def.getTrailingStopPercentage()))
                .maxDrawdownPercentage(v(config.getMaxDrawdownPercentage(), def.getMaxDrawdownPercentage()))
                .maxWinStreak(v(config.getMaxWinStreak(), def.getMaxWinStreak()))
                .maxLossStreak(v(config.getMaxLossStreak(), def.getMaxLossStreak()))
                .maxRounds(v(config.getMaxRounds(), def.getMaxRounds()))
                .maxBetBalancePercentage(v(config.getMaxBetBalancePercentage(), def.getMaxBetBalancePercentage()))
                .stagnationWindow(v(config.getStagnationWindow(), def.getStagnationWindow()))
                .minWinRateThreshold(v(config.getMinWinRateThreshold(), def.getMinWinRateThreshold()))
                .minRoundsForWinRate(v(config.getMinRoundsForWinRate(), def.getMinRoundsForWinRate()))
                .build();
    }

    private static <T> T v(T value, T def) {
        if (value != null) return value;
        if (def != null) return def;
        throw new IllegalStateException("Missing required config value");
    }
}
