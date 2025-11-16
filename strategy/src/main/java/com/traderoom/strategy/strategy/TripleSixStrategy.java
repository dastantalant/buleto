package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.model.Bet;

import java.util.List;

import static com.traderoom.strategy.enums.BetType.RED;
import static com.traderoom.strategy.enums.BetType.SPLIT_0_2;
import static com.traderoom.strategy.enums.BetType.SPLIT_10_13;
import static com.traderoom.strategy.enums.BetType.SPLIT_17_20;
import static com.traderoom.strategy.enums.BetType.SPLIT_26_29;
import static com.traderoom.strategy.enums.BetType.SPLIT_28_31;
import static com.traderoom.strategy.enums.BetType.SPLIT_8_11;
import static com.traderoom.strategy.enums.BetType.STRAIGHT_UP_15;
import static com.traderoom.strategy.enums.BetType.STRAIGHT_UP_4;
import static com.traderoom.strategy.enums.BetType.STRAIGHT_UP_6;

public class TripleSixStrategy extends BaseStrategy {

    public TripleSixStrategy(Context context) {
        super(context);
    }

    @Override
    public String getName() {
        return TripleSixStrategy.class.getSimpleName();
    }

    @Override
    public List<Bet> getNextInternal(Context context) {
        return List.of(Bet.builder().type(RED).value(context.getMin() * 36).build(),
                Bet.builder().type(SPLIT_0_2).value(context.getMin() * 4).build(),
                Bet.builder().type(SPLIT_8_11).value(context.getMin() * 4).build(),
                Bet.builder().type(SPLIT_10_13).value(context.getMin() * 4).build(),
                Bet.builder().type(SPLIT_17_20).value(context.getMin() * 4).build(),
                Bet.builder().type(SPLIT_26_29).value(context.getMin() * 4).build(),
                Bet.builder().type(SPLIT_28_31).value(context.getMin() * 4).build(),
                Bet.builder().type(STRAIGHT_UP_4).value(context.getMin() * 2).build(),
                Bet.builder().type(STRAIGHT_UP_6).value(context.getMin() * 2).build(),
                Bet.builder().type(STRAIGHT_UP_15).value(context.getMin() * 2).build());
    }
}