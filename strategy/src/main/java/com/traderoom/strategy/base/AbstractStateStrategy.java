package com.traderoom.strategy.base;

import com.traderoom.strategy.IStrategy;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.MarketData;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.utils.BetHelper;

import lombok.Getter;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;
import java.util.Queue;
import java.util.UUID;

public abstract class AbstractStateStrategy implements IStrategy {
    private final UUID id = UUID.randomUUID();

    @Getter
    private final Config config;
    @Getter
    private long balance;
    @Getter
    private List<Bet> lastBets;
    @Getter
    private boolean live;
    private final Queue<Long> historyBalance;
//    @Getter
//    protected final State state;

    protected AbstractStateStrategy(Config config) {
        this.config = config;
        this.balance = config.startBalance();
        historyBalance = new LinkedList<>();
        lastBets = Collections.emptyList();
        live = true;
//        MarketData marketData = new MarketData();
//        if (!config.initialHistory().isEmpty()) {
//            for (Integer number : config.initialHistory()) {
//                try {
//                    marketData.addSpot(Spot.getByNumber(number));
//                } catch (Exception ignored) {}
//            }
//        }
//        state = State.of(config.startBalance(), marketData);
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
        live = false;
    }

    protected Queue<Long> getHistoryBalance() {
        return historyBalance;
    }
//    public MarketData getMarketData() {
//        return state.getMarketData();
//    }

    @Override
    public final int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public final boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        AbstractStateStrategy that = (AbstractStateStrategy) obj;
        return Objects.equals(id, that.id);
    }
}