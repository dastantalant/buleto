package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.Constant;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.utils.BetHelper;

import java.util.ArrayList;
import java.util.List;

public class RandomStrategy2 extends BaseStrategy {

    private static final int SIZE = 10;

    public RandomStrategy2(Context context) {
        super(context);
    }

    @Override
    public String getName() {
        return RandomStrategy2.class.getSimpleName();
    }

    @Override
    public List<Bet> getNextInternal(Context context) {
        List<Bet> betList = new ArrayList<>();
        List<BetType> betTypeList = BetType.getAvailableList(context.getRouletteType());
        if (wasLastBetWon(context)) {
            for (Bet bet : lastBets) {
                if (BetHelper.isWin(bet, context.getLastSpot())) {
                    betList.add(bet);
                }
            }
        }
        while (betList.size() < SIZE) {
            BetType type = betTypeList.get(Constant.RANDOM.nextInt(betTypeList.size()));
            int multiplier = Constant.RANDOM.nextInt(10) + 1;
            betList.add(Bet.builder()
                    .type(type)
                    .value(context.getMin() * multiplier)
                    .build());
        }
        return betList;
    }
}