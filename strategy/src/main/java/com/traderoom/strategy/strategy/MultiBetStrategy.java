package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.predictor.ImprovedMarkovPredictor;
import com.traderoom.strategy.predictor.Predictor;

import java.util.List;

public class MultiBetStrategy extends BaseStrategy {

    private static final Predictor PREDICTOR = new ImprovedMarkovPredictor();

    public MultiBetStrategy(Context context) {
        super(context);
    }

    @Override
    public String getName() {
        return MultiBetStrategy.class.getSimpleName();
    }

    @Override
    public List<Bet> getNextInternal(Context context) {
        long limit = Math.max(curBalance, context.getStart()) / 10;
        limit = Math.min(limit, context.getMax());

        final long finalLimit = limit;
        return PREDICTOR.getNextBetTypePredictionList(context).stream()
                .filter(prediction -> prediction.probability() > 0.3)
                .map(prediction -> Bet.builder()
                        .type(prediction.type())
                        .value(Math.max(context.getMin(), (long) (finalLimit * prediction.probability())))
                        .build())
                .toList();
    }
}