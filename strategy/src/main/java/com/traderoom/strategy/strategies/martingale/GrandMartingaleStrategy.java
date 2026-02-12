package com.traderoom.strategy.strategies.martingale;

import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.model.config.Config;

@Strategy(tags = {Tag.PROGRESSIVE})
public class GrandMartingaleStrategy extends AbstractMartingaleStrategy {

    public GrandMartingaleStrategy(Config config) {
        super(config);
    }

    @Override
    protected long calculateNext(Config config) {
        long lastBet = getLastBet();
        long idealNextBet = lastBet * 2;

        long currentMax = getMaxBet();
        long currentMin = getMinBet();
        if (idealNextBet > currentMax) {
            return currentMin;
        }
        return Math.max(idealNextBet, currentMin);
    }
}