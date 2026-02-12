package com.traderoom.api.model;

import com.traderoom.api.enums.Spot;
import com.traderoom.api.utils.BetHelper;

import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

import static com.traderoom.api.enums.Constants.BALANCE_HISTORY_SIZE;

public final class Metric {
    private final String strategyName;
    private final long startBalance;
    private final Queue<Long> historyBalance;
    private long wonCount;
    private long lostCount;
    private long betCount;
    private long roundNumber;
    private double maxDrawdown;
    private long peakBalance;
    private long totalWagered;
    private long totalPayout;

    public Metric(String strategyName, long startBalance) {
        this.strategyName = strategyName;
        this.startBalance = startBalance;
        peakBalance = startBalance;
        historyBalance = new LinkedList<>();
    }

    public static Metric from(String strategyName, long startBalance) {
        return new Metric(strategyName, startBalance);
    }

    public  void update(long balance, long totalBetValue, long totalPayout) {
        totalWagered += totalBetValue;
        this.totalPayout += totalPayout;

        incrementRoundNumber();
        incrementBet();

        if (totalPayout > totalBetValue) incrementWon();
        else incrementLost();

        updateHistory(balance);
        updatePeak(balance);
        updateDrawdown(balance);
    }

    public void updateEmpty(long balance) {
        incrementRoundNumber();
        updateHistory(balance);
    }

    public  Snapshot snapshot(boolean isLive, List<Bet> bets, Spot spot, long balance, long oldBalance) {
        long netProfit = balance - startBalance;
        double drawdown = ((peakBalance > 0) ? (double) (peakBalance - balance) / peakBalance : 0) * 100;
        double roiPercentage = (startBalance == 0) ? 0.0 : ((double) netProfit / startBalance) * 100.0;
        double winRatePercentage = (betCount == 0) ? 0.0 : ((double) wonCount / betCount) * 100.0;
        double profitFactor = (totalWagered == 0) ? 0.0 : (double) totalPayout / totalWagered;

        return Snapshot.builder()
                .strategyName(strategyName)
                .roundNumber(roundNumber)
                .virtualBalance(balance)
                .startBalance(startBalance)
                .lastProfit(balance - oldBalance)
                .lastBets(List.copyOf(bets))
                .roundBetAmount(BetHelper.getTotalBetValue(bets))
                .netProfit(netProfit)
                .roiPercentage(roiPercentage)
                .winRatePercentage(winRatePercentage)
                .lastSpot(spot)
                .betCount(betCount)
                .totalWon(wonCount)
                .totalLost(lostCount)
                .peakBalance(peakBalance)
                .totalWagered(totalWagered)
                .totalPayout(totalPayout)
                .currentDrawdown(drawdown)
                .maxDrawdown(maxDrawdown * 100)
                .profitFactor(profitFactor)
                .isLive(isLive)
                .build();
    }

    public   double getAverage() {
        return betCount == 0 ? 0 : (double) wonCount / betCount;
    }

    public   void incrementRoundNumber() {
        roundNumber++;
    }

    public void incrementWon() {
        wonCount++;
    }

    public void incrementLost() {
        lostCount++;
    }

    public   void incrementBet() {
        betCount++;
    }

    public  void resetCount() {
        betCount = 0;
        wonCount = 0;
        lostCount = 0;
        roundNumber = 0;
    }

    public  double updateDrawdown(long balance) {
        if (peakBalance > 0) {
            double cMaxDrawdown = (double) (peakBalance - balance) / peakBalance;
            if (cMaxDrawdown > maxDrawdown) {
                maxDrawdown = cMaxDrawdown;
            }
        }
        return maxDrawdown;
    }

    public   void updateHistory(long balance) {
        historyBalance.offer(balance);
        if (historyBalance.size() > BALANCE_HISTORY_SIZE) historyBalance.poll();
    }

    public    long updatePeak(long balance) {
        if (balance > peakBalance) {
            peakBalance = balance;
        }
        return peakBalance;
    }

    public  String getStrategyName() {
        return strategyName;
    }

    public   long getStartBalance() {
        return startBalance;
    }

    public   Queue<Long> getHistoryBalance() {
        return historyBalance;
    }

    public  long getWonCount() {
        return wonCount;
    }

    public  void setWonCount(long wonCount) {
        this.wonCount = wonCount;
    }

    public  long getLostCount() {
        return lostCount;
    }

    public  void setLostCount(long lostCount) {
        this.lostCount = lostCount;
    }

    public   long getBetCount() {
        return betCount;
    }

    public   void setBetCount(long betCount) {
        this.betCount = betCount;
    }

    public    long getRoundNumber() {
        return roundNumber;
    }

    public  void setRoundNumber(long roundNumber) {
        this.roundNumber = roundNumber;
    }

    public  double getMaxDrawdown() {
        return maxDrawdown;
    }

    public   void setMaxDrawdown(double maxDrawdown) {
        this.maxDrawdown = maxDrawdown;
    }

    public   long getPeakBalance() {
        return peakBalance;
    }

    public   void setPeakBalance(long peakBalance) {
        this.peakBalance = peakBalance;
    }

    public  long getTotalWagered() {
        return totalWagered;
    }

    public  void setTotalWagered(long totalWagered) {
        this.totalWagered = totalWagered;
    }

    public    long getTotalPayout() {
        return totalPayout;
    }

    public   void setTotalPayout(long totalPayout) {
        this.totalPayout = totalPayout;
    }
}