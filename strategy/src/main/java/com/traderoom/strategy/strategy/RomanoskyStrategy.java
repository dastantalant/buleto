
package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;

import java.util.ArrayList;
import java.util.List;

public class RomanoskyStrategy extends BaseStrategy {

    public RomanoskyStrategy(Context context) {
        super(context);
    }

    @Override
    public String getName() {
        return RomanoskyStrategy.class.getSimpleName();
    }

    @Override
    protected List<Bet> getNextInternal(Context context) {
        List<Bet> bets = new ArrayList<>();

        long baseUnit = context.getMin();

        bets.add(Bet.builder().type(BetType.FIRST_DOZEN).value(baseUnit * 3).build());

        bets.add(Bet.builder().type(BetType.SECOND_DOZEN).value(baseUnit * 3).build());

        bets.add(Bet.builder().type(BetType.CORNER_1_2_4_5).value(baseUnit).build());

        bets.add(Bet.builder().type(BetType.CORNER_32_33_35_36).value(baseUnit).build());

        return bets;
    }
}