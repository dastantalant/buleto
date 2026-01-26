package com.traderoom.strategy.base.strategies.martingale;

import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.context.Config;

@AStrategy
public class GrandMartingaleStrategy extends AbstractMartingaleStrategy {

    public GrandMartingaleStrategy(Config config) {
        super(config);
    }

    @Override
    protected long calculateNext(Config config) {
        return (getLastBet() * 2) + config.minBet();
    }
}