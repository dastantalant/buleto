package com.traderoom.strategy.strategies;

import com.traderoom.api.enums.BetType;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.AbstractStrategy;

import java.util.Deque;
import java.util.List;

@Strategy(tags = {Tag.PATTERN})
public class SevenKaimeStrategy extends AbstractStrategy {

    public SevenKaimeStrategy(Config config) {
        super(config);
    }

    @Override
    public List<Bet> decide() {
        Deque<Spot> history = getMarket().getHistory();
        if (history.size() < 7) return List.of();
        var it = history.descendingIterator();
        boolean allRed = true;
        for (int i = 0; i < 7 && it.hasNext(); i++) {
            if (it.next().isBlack()) {
                allRed = false;
                break;
            }
        }
        return allRed ? Bet.list(BetType.RED, getMinBet()) : List.of();
    }
}
