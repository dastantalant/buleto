package com.traderoom.strategy.strategies.martingale;

import com.traderoom.api.enums.BetType;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.model.config.Config;

import java.util.List;

import static com.traderoom.api.enums.BetType.BLACK;
import static com.traderoom.api.enums.BetType.RED;

@Strategy(tags = {Tag.PROGRESSIVE})
public class MartingaleStrategy2 extends AbstractMartingaleStrategy {

    public MartingaleStrategy2(Config config) {
        super(config, List.of());
    }

    @Override
    public BetType getNextBetType() {
        return getState().getMarket().getBlackRate() <= getState().getMarket().getRedRate() ? RED : BLACK;
    }
}