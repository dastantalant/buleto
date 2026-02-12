package com.traderoom.strategy.strategies;

import com.traderoom.api.enums.BetType;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.AbstractStrategy;

import java.util.List;

@Strategy(tags = {Tag.PROGRESSIVE})
public class ThirtyOneSystemStrategy extends AbstractStrategy {

    private final BetType type;

    private boolean wonSecondFromLastBet;
    private int count;

    public ThirtyOneSystemStrategy(Config config) {
        super(config);
        type = BetType.RED;
    }

    @Override
    public List<Bet> decide() {
        boolean wasLastBetWon = isLastBetWon();
        count = ((wonSecondFromLastBet && wasLastBetWon) || ((count - 1) % 9 == 7 && !wasLastBetWon)) ? 0 : (count + 1);
        wonSecondFromLastBet = wasLastBetWon;
        return switch (count % 9) {
            case 0, 1, 2 -> Bet.list(type, getMinBet());
            case 3, 4 -> Bet.list(type, getMinBet() * 2);
            case 5, 6 -> Bet.list(type, getMinBet() * 4);
            case 7, 8 -> Bet.list(type, getMinBet() * 8);
            default -> throw new IllegalArgumentException();
        };
    }
}