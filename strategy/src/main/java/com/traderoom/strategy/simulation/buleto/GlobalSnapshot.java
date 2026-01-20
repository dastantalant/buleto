package com.traderoom.strategy.simulation.buleto;

import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.Bet;

import lombok.Builder;

import java.util.List;

@Builder
public record GlobalSnapshot(
        String strategyName,
        int tempCount,
        String config,
        int runId,
        long roundNumber,
        long balance,
        long startBalance,
        long lastProfit,
        long netProfit,
        long roundBetAmount,
        double roiPercentage,
        double winRatePercentage,
        double currentDrawdown,
        double maxDrawdown,
        double profitFactor,
        Spot lastSpot,
        long totalWon,
        long totalLost,
        long totalWagered,
        long totalPayout,
        List<Bet> lastBets,
        boolean isStopped
) {
    /**
     * calculate field roiPercentage
     */
    public double getRoi() {
        return startBalance == 0 ? 0 : ((double) netProfit / startBalance) * 100;
    }

    /**
     * calculate field netProfit
     */
    public long getNetProfit() {
        return balance - startBalance;
    }

    /**
     * calculate field roiPercentage
     */
    public double getRoiPercentage() {
        if (startBalance == 0) return 0.0;
        return ((double) getNetProfit() / startBalance) * 100.0;
    }

    /**
     * calculate field winRatePercentage
     */
    public double getWinRatePercentage() {
        if (roundNumber == 0) return 0.0;
        return ((double) totalWon / roundNumber) * 100.0;
    }
}