package com.traderoom.strategy.strategies;

import com.traderoom.api.enums.BetType;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.AbstractStrategy;

import java.util.List;

@Strategy(tags = {Tag.PATTERN})
public class SevenKaimeStrategy extends AbstractStrategy {

    public SevenKaimeStrategy(Config config) {
        super(config);
    }

    @Override
    public List<Bet> decide() {
        boolean matched = true;
        if (7 <= getMarket().getHistory().size()) {
            for (int i = 0; i < 7; i++) {
                if (getMarket().getHistory().get(getMarket().getHistory().size() - (1 + i)).isBlack()) {
                    matched = false;
                    break;
                }
            }
        }
        return matched ? Bet.list(BetType.RED, getMinBet()) : List.of();
    }
}
