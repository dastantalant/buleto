package com.traderoom.strategy.strategies;

import com.traderoom.api.enums.BetType;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.AbstractStrategy;

import java.util.List;

@Strategy(tags = {Tag.COVERAGE})
public class Rate9946PercentStrategy extends AbstractStrategy {

    public Rate9946PercentStrategy(Config config) {
        super(config);
    }

    @Override
    public List<Bet> decide() {
        if (4 <= getMarket().getHistory().size()) {
            Spot spot1 = getMarket().getHistory().get(getMarket().getHistory().size() - 4);
            Spot spot2 = getMarket().getHistory().get(getMarket().getHistory().size() - 3);
            Spot spot3 = getMarket().getHistory().get(getMarket().getHistory().size() - 2);
            Spot spot4 = getMarket().getHistory().getLast();
            if (spot1.isFirstDozenOrZeroAndDoubleZero()
                    && spot2.isFirstDozenOrZeroAndDoubleZero()
                    && spot3.isFirstDozenOrZeroAndDoubleZero()
                    && spot4.isFirstDozenOrZeroAndDoubleZero()) {
                return List.of(Bet.of(BetType.SECOND_DOZEN, getMinBet()), Bet.of(BetType.THIRD_DOZEN, getMinBet()));
            }
        }
        return List.of();
    }
}
