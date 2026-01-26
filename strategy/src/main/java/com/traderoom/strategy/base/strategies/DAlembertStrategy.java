package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.base.AbstractStrategy;
import com.traderoom.strategy.utils.BettingHelper;

import java.util.List;

@AStrategy
public class DAlembertStrategy extends AbstractStrategy {

    private int multiplier;

    public DAlembertStrategy(Config config) {
        super(config);
        multiplier = 1;
    }

    @Override
    public List<Bet> decide(State state) {
        if (isLastBet()) {
            multiplier = isLastBetWon(state) ? Math.max(1, multiplier - 1) : multiplier + 1;
        }

        return BettingHelper.createDiversifiedBets(getConfig().minBet() * multiplier, state, getConfig());
    }
}