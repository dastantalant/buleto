package com.traderoom.strategy.base;

import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.risk.RiskManager;
import com.traderoom.strategy.risk.ZoneRiskManager;

import lombok.Getter;

@Getter
public abstract class AbstractMetricStrategy extends AbstractStateStrategy {
    private final long startBalance;
    private long wonCount;
    private long lostCount;
    private long betCount;
    private double maxDrawdown;
    private long peakBalance;
    private long totalWagered;
    private long totalPayout;
    private final RiskManager riskManager;

    protected AbstractMetricStrategy(Config config) {
        super(config);
        startBalance = config.startBalance();
        riskManager = new ZoneRiskManager(startBalance);
        peakBalance = startBalance;
    }

    protected double getAverage() {
        return betCount == 0 ? 0 : (double) wonCount / betCount;
    }

    protected void setWonCount(long wonCount) {
        this.wonCount = wonCount;
    }

    protected void incrementWon() {
        wonCount++;
    }

    protected void setLostCount(long lostCount) {
        this.lostCount = lostCount;
    }

    protected void incrementLost() {
        lostCount++;
    }

    protected void setBetCount(long betCount) {
        this.betCount = betCount;
    }

    protected void incrementBet() {
        betCount++;
    }

    protected void setMaxDrawdown(double maxDrawdown) {
        this.maxDrawdown = maxDrawdown;
    }

    protected void setPeakBalance(long peakBalance) {
        this.peakBalance = peakBalance;
    }

    protected void setTotalWagered(long totalWagered) {
        this.totalWagered = totalWagered;
    }

    protected void setTotalPayout(long totalPayout) {
        this.totalPayout = totalPayout;
    }
}
