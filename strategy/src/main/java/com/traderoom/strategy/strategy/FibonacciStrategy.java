package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.utils.BettingHelper;

import java.util.Collections;
import java.util.List;

public class FibonacciStrategy extends BaseStrategy {

    private long fibPrev;
    private long fibCurrent;

    public FibonacciStrategy(Context context) {
        super(context);
        resetSequence();
    }

    @Override
    public String getName() {
        return FibonacciStrategy.class.getSimpleName();
    }

    @Override
    protected List<Bet> getNextInternal(Context context) {
        if (hasLastBet()) {
            if (wasLastBetWon(context)) {
                long newPrev = Math.max(0, fibPrev - (fibCurrent - fibPrev));
                long newCurrent = fibPrev;
                fibPrev = newPrev;
                fibCurrent = newCurrent;
                if (fibCurrent <= 0) {
                    resetSequence();
                }
            } else {
                long newCurrent = fibPrev + fibCurrent;
                fibPrev = fibCurrent;
                fibCurrent = newCurrent;
            }
        }

        long betMultiplier = fibCurrent > 0 ? fibCurrent : 1;
        long totalBetAmount = context.getMin() * betMultiplier;

        long safeBetAmount = Math.min(totalBetAmount, curBalance);

        if (safeBetAmount < context.getMin()) {
            return Collections.emptyList();
        }

        return BettingHelper.createDiversifiedBets(safeBetAmount, context);
    }

    private void resetSequence() {
        this.fibPrev = 0;
        this.fibCurrent = 1;
    }
}