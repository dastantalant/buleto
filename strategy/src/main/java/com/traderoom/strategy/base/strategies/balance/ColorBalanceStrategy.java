package com.traderoom.strategy.base.strategies.balance;

import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;

import java.util.List;

@AStrategy
public class ColorBalanceStrategy extends AbstractBalanceStrategy {

    private final double balanceThreshold;

    public ColorBalanceStrategy(Config config) {
        super(config);
        balanceThreshold = 0.45;
    }

    @Override
    public List<Bet> decide(State state) {
        return processBet(BetType.RED, state, () -> {
            double red = state.getMarketData().getRedRate();
            double black = state.getMarketData().getBlackRate();
            double total = red + black;
            BetType result = BetType.RED;
            if (total > 0 && black < total * balanceThreshold) {
                result = BetType.BLACK;
            }
            return result;
        });
    }

}