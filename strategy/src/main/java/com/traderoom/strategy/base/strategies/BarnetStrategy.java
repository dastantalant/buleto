package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.base.AbstractStrategy;

import java.util.List;

@AStrategy
public class BarnetStrategy extends AbstractStrategy {
    private final BetType type = BetType.RED;
    private int count;

    public BarnetStrategy(Config config) {
        super(config);
    }

    @Override
    public List<Bet> decide(State state) {
        count = isLastBetWon(state) ? (count + 1) : 0;

        long minBet = getConfig().minBet();

        return switch (count % 4) {
            case 0 -> Bet.list(type, minBet);
            case 1 -> Bet.list(type, minBet * 3);
            case 2 -> Bet.list(type, minBet * 2);
            case 3 -> Bet.list(type, minBet * 6);
            default -> throw new IllegalArgumentException();
        };
    }
}