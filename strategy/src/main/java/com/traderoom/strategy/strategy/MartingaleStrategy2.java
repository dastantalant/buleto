package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;

import java.util.Collections;
import java.util.List;

import static com.traderoom.strategy.enums.BetType.BLACK;
import static com.traderoom.strategy.enums.BetType.RED;


public class MartingaleStrategy2 extends BaseStrategy {

    public MartingaleStrategy2(Context context) {
        super(context);
    }

    @Override
    public String getName() {
        return MartingaleStrategy2.class.getSimpleName();
    }

    @Override
    public List<Bet> getNextInternal(Context context) {
        BetType typeToBetOn = context.getBlackRate() <= context.getRedRate() ? RED : BLACK;
        if (!hasLastBet() || wasLastBetWon(context)) {
            return create(typeToBetOn, context.getMin(), context);
        } else {
            long lastBetValue = getLastTotalBetValue();
            return create(typeToBetOn, lastBetValue * 2, context);
        }
    }

    private List<Bet> create(BetType type, long value, Context context) {
        long safeValue = Math.min(value, curBalance);
        if (safeValue <= 0 && curBalance > 0) {
            safeValue = context.getMin();
        }
        return Collections.singletonList(Bet.builder().type(type).value(safeValue).build());
    }
}