package com.traderoom.strategy.base.strategies.martingale;

import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;

import java.util.List;

import static com.traderoom.strategy.enums.BetType.BLACK;
import static com.traderoom.strategy.enums.BetType.RED;

@AStrategy
public class MartingaleStrategy2 extends AbstractMartingaleStrategy {

    public MartingaleStrategy2(Config config) {
        super(config, List.of());
    }

    @Override
    public BetType getNextBetType(State state) {
        return state.getMarketData().getBlackRate() <= state.getMarketData().getRedRate() ? RED : BLACK;
    }
}