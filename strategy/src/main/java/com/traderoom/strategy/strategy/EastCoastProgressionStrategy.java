package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;

import java.util.Collections;
import java.util.List;

public class EastCoastProgressionStrategy extends BaseStrategy {

    private static final BetType TYPE = BetType.RED;

    public EastCoastProgressionStrategy(Context context) {
        super(context);
    }

    @Override
    public String getName() {
        return EastCoastProgressionStrategy.class.getSimpleName();
    }

    @Override
    public List<Bet> getNextInternal(Context context) {
        if (wasLastBetWon(context) && curBalance > startBalance) {
            long profit = curBalance - startBalance;
            long value = Math.max(profit / 2, context.getMin());
            return create(value, context);
        } else {
            return create(context.getMin() * 2, context);
        }
    }

    private List<Bet> create(long value, Context context) {
        long safeValue = Math.min(value, curBalance);
        if (safeValue <= 0 && curBalance > 0) {
            safeValue = context.getMin();
        }
        return Collections.singletonList(Bet.builder().type(TYPE).value(safeValue).build());
    }
}