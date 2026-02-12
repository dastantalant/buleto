package com.traderoom.strategy.strategies.martingale;

import com.traderoom.api.enums.BetType;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.model.config.Config;

import java.util.List;

@Strategy(tags = {Tag.PROGRESSIVE})
public class MartingaleStrategy4 extends AbstractMartingaleStrategy {

    public MartingaleStrategy4(Config config) {
        super(config, List.of(BetType.FIRST_DOZEN, BetType.SECOND_DOZEN));
    }

    @Override
    protected long calculateNext(Config config) {
        return getLastBets().getFirst().value() * 3;
    }
}