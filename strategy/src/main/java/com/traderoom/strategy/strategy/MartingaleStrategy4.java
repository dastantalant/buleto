package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;

import java.util.ArrayList;
import java.util.List;

public class MartingaleStrategy4 extends BaseStrategy {

    private static final BetType TYPE1 = BetType.FIRST_DOZEN;
    private static final BetType TYPE2 = BetType.SECOND_DOZEN;

    public MartingaleStrategy4(Context context) {
        super(context);
    }

    @Override
    public String getName() {
        return MartingaleStrategy4.class.getSimpleName();
    }

    @Override
    public List<Bet> getNextInternal(Context context) {
        long betValue;
        if (!hasLastBet() || wasLastBetWon(context)) {
            betValue = context.getMin();
        } else {
            long lastSingleBetValue = lastBets.getFirst().value();
            betValue = lastSingleBetValue * 3;
        }
        List<Bet> list = new ArrayList<>();
        list.add(createBet(TYPE1, betValue, context));
        list.add(createBet(TYPE2, betValue, context));
        return list;
    }

    private Bet createBet(BetType type, long value, Context context) {
        long safeValue = Math.min(value, curBalance / 2);
        if (safeValue <= 0 && curBalance > 0) {
            safeValue = context.getMin();
        }
        return Bet.builder().type(type).value(safeValue).build();
    }
}