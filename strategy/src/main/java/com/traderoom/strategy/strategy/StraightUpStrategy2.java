package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.predictor.EfficientCountPredictor;
import com.traderoom.strategy.predictor.Predictor;
import com.traderoom.strategy.utils.BetHelper;

import java.util.List;
import java.util.Objects;

public class StraightUpStrategy2 extends BaseStrategy {

    private static final Predictor PREDICTOR = new EfficientCountPredictor();
    private static final double PROBABILITY_THRESHOLD = 0.03;
    private static final double BUDGET_FRACTION = 0.1;

    public StraightUpStrategy2(Context context) {
        super(context);
    }

    @Override
    public String getName() {
        return StraightUpStrategy2.class.getSimpleName();
    }

    @Override
    public List<Bet> getNextInternal(Context context) {
        long limit = (long) (Math.max(curBalance, context.getStart()) * BUDGET_FRACTION);
        List<SpotPrediction> predictions = PREDICTOR.getNextSpotPredictionList(context);
        return predictions.stream()
                .filter(prediction -> prediction.probability() > PROBABILITY_THRESHOLD)
                .map(prediction -> {
                    BetType type = BetHelper.getStraightUpBetType(prediction.spot());
                    long value = Math.max(context.getMin(), (long) (limit * prediction.probability()));
                    return Bet.builder()
                            .type(type)
                            .value(value)
                            .build();
                })
                .filter(Objects::nonNull)
                .toList();
    }
}