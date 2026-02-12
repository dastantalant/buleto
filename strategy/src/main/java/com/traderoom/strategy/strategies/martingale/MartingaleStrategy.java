package com.traderoom.strategy.strategies.martingale;

import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.model.config.Config;

@Strategy(tags = {Tag.PROGRESSIVE})
public class MartingaleStrategy extends AbstractMartingaleStrategy {

    public MartingaleStrategy(Config config) {
        super(config);
    }
}