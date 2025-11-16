package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;

import java.util.Collections;
import java.util.List;

public class GoodmanStrategy extends BaseStrategy {

    private static final BetType TYPE = BetType.RED;

    private int count;

    public GoodmanStrategy(Context context) {
        super(context);
    }

    @Override
    public String getName() {
        return GoodmanStrategy.class.getSimpleName();
    }

    @Override
    public List<Bet> getNextInternal(Context context) {
        count = wasLastBetWon(context) ? (count + 1) : 0;
        return switch (count) {
            case 0 -> create(context.getMin());
            case 1 -> create(context.getMin() * 2);
            case 2 -> create(context.getMin() * 3);
            default -> create(context.getMin() * 5);
        };
    }

    private List<Bet> create(long value) {
        return Collections.singletonList(Bet.builder().type(TYPE).value(value).build());
    }
}