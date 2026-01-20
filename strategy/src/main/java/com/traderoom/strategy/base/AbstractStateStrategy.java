package com.traderoom.strategy.base;

import com.traderoom.strategy.api.IStrategy;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.utils.BetHelper;

import lombok.Getter;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public abstract class AbstractStateStrategy implements IStrategy {

    @Getter
    private final Config config;
    @Getter
    private long balance;
    @Getter
    private List<Bet> lastBets;
    @Getter
    private boolean stopped;
    private final Queue<Long> historyBalance;

    protected AbstractStateStrategy(Config config) {
        this.config = config;
        this.balance = config.startBalance();
        historyBalance = new LinkedList<>();
        lastBets = Collections.emptyList();
    }

    void setBalance(long balance) {
        this.balance = balance;
    }

    protected boolean isLastBetWon(State state) {
        Spot lastSpot = state.getMarketData().getLastSpot();
        var bets = getLastBets();
        if (bets == null || bets.isEmpty() || lastSpot == null) {
            return false;
        }
        return BetHelper.hasWin(bets, lastSpot);
    }

    protected boolean isLastBet() {
        return lastBets != null && !lastBets.isEmpty();
    }

    protected long getLastBet() {
        return BetHelper.getTotalBetValue(lastBets);
    }

    protected void setLastBets(List<Bet> lastBets) {
        this.lastBets = lastBets;
    }

    public void stop() {
        stopped = true;
    }

    protected Queue<Long> getHistoryBalance() {
        return historyBalance;
    }
}