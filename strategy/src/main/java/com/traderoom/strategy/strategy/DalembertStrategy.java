package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.utils.BettingHelper;

import java.util.List;

public class DalembertStrategy extends BaseStrategy {

    private int multiplier;

    public DalembertStrategy(Context context) {
        super(context);
        multiplier = 1;
    }

    @Override
    public String getName() {
        return DalembertStrategy.class.getSimpleName();
    }

    @Override
    public List<Bet> getNextInternal(Context context) {
        if (hasLastBet()) {
            multiplier = wasLastBetWon(context) ? Math.max(1, multiplier - 1) : multiplier + 1;
        }

        long totalBetAmount = context.getMin() * multiplier;

        return BettingHelper.createDiversifiedBets(totalBetAmount, context);
    }
}