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
public class Rate9848PercentStrategy extends AbstractStrategy {

    public Rate9848PercentStrategy(Config config) {
        super(config);
    }

    @Override
    public List<Bet> decide() {
        if (3 <= getMarket().getHistory().size()) {
            Spot spot1 = getMarket().getHistory().get(getMarket().getHistory().size() - 3);
            Spot spot2 = getMarket().getHistory().get(getMarket().getHistory().size() - 2);
            Spot spot3 = getMarket().getHistory().getLast();
            if (spot1.isFirstDozenOrZeroAndDoubleZero()
                    && spot2.isFirstDozenOrZeroAndDoubleZero()
                    && spot3.isFirstDozenOrZeroAndDoubleZero()) {
                var lastBets = getLastBets();
                long value = (lastBets != null && !lastBets.isEmpty()) ? lastBets.getFirst().value() * 2 : getMinBet();
                return List.of(Bet.of(BetType.SECOND_DOZEN, value), Bet.of(BetType.THIRD_DOZEN, value));
            }
        }
        return List.of();
    }
}
