package com.traderoom.strategy.base.strategies.martingale;

import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.context.Config;

import java.util.List;

@AStrategy
public class MartingaleStrategy5 extends AbstractMartingaleStrategy {

    public MartingaleStrategy5(Config config) {
        super(config, List.of(
                BetType.STRAIGHT_UP_2,
                BetType.STRAIGHT_UP_3,
                BetType.STRAIGHT_UP_4,
                BetType.STRAIGHT_UP_5,
                BetType.STRAIGHT_UP_6,
                BetType.STRAIGHT_UP_7,
                BetType.STRAIGHT_UP_8,
                BetType.STRAIGHT_UP_9,
                BetType.STRAIGHT_UP_10,
                BetType.STRAIGHT_UP_11,
                BetType.STRAIGHT_UP_12,
                BetType.STRAIGHT_UP_13,
                BetType.STRAIGHT_UP_14,
                BetType.STRAIGHT_UP_15,
                BetType.STRAIGHT_UP_16,
                BetType.STRAIGHT_UP_17,
                BetType.STRAIGHT_UP_18,
                BetType.STRAIGHT_UP_19,
                BetType.STRAIGHT_UP_20,
                BetType.STRAIGHT_UP_21,
                BetType.STRAIGHT_UP_22,
                BetType.STRAIGHT_UP_23,
                BetType.STRAIGHT_UP_24,
                BetType.STRAIGHT_UP_25,
                BetType.STRAIGHT_UP_26,
                BetType.STRAIGHT_UP_27,
                BetType.STRAIGHT_UP_28,
                BetType.STRAIGHT_UP_29,
                BetType.STRAIGHT_UP_30,
                BetType.STRAIGHT_UP_31,
                BetType.STRAIGHT_UP_32,
                BetType.STRAIGHT_UP_33,
                BetType.STRAIGHT_UP_34,
                BetType.STRAIGHT_UP_35,
                BetType.STRAIGHT_UP_36
        ));
    }

    @Override
    protected long calculateNext(Config config) {
        return getLastBets().getFirst().value() * 18;
    }
}
