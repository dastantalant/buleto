package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.base.AbstractStrategy;

import java.util.List;

@AStrategy
public class ThirtyOneSystemStrategy extends AbstractStrategy {

    private final BetType type;

    private boolean wonSecondFromLastBet;
    private int count;

    public ThirtyOneSystemStrategy(Config config) {
        super(config);
        type = BetType.RED;
    }

    @Override
    public List<Bet> decide(State state) {
        boolean wasLastBetWon = isLastBetWon(state);
        count = ((wonSecondFromLastBet && wasLastBetWon) || ((count - 1) % 9 == 7 && !wasLastBetWon)) ? 0 : (count + 1);
        wonSecondFromLastBet = wasLastBetWon;
        return switch (count % 9) {
            case 0, 1, 2 -> Bet.list(type, getConfig().minBet());
            case 3, 4 -> Bet.list(type, getConfig().minBet() * 2);
            case 5, 6 -> Bet.list(type, getConfig().minBet() * 4);
            case 7, 8 -> Bet.list(type, getConfig().minBet() * 8);
            default -> throw new IllegalArgumentException();
        };
    }
}