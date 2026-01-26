package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.base.AbstractStrategy;

import java.util.List;

@AStrategy
public class GoodmanStrategy extends AbstractStrategy {

    private final BetType type;
    private int count;

    public GoodmanStrategy(Config config) {
        super(config);
        type = BetType.RED;
    }

    @Override
    public List<Bet> decide(State state) {
        count = isLastBetWon(state) ? (count + 1) : 0;
        return switch (count) {
            case 0 -> Bet.list(type, getConfig().minBet());
            case 1 -> Bet.list(type, getConfig().minBet() * 2);
            case 2 -> Bet.list(type, getConfig().minBet() * 3);
            default -> Bet.list(type, getConfig().minBet() * 5);
        };
    }
}