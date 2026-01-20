package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.base.AbstractStrategy;

import java.util.List;

@AStrategy
public class CocomoStrategy extends AbstractStrategy {

    private final BetType type;
    private long secondBetValue;

    public CocomoStrategy(Config config) {
        super(config);
        type = BetType.FIRST_DOZEN;
    }

    public List<Bet> decide(State state) {
        long lastValue = getLastBet();
        long nextValue = secondBetValue + lastValue;
        secondBetValue = lastValue;
        long value = isLastBetWon(state) ? getConfig().minBet()
                : Math.clamp(nextValue, getConfig().minBet(), getConfig().maxBet());
        return Bet.list(type, value);
    }
}