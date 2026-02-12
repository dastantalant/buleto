package com.traderoom.api.sizing;

import com.traderoom.api.IStrategy;
import com.traderoom.api.model.SpotPrediction;

public interface Sizing {

    long calculate(IStrategy strategy, SpotPrediction prediction, boolean isLastWin, long lastBet);

}