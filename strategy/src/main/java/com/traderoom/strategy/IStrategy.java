package com.traderoom.strategy;

import com.traderoom.strategy.api.Maker;
import com.traderoom.strategy.api.Metric;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Snapshot;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.api.Publisher;
import com.traderoom.strategy.stop.StopCondition;
import com.traderoom.strategy.utils.BetHelper;

import java.io.Serializable;
import java.util.List;

public interface IStrategy extends Metric, Maker, Publisher, Serializable {

    Snapshot playTurn(Spot spot, State state);

    Snapshot endGame(State state);

//    State getState();

    void stop();

    boolean isLive();

    List<StopCondition> getStopConditions();

    default boolean canContinue(State state) {
        boolean canContinue = getBalance() > 0 && isLive();
        for (StopCondition condition : getStopConditions()) {
            if (condition.should(this, state)) {
                stop();
                canContinue = false;
                break;
            }
        }
        return canContinue;
    }

    default Snapshot snapshot() {
        return snapshot(List.of(), null, getBalance());
    }

    default Snapshot snapshot(List<Bet> bets, Spot spot, long oldBalance) {
        long balance = getBalance();
        long startBalance = getStartBalance();
        long peakBalance = getPeakBalance();
        long netProfit = balance - startBalance;

        double drawdown = ((peakBalance > 0) ? (double) (peakBalance - balance) / peakBalance : 0) * 100;

        double maxDrawdown = getMaxDrawdown() * 100;

        double roiPercentage = (startBalance == 0) ? 0.0 : ((double) netProfit / startBalance) * 100.0;
        long roundNumber = getBetCount();

        long totalWon = getWonCount();
        long totalLost = getLostCount();
        double winRatePercentage = (roundNumber == 0) ? 0.0 : ((double) totalWon / roundNumber) * 100.0;

        long totalWagered = getTotalWagered();
        long totalPayout = getTotalPayout();
        double profitFactor = (totalWagered == 0) ? 0.0 : (double) totalPayout / totalWagered;

        return Snapshot.builder()
                .strategyName(getName())
                .roundNumber(roundNumber)
                .balance(balance)
                .startBalance(startBalance)
                .lastProfit(balance - oldBalance)
                .lastBets(List.copyOf(bets))
                .roundBetAmount(BetHelper.getTotalBetValue(bets))
                .netProfit(netProfit)
                .roiPercentage(roiPercentage)
                .winRatePercentage(winRatePercentage)
                .lastSpot(spot)
                .totalWon(totalWon)
                .totalLost(totalLost)
                .totalWagered(totalWagered)
                .totalPayout(totalPayout)
                .currentDrawdown(drawdown)
                .maxDrawdown(maxDrawdown)
                .profitFactor(profitFactor)
                .isStopped(!isLive())
                .build();
    }
}
