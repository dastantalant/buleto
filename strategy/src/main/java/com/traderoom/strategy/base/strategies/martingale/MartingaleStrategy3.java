package com.traderoom.strategy.base.strategies.martingale;

import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.predictor.Predictor;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.ColorPrediction;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.predictor.CountPredictor2;

import java.util.List;

@AStrategy
public class MartingaleStrategy3 extends AbstractMartingaleStrategy {

    private final Predictor predictor;

    public MartingaleStrategy3(Config config) {
        super(config, List.of());
        predictor = new CountPredictor2();
    }

    @Override
    public BetType getNextBetType(State state) {
        ColorPrediction prediction = predictor.getNextColor(state, getConfig());
        return prediction.black() <= prediction.red() ? BetType.RED : BetType.BLACK;
    }
}