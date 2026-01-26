package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.enums.Constants;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.base.AbstractStrategy;

import java.util.ArrayList;
import java.util.List;

@AStrategy
public class RandomStrategy extends AbstractStrategy {

    public RandomStrategy(Config config) {
        super(config);
    }

    @Override
    public List<Bet> decide(State state) {
        List<Bet> betList = new ArrayList<>();
        List<BetType> betTypeList = BetType.getAvailableList(getConfig().rouletteType());
        for (int i = 0; i < Constants.RANDOM.nextInt(100); i++) {
            BetType type = betTypeList.get(Constants.RANDOM.nextInt(betTypeList.size()));
            betList.add(Bet.of(type,getConfig().minBet() * (Constants.RANDOM.nextInt(10) + 1)));
        }
        return betList;
    }
}