package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.base.AbstractStrategy;

import java.util.List;

@AStrategy
public class Rate9848PercentStrategy extends AbstractStrategy {

    public Rate9848PercentStrategy(Config config) {
        super(config);
    }

    @Override
    public List<Bet> decide(State state) {
        if (3 <= state.getMarketData().getHistory().size()) {
            Spot spot1 = state.getMarketData().getHistory().get(state.getMarketData().getHistory().size() - 3);
            Spot spot2 = state.getMarketData().getHistory().get(state.getMarketData().getHistory().size() - 2);
            Spot spot3 = state.getMarketData().getHistory().getLast();
            if (spot1.isFirstDozenOrZeroAndDoubleZero()
                    && spot2.isFirstDozenOrZeroAndDoubleZero()
                    && spot3.isFirstDozenOrZeroAndDoubleZero()) {
                var lastBets = getLastBets();
                long value = (lastBets != null && !lastBets.isEmpty()) ? lastBets.getFirst().value() * 2 : getConfig().minBet();
                return List.of(Bet.of(BetType.SECOND_DOZEN, value), Bet.of(BetType.THIRD_DOZEN, value));
            }
        }
        return List.of();
    }
}
