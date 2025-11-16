package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.Bet;

import java.util.Comparator;
import java.util.List;

public interface Strategy {

    List<Bet> getNext(Context context);

    String getName();

    long getLastTotalBetValue();

    void updateStrategyParameter(List<Bet> betList, Spot spot, Context context);

    boolean isLive(Context context);

    double getWinningAverage();

    long getAverageTotalBetValue();

    long getAverageTotalPayoutValue();

    long getCurBalance();

    static Comparator<Strategy> getBalanceComparator() {
        return (o1, o2) -> Long.compare(o2.getCurBalance(), o1.getCurBalance());
    }

    static Comparator<Strategy> getStrategyNameComparator() {
        return Comparator.comparing(Strategy::getName);
    }
}
