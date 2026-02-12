package com.traderoom.strategy.strategies;

import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.AbstractStrategy;
import com.traderoom.strategy.BettingHelper;

import java.util.List;

@Strategy(tags = {Tag.PROGRESSIVE})
public class DAlembertStrategy extends AbstractStrategy {

    private int multiplier;

    public DAlembertStrategy(Config config) {
        super(config);
        multiplier = 1;
    }

    @Override
    public List<Bet> decide() {
        if (isLastBet()) {
            multiplier = isLastBetWon() ? Math.max(1, multiplier - 1) : multiplier + 1;
        }

        return BettingHelper.createDiversifiedBets(getMinBet() * multiplier, getState(), getConfig());
    }
}