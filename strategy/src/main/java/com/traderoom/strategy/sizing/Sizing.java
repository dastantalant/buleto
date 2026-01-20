package com.traderoom.strategy.sizing;

import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.model.SpotPrediction;

public interface Sizing {

    long calculate(State state, boolean isLastWin, long lastBet, SpotPrediction prediction, Config config);

}