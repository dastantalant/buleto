package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.base.AbstractStrategy;

import java.util.List;

@AStrategy
public class TenPercentStrategy extends AbstractStrategy {

    private final BetType type;
    private final double percentage;

    public TenPercentStrategy(Config config) {
        super(config);
        type = BetType.RED;
        percentage = 0.10;
    }

    @Override
    public List<Bet> decide(State state) {
        long balance = getBalance();
        long value = Math.clamp((long) (balance * percentage), getConfig().minBet(), getConfig().maxBet());
        if (balance < value) {
            return List.of();
        }
        return Bet.list(type, value);
    }
}