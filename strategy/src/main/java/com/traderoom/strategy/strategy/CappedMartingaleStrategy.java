package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;

import java.util.Collections;
import java.util.List;

public class CappedMartingaleStrategy extends BaseStrategy {

    private static final BetType TYPE = BetType.RED;
    private static final int MAX_LOSS_STREAK = 5;

    private int lossStreak = 0;

    public CappedMartingaleStrategy(Context context) {
        super(context);
    }

    @Override
    public String getName() {
        return CappedMartingaleStrategy.class.getSimpleName();
    }

    @Override
    public List<Bet> getNextInternal(Context context) {
        if (hasLastBet()) {
            if (wasLastBetWon(context)) {
                lossStreak = 0;
            } else {
                lossStreak++;
            }
        }

        long betValue;
        if (lossStreak >= MAX_LOSS_STREAK || !hasLastBet() || wasLastBetWon(context)) {
            if (lossStreak >= MAX_LOSS_STREAK) {
                lossStreak = 0;
            }
            betValue = context.getMin();
        } else {
            long lastBetValue = getLastTotalBetValue();
            betValue = lastBetValue * 2;
        }

        return create(betValue, context);
    }

    private List<Bet> create(long value, Context context) {
        long safeValue = Math.min(value, curBalance);
        if (safeValue <= 0 && curBalance > 0) {
            safeValue = context.getMin();
        }
        return Collections.singletonList(Bet.builder().type(TYPE).value(safeValue).build());
    }
}