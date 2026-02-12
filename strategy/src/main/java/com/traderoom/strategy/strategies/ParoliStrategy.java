package com.traderoom.strategy.strategies;

import com.traderoom.api.enums.BetType;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.AbstractStrategy;

import java.util.List;

@Strategy(tags = {Tag.PROGRESSIVE})
public class ParoliStrategy extends AbstractStrategy {

    private static final int MAX_PROGRESSION_LEVEL = 3;

    private final BetType type;
    private int current;

    public ParoliStrategy(Config config) {
        super(config);
        type = BetType.BLACK;
    }

    @Override
    public List<Bet> decide() {
        int temp = (current < MAX_PROGRESSION_LEVEL) ? current + 1 : 0;
        current = (!isLastBet() || !isLastBetWon()) ? 0 : temp;
        long min = getMinBet();
        long balance = getVirtualBalance();
        if (balance < min) {
            return List.of();
        }
        long attempted = min * (long) Math.pow(2, current);
        long clamp = Math.clamp(attempted, min, balance);
        return Bet.list(type, clamp);
    }
}