package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;

import java.util.List;

public class MartingaleStrategy5 extends BaseStrategy {

    private static final List<BetType> TYPES = List.of(
            BetType.STRAIGHT_UP_2,
            BetType.STRAIGHT_UP_3,
            BetType.STRAIGHT_UP_4,
            BetType.STRAIGHT_UP_5,
            BetType.STRAIGHT_UP_6,
            BetType.STRAIGHT_UP_7,
            BetType.STRAIGHT_UP_8,
            BetType.STRAIGHT_UP_9,
            BetType.STRAIGHT_UP_10,
            BetType.STRAIGHT_UP_11,
            BetType.STRAIGHT_UP_12,
            BetType.STRAIGHT_UP_13,
            BetType.STRAIGHT_UP_14,
            BetType.STRAIGHT_UP_15,
            BetType.STRAIGHT_UP_16,
            BetType.STRAIGHT_UP_17,
            BetType.STRAIGHT_UP_18,
            BetType.STRAIGHT_UP_19,
            BetType.STRAIGHT_UP_20,
            BetType.STRAIGHT_UP_21,
            BetType.STRAIGHT_UP_22,
            BetType.STRAIGHT_UP_23,
            BetType.STRAIGHT_UP_24,
            BetType.STRAIGHT_UP_25,
            BetType.STRAIGHT_UP_26,
            BetType.STRAIGHT_UP_27,
            BetType.STRAIGHT_UP_28,
            BetType.STRAIGHT_UP_29,
            BetType.STRAIGHT_UP_30,
            BetType.STRAIGHT_UP_31,
            BetType.STRAIGHT_UP_32,
            BetType.STRAIGHT_UP_33,
            BetType.STRAIGHT_UP_34,
            BetType.STRAIGHT_UP_35,
            BetType.STRAIGHT_UP_36
    );

    public MartingaleStrategy5(Context context) {
        super(context);
    }

    @Override
    public String getName() {
        return MartingaleStrategy5.class.getSimpleName();
    }

    @Override
    public List<Bet> getNextInternal(Context context) {
        long betValue;
        if (!hasLastBet() || wasLastBetWon(context)) {
            betValue = context.getMin();
        } else {
            long lastSingleBetValue = lastBets.getFirst().value();
            betValue = lastSingleBetValue * 18;
        }

        return create(betValue, context);
    }

    private List<Bet> create(long value, Context context) {
        long safeValue = Math.min(value, curBalance / TYPES.size());
        if (safeValue <= 0 && curBalance > 0) {
            safeValue = context.getMin();
        }
        final long finalValue = safeValue;
        return TYPES.stream()
                .map(type -> Bet.builder().type(type).value(finalValue).build())
                .toList();
    }
}
