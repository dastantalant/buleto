package com.traderoom.strategy.predictor;

import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.BetTypePrediction;
import com.traderoom.strategy.model.ColorPrediction;
import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;

import java.util.Comparator;
import java.util.List;
import java.util.Map;

public class BayesianPredictor implements Predictor {
    private static final double PRIOR_WEIGHT = 1.0;

    @Override
    public List<SpotPrediction> getNextSpot(State state, Config config) {
        Map<Spot, Integer> frequencies = state.getMarketData().getFrequencies();
        long totalSpins = state.getMarketData().getCurrentLoopCount();
        List<Spot> availableSpots = Spot.getAvailableList(config.rouletteType());

        double denominator = totalSpins + (availableSpots.size() * PRIOR_WEIGHT);

        return availableSpots.stream()
                .map(spot -> {
                    double count = frequencies.getOrDefault(spot, 0);
                    double probability = (count + PRIOR_WEIGHT) / denominator;
                    return SpotPrediction.of(spot, probability);
                })
                .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
                .toList();
    }
    @Override
    public List<BetTypePrediction> getNextType(State state, Config config) {
        return List.of();
    }

    @Override
    public ColorPrediction getNextColor(State state, Config config) {
        return ColorPrediction.of();
    }
}
