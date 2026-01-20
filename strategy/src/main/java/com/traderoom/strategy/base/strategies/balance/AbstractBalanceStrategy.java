package com.traderoom.strategy.base.strategies.balance;

import com.traderoom.strategy.base.AbstractStrategy;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;

import java.util.List;
import java.util.function.Supplier;

public abstract class AbstractBalanceStrategy extends AbstractStrategy {
    protected AbstractBalanceStrategy(Config config) {
        super(config);
    }

    protected List<Bet> processBet(BetType first, State state, Supplier<BetType> supplier) {
        if (state.getMarketData().getHistory().isEmpty()) {
            return create(first, getConfig().minBet(), state);
        }
        long value = (!isLastBet() || isLastBetWon(state)) ? getConfig().minBet() : getLastBet() * 2;
        return create(supplier.get(), value, state);
    }

    protected List<Bet> create(BetType type, long value, State state) {
        long balance = getBalance();
        long safeValue = Math.min(value, balance);
        if (safeValue <= 0 && balance > 0) {
            safeValue = getConfig().minBet();
        } else if (safeValue <= 0) {
            return List.of();
        }
        return Bet.list(type, safeValue);
    }
}
