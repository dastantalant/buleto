package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.predictor.Predictor;
import com.traderoom.strategy.predictor.RnnPredictor;
import com.traderoom.strategy.utils.BetHelper;
import org.deeplearning4j.nn.multilayer.MultiLayerNetwork;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

public class StraightUpStrategy extends BaseStrategy {

    private final Predictor predictor;
    private final boolean isReady;

    public StraightUpStrategy(Context context, Optional<MultiLayerNetwork> rnnModelOpt) {
        super(context);
        isReady = rnnModelOpt.isPresent();
        predictor = rnnModelOpt
                .map(net -> new RnnPredictor(net, context.getRouletteType()))
                .orElse(null);
    }

    @Override
    public String getName() {
        return StraightUpStrategy.class.getSimpleName();
    }

    @Override
    protected List<Bet> getNextInternal(Context context) {
        if (!isReady) {
            return List.of();
        }

        Optional<SpotPrediction> bestPrediction = predictor.getNextSpotPredictionList(context).stream()
                .max(Comparator.comparingDouble(SpotPrediction::probability));

        if (bestPrediction.isPresent()) {
            Spot spot = bestPrediction.get().spot();
            BetType type = BetHelper.getStraightUpBetType(spot);
            return List.of(Bet.builder().type(type).value(context.getMin()).build());
        }

        return List.of();
    }
}