package com.traderoom.strategy.strategy;


import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;

import java.util.Collections;
import java.util.List;

public class ReverseMartingaleRedStrategy extends BaseStrategy {

    private static final BetType TYPE = BetType.RED;

    public ReverseMartingaleRedStrategy(Context context) {
        super(context);
    }

    @Override
    public String getName() {
        return ReverseMartingaleRedStrategy.class.getSimpleName();
    }

    @Override
    public List<Bet> getNextInternal(Context context) {
        long value = getLastTotalBetValue();
       return Collections.singletonList(Bet.builder()
                .type(TYPE)
                .value((wasLastBetWon(context) && value < (context.getMin() * Math.pow(2, 5))) ? value * 2 : context.getMin())
                .build());
    }
}
