package com.traderoom.strategy.strategies.martingale;

import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.Predictor;
import com.traderoom.api.enums.BetType;
import com.traderoom.api.model.ColorPrediction;
import com.traderoom.api.model.config.Config;
import com.traderoom.strategy.predictor.CountPredictor2;

import java.util.List;

@Strategy(tags = {Tag.PROGRESSIVE})
public class MartingaleStrategy3 extends AbstractMartingaleStrategy {

    private final Predictor predictor;

    public MartingaleStrategy3(Config config) {
        super(config, List.of());
        predictor = new CountPredictor2();
    }

    @Override
    public BetType getNextBetType() {
        ColorPrediction prediction = predictor.predictColor(getState(), getConfig());
        return prediction.black() <= prediction.red() ? BetType.RED : BetType.BLACK;
    }
}