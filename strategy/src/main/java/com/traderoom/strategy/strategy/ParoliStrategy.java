package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;

import java.util.Collections;
import java.util.List;

public class ParoliStrategy extends BaseStrategy {

    private static final BetType TYPE = BetType.BLACK;
    private static final int MAX_PROGRESSION_LEVEL = 3;

    private int currentProgressionLevel;
    private long baseBet;

    public ParoliStrategy(Context context) {
        super(context);
        this.currentProgressionLevel = 0;
        this.baseBet = context.getMin();
    }

    @Override
    public String getName() {
        return ParoliStrategy.class.getSimpleName();
    }

    @Override
    protected List<Bet> getNextInternal(Context context) {
        if (!hasLastBet() || !wasLastBetWon(context)) {
            currentProgressionLevel = 0;
        } else {
            if (currentProgressionLevel < MAX_PROGRESSION_LEVEL) {
                currentProgressionLevel++;
            } else {
                currentProgressionLevel = 0;
            }
        }

        long betValue = baseBet * (long) Math.pow(2, currentProgressionLevel);

        long safeBetValue = Math.min(betValue, curBalance);
        safeBetValue = Math.max(safeBetValue, context.getMin());

        if (safeBetValue <= 0) {
            return Collections.emptyList();
        }

        return Collections.singletonList(
                Bet.builder().type(TYPE).value(safeBetValue).build()
        );
    }
}