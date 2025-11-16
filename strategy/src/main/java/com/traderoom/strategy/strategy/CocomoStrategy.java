package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;

import java.util.Collections;
import java.util.List;


public class CocomoStrategy extends BaseStrategy {

    private static final BetType TYPE = BetType.FIRST_DOZEN;

    private long secondFromLastTotalBetValue;

    public CocomoStrategy(Context context) {
        super(context);
    }

    @Override
    public String getName() {
        return CocomoStrategy.class.getSimpleName();
    }

    @Override
    public List<Bet> getNextInternal(Context context) {
        long lastValue = getLastTotalBetValue();
        long nextValue = secondFromLastTotalBetValue + lastValue;
        secondFromLastTotalBetValue = lastValue;
        return Collections.singletonList(Bet.builder()
                .type(TYPE)
                .value(wasLastBetWon(context) ? context.getMin() : (nextValue > 0) ? nextValue : context.getMin())
                .build());
    }
}