package com.traderoom.strategy.strategies;

import com.traderoom.api.enums.Constants;
import com.traderoom.api.enums.BetType;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.AbstractStrategy;

import java.util.ArrayList;
import java.util.List;

@Strategy
public class RandomStrategy extends AbstractStrategy {

    public RandomStrategy(Config config) {
        super(config);
    }

    @Override
    public List<Bet> decide() {
        List<Bet> betList = new ArrayList<>();
        List<BetType> betTypeList = BetType.getAvailableList(getConfig().rouletteType());
        for (int i = 0; i < Constants.RANDOM.nextInt(100); i++) {
            BetType type = betTypeList.get(Constants.RANDOM.nextInt(betTypeList.size()));
            betList.add(Bet.of(type,getMinBet() * (Constants.RANDOM.nextInt(10) + 1)));
        }
        return betList;
    }
}