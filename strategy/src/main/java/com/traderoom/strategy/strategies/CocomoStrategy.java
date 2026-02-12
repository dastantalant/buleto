package com.traderoom.strategy.strategies;

import com.traderoom.api.enums.BetType;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.AbstractStrategy;

import java.util.List;

@Strategy(tags = {Tag.PROGRESSIVE})
public class CocomoStrategy extends AbstractStrategy {

    private final BetType type;
    private long secondBetValue;

    public CocomoStrategy(Config config) {
        super(config);
        type = BetType.FIRST_DOZEN;
    }

    public List<Bet> decide() {
        long lastValue = getLastBet();
        long nextValue = secondBetValue + lastValue;
        secondBetValue = lastValue;
        long value = isLastBetWon() ? getMinBet()
                : Math.clamp(nextValue, getMinBet(), getMaxBet());
        return Bet.list(type, value);
    }
}