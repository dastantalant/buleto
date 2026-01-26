package com.traderoom.strategy.sizing;

import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.model.SpotPrediction;

import java.io.Serializable;

public interface Sizing  extends Serializable {

    long calculate(State state, boolean isLastWin, long lastBet, SpotPrediction prediction, Config config);

}