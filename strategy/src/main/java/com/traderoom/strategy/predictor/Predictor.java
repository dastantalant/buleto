package com.traderoom.strategy.predictor;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.model.BetTypePrediction;
import com.traderoom.strategy.model.ColorPrediction;
import com.traderoom.strategy.model.SpotPrediction;

import java.util.List;

public interface Predictor {

    List<SpotPrediction> getNextSpotPredictionList(Context context);

    List<BetTypePrediction> getNextBetTypePredictionList(Context context);

    ColorPrediction getNextColorPrediction(Context context);
}