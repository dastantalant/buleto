package com.traderoom.api.runner.web;

public record WebStats(
        long totalRounds,
        long finalBalance,
        long netProfit,
        double roi,
        double maxDrawdown,
        double winRate,
        double profitFactor,
        long totalWagered
) {}