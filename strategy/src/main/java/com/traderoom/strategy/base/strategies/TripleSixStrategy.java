package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.base.AbstractStrategy;

import java.util.List;

import static com.traderoom.strategy.enums.BetType.*;
import static com.traderoom.strategy.model.Bet.of;

@AStrategy
public class TripleSixStrategy extends AbstractStrategy {

    public TripleSixStrategy(Config config) {
        super(config);
    }

    @Override
    public List<Bet> decide(State state) {
        return List.of(of(RED, getConfig().minBet() * 36),
                of(SPLIT_0_2, getConfig().minBet() * 4),
                of(SPLIT_8_11, getConfig().minBet() * 4),
                of(SPLIT_10_13, getConfig().minBet() * 4),
                of(SPLIT_17_20, getConfig().minBet() * 4),
                of(SPLIT_26_29, getConfig().minBet() * 4),
                of(SPLIT_28_31, getConfig().minBet() * 4),
                of(STRAIGHT_UP_4, getConfig().minBet() * 2),
                of(STRAIGHT_UP_6, getConfig().minBet() * 2),
                of(STRAIGHT_UP_15, getConfig().minBet() * 2));
    }
}