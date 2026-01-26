package com.traderoom.strategy.base.strategies.martingale;

import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.context.Config;

import java.util.List;

@AStrategy
public class MartingaleStrategy4 extends AbstractMartingaleStrategy {

    public MartingaleStrategy4(Config config) {
        super(config, List.of(BetType.FIRST_DOZEN, BetType.SECOND_DOZEN));
    }

    @Override
    protected long calculateNext(Config config) {
        return getLastBets().getFirst().value() * 3;
    }
}