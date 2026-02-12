package com.traderoom.strategy.strategies;

import com.traderoom.api.enums.BetType;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.AbstractStrategy;

import java.util.List;

@Strategy(tags = {Tag.PROGRESSIVE})
public class BarnetStrategy extends AbstractStrategy {
    private final BetType type = BetType.RED;
    private int count;

    public BarnetStrategy(Config config) {
        super(config);
    }

    @Override
    public List<Bet> decide() {
        count = isLastBetWon() ? (count + 1) : 0;

        long minBet = getMinBet();

        return switch (count % 4) {
            case 0 -> Bet.list(type, minBet);
            case 1 -> Bet.list(type, minBet * 3);
            case 2 -> Bet.list(type, minBet * 2);
            case 3 -> Bet.list(type, minBet * 6);
            default -> throw new IllegalArgumentException();
        };
    }
}