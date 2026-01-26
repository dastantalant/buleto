package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.enums.Constants;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.base.AbstractStrategy;
import com.traderoom.strategy.utils.BetHelper;

import java.util.ArrayList;
import java.util.List;

@AStrategy
public class RandomStrategy2 extends AbstractStrategy {

    private static final int SIZE = 10;

    public RandomStrategy2(Config config) {
        super(config);
    }

    @Override
    public List<Bet> decide(State state) {
        List<Bet> betList = new ArrayList<>();
        List<BetType> betTypeList = BetType.getAvailableList(getConfig().rouletteType());
        if (isLastBetWon(state)) {
            for (Bet bet : getLastBets()) {
                if (BetHelper.isWin(bet, state.getMarketData().getLastSpot())) {
                    betList.add(bet);
                }
            }
        }
        while (betList.size() < SIZE) {
            BetType type = betTypeList.get(Constants.RANDOM.nextInt(betTypeList.size()));
            int multiplier = Constants.RANDOM.nextInt(10) + 1;
            betList.add(Bet.of(type,getConfig().minBet() * multiplier));
        }
        return betList;
    }
}