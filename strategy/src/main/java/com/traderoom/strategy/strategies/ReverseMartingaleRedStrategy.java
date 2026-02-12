package com.traderoom.strategy.strategies;


import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.enums.BetType;
import com.traderoom.api.model.Bet;
import com.traderoom.api.AbstractStrategy;

import java.util.List;

@Strategy(tags = {Tag.PROGRESSIVE})
public class ReverseMartingaleRedStrategy extends AbstractStrategy {

    private final BetType type;

    public ReverseMartingaleRedStrategy(Config config) {
        super(config);
        type = BetType.RED;
    }

    @Override
    public List<Bet> decide() {
        long last = getLastBet();
        boolean b = (isLastBetWon() && last < (getMinBet() * Math.pow(2, 5)));
        long value = b ? last * 2 : getMinBet();
        return Bet.list(type, value);
    }
}
