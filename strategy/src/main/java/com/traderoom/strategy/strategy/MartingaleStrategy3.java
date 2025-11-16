package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.ColorPrediction;
import com.traderoom.strategy.predictor.CountPredictor2;
import com.traderoom.strategy.predictor.Predictor;

import java.util.Collections;
import java.util.List;

import static com.traderoom.strategy.enums.BetType.BLACK;
import static com.traderoom.strategy.enums.BetType.RED;


public class MartingaleStrategy3 extends BaseStrategy {

    private static final Predictor PREDICTOR = new CountPredictor2();

    public MartingaleStrategy3(Context context) {
        super(context);
    }

    @Override
    public String getName() {
        return MartingaleStrategy3.class.getSimpleName();
    }

    @Override
    public List<Bet> getNextInternal(Context context) {
        ColorPrediction colorPrediction = PREDICTOR.getNextColorPrediction(context);
        BetType typeToBetOn = colorPrediction.black() <= colorPrediction.red() ? RED : BLACK;
        if (!hasLastBet() || wasLastBetWon(context)) {
            return create(typeToBetOn, context.getMin(), context);
        } else {
            long lastBetValue = getLastTotalBetValue();
            return create(typeToBetOn, lastBetValue * 2, context);
        }
    }

    private List<Bet> create(BetType type, long value, Context context) {
        long safeValue = Math.min(value, curBalance);
        if (safeValue <= 0 && curBalance > 0) {
            safeValue = context.getMin();
        }
        return Collections.singletonList(Bet.builder().type(type).value(safeValue).build());
    }
}