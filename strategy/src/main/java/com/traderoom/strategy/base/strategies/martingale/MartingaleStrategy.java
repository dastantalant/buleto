package com.traderoom.strategy.base.strategies.martingale;

import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.context.Config;

@AStrategy
public class MartingaleStrategy extends AbstractMartingaleStrategy {

    public MartingaleStrategy(Config config) {
        super(config);
    }
}