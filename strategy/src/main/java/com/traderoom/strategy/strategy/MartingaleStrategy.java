package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;

import java.util.Collections;
import java.util.List;

public class MartingaleStrategy extends BaseStrategy {

    private static final BetType TYPE = BetType.RED;

    public MartingaleStrategy(Context context) {
        super(context);
    }

    @Override
    public String getName() {
        return MartingaleStrategy.class.getSimpleName();
    }

    @Override
    public List<Bet> getNextInternal(Context context) {
        if (!hasLastBet() || wasLastBetWon(context)) {
            return create(context.getMin(), context);
        } else {
            long lastBetValue = getLastTotalBetValue();
            return create(lastBetValue * 2, context);
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