package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.base.AbstractStrategy;

import java.util.List;

@AStrategy
public class ParoliStrategy extends AbstractStrategy {

    private static final int MAX_PROGRESSION_LEVEL = 3;

    private final BetType type;
    private int current;

    public ParoliStrategy(Config config) {
        super(config);
        type = BetType.BLACK;
    }

    @Override
    public List<Bet> decide(State state) {
        int temp = (current < MAX_PROGRESSION_LEVEL) ? current + 1 : 0;
        current = (!isLastBet() || !isLastBetWon(state)) ? 0 : temp;
        long min = getConfig().minBet();
        long balance = getBalance();
        if (balance < min) {
            return List.of();
        }
        long attempted = min * (long) Math.pow(2, current);
        long clamp = Math.clamp(attempted, min, balance);
        return Bet.list(type, clamp);
    }
}