package com.traderoom.api;

import com.traderoom.api.model.BetTypePrediction;
import com.traderoom.api.model.ColorPrediction;
import com.traderoom.api.model.SpotPrediction;
import com.traderoom.api.model.State;
import com.traderoom.api.model.config.Config;

import java.util.List;

public interface Predictor {

    List<SpotPrediction> predictSpot(State state, Config config);

    default List<BetTypePrediction> predictType(State state, Config config) {
        return List.of();
    }

    default ColorPrediction predictColor(State state, Config config) {
        return ColorPrediction.of();
    }
}