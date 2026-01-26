package com.traderoom.strategy.runner;

import com.traderoom.strategy.IStrategy;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.StrategyFactory;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.Snapshot;
import com.traderoom.strategy.model.context.State;

import java.io.Serializable;

public interface IRunner extends Serializable {

    static IRunner of(IStrategy strategy) {
        return new BetRunner(strategy);
    }

    static IRunner from(Config config, Class<IStrategy> clazz) {
        return new BetRunner(StrategyFactory.getInstance().create(clazz, config));
    }

    Snapshot apply(Spot spot);

    Snapshot snapshot();

    boolean canContinue();

    boolean isLastApplied();

    State getState();

    Snapshot stop();

    boolean isLive();

    IStrategy getStrategy();
}
