package com.traderoom.strategy.strategies;

import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.enums.Constants;
import com.traderoom.api.enums.BetType;
import com.traderoom.api.model.Bet;
import com.traderoom.api.AbstractStrategy;
import com.traderoom.api.utils.BetHelper;

import java.util.ArrayList;
import java.util.List;

@Strategy
public class RandomStrategy2 extends AbstractStrategy {

    private static final int SIZE = 10;

    public RandomStrategy2(Config config) {
        super(config);
    }

    @Override
    public List<Bet> decide() {
        List<Bet> betList = new ArrayList<>();
        List<BetType> betTypeList = BetType.getAvailableList(getConfig().rouletteType());
        if (isLastBetWon()) {
            for (Bet bet : getLastBets()) {
                if (BetHelper.isWin(bet, getMarket().getLastSpot())) {
                    betList.add(bet);
                }
            }
        }
        while (betList.size() < SIZE) {
            BetType type = betTypeList.get(Constants.RANDOM.nextInt(betTypeList.size()));
            int multiplier = Constants.RANDOM.nextInt(10) + 1;
            betList.add(Bet.of(type,getMinBet() * multiplier));
        }
        return betList;
    }
}