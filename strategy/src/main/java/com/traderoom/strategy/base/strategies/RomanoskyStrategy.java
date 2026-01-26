
package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.base.AbstractStrategy;

import java.util.List;

@AStrategy
public class RomanoskyStrategy extends AbstractStrategy {

    public RomanoskyStrategy(Config config) {
        super(config);
    }

    @Override
    public List<Bet> decide(State state) {
        long value = getConfig().minBet();
        return List.of(
                Bet.of(BetType.FIRST_DOZEN, value * 3),
                Bet.of(BetType.SECOND_DOZEN, value * 3),
                Bet.of(BetType.CORNER_1_2_4_5, value),
                Bet.of(BetType.CORNER_32_33_35_36, value));
    }
}