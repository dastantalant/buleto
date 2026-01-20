package com.traderoom.strategy.base.strategies.volatility;

import com.traderoom.strategy.base.AbstractStrategy;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;

import java.util.List;

public abstract class AbstractVolatilityStrategy extends AbstractStrategy {
    protected final BetType type;

    protected AbstractVolatilityStrategy(Config config) {
        super(config);
        type = BetType.RED;
    }

    protected List<Bet> create(BetType type, long value, State state) {
        long minBet = getConfig().minBet();
        long safeBalance = Math.max(0, getBalance());

        if (safeBalance < minBet) {
            return List.of();
        }

        double upper = Math.min(getConfig().maxBet(), safeBalance);

        long clamped = (long) Math.clamp(value, minBet, upper);

        return (clamped < minBet) ? List.of() : Bet.list(type, clamped);
    }
}
