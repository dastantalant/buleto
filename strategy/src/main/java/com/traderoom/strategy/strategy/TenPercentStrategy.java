package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;

import java.util.Collections;
import java.util.List;

public class TenPercentStrategy extends BaseStrategy {

    private static final BetType TYPE = BetType.RED;
    private static final double BET_PERCENTAGE = 0.10;

    public TenPercentStrategy(Context context) {
        super(context);
    }

    @Override
    public String getName() {
        return TenPercentStrategy.class.getSimpleName();
    }

    @Override
    public List<Bet> getNextInternal(Context context) {
        long desiredBet = (long) (curBalance * BET_PERCENTAGE);
        desiredBet = Math.min(desiredBet, context.getMax());
        long finalBetValue = Math.max(desiredBet, context.getMin());
        if (curBalance < finalBetValue) {
            return Collections.emptyList();
        }
        return Collections.singletonList(Bet.builder().type(TYPE).value(finalBetValue).build());
    }
}