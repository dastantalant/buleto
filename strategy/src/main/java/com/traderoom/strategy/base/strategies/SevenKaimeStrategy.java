package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.base.AbstractStrategy;

import java.util.List;

@AStrategy
public class SevenKaimeStrategy extends AbstractStrategy {

    public SevenKaimeStrategy(Config config) {
        super(config);
    }

    @Override
    public List<Bet> decide(State state) {
        boolean matched = true;
        if (7 <= state.getMarketData().getHistory().size()) {
            for (int i = 0; i < 7; i++) {
                if (state.getMarketData().getHistory().get(state.getMarketData().getHistory().size() - (1 + i)).isBlack()) {
                    matched = false;
                    break;
                }
            }
        }
        return matched ? Bet.list(BetType.RED, getConfig().minBet()) : List.of();
    }
}
