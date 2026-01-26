package com.traderoom.strategy.predictor;

import com.traderoom.strategy.model.BetTypePrediction;
import com.traderoom.strategy.model.ColorPrediction;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.model.SpotPrediction;

import java.io.Serializable;
import java.util.List;

public interface Predictor  extends Serializable {

    List<SpotPrediction> getNextSpot(State state, Config config);

    List<BetTypePrediction> getNextType(State state, Config config);

    ColorPrediction getNextColor(State state, Config config);
}