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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class FlowerBetStrategy extends BaseStrategy {

    private  final Predictor predictor;
    private final boolean isReady;

    public FlowerBetStrategy(Context context, Optional<MultiLayerNetwork> rnnModelOpt) {
        super(context);
        isReady = rnnModelOpt.isPresent();
        predictor = rnnModelOpt
                .map(net -> new RnnPredictor(net, context.getRouletteType()))
                .orElse(null);
    }

    @Override
    public String getName() {
        return FlowerBetStrategy.class.getSimpleName();
    }

    @Override
    public List<Bet> getNextInternal(Context context) {
        if (!isReady) {
            return List.of();
        }
        List<Bet> betList = new ArrayList<>();

        double max = 0;
        Spot spot = null;
        for (SpotPrediction prediction : predictor.getNextSpotPredictionList(context)) {
            if (max < prediction.probability()) {
                max = prediction.probability();
                spot = prediction.spot();
            }
        }

        if (spot != null) {
            for (BetType type : BetHelper.getAllCoveringBets(spot)) {
                betList.add(Bet.builder().type(type).value(context.getMin()).build());
            }
        }
        return betList;
    }
}