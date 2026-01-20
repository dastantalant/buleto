package com.traderoom.strategy.base.strategies;


import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.base.AbstractStrategy;

import java.util.List;

@AStrategy
public class ReverseMartingaleRedStrategy extends AbstractStrategy {

    private final BetType type;

    public ReverseMartingaleRedStrategy(Config config) {
        super(config);
        type = BetType.RED;
    }

    @Override
    public List<Bet> decide(State state) {
        long last = getLastBet();
        boolean b = (isLastBetWon(state) && last < (getConfig().minBet() * Math.pow(2, 5)));
        long value = b ? last * 2 : getConfig().minBet();
        return Bet.list(type, value);
    }
}
