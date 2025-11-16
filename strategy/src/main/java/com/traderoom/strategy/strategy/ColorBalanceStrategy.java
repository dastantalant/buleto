package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;

import java.util.Collections;
import java.util.List;

public class ColorBalanceStrategy extends BaseStrategy {

    private static final double BALANCE_THRESHOLD = 0.45;
    private static final double GREEN_TOLERANCE_MULTIPLIER = 1.2;

    public ColorBalanceStrategy(Context context) {
        super(context);
    }

    @Override
    public String getName() {
        return ColorBalanceStrategy.class.getSimpleName();
    }

    @Override
    protected List<Bet> getNextInternal(Context context) {
        if (context.getSpotHistory().isEmpty()) {
            return createBet(BetType.RED, context.getMin(), context);
        }

        double redRate = context.getRedRate();
        double blackRate = context.getBlackRate();
        double totalRedBlack = redRate + blackRate;

        BetType typeToBetOn = null;
        if (totalRedBlack > 0) {
            double adjustedRedRate = redRate / totalRedBlack;
            double adjustedBlackRate = blackRate / totalRedBlack;

            if (adjustedRedRate < BALANCE_THRESHOLD) {
                typeToBetOn = BetType.RED;
            } else if (adjustedBlackRate < BALANCE_THRESHOLD) {
                typeToBetOn = BetType.BLACK;
            }
        }

        if (typeToBetOn == null) {
            typeToBetOn = BetType.RED;
        }

        long betValue;
        if (!hasLastBet() || wasLastBetWon(context)) {
            betValue = context.getMin();
        } else {
            long lastBetValue = getLastTotalBetValue();
            betValue = lastBetValue * 2;
        }

        return createBet(typeToBetOn, betValue, context);
    }

    private List<Bet> createBet(BetType type, long value, Context context) {
        long safeValue = Math.min(value, curBalance);
        if (safeValue <= 0 && curBalance > 0) {
            safeValue = context.getMin();
        } else if (safeValue <= 0) {
            return Collections.emptyList();
        }
        return Collections.singletonList(Bet.builder().type(type).value(safeValue).build());
    }
}