package com.traderoom.strategy.predictor;

import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.BetTypePrediction;
import com.traderoom.strategy.model.ColorPrediction;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.model.SpotPrediction;

import java.util.List;
import java.util.Objects;

public class DifferencePredictor implements Predictor {

    @Override
    public List<SpotPrediction> getNextSpot(State state, Config config) {
        List<Spot> history = state.getMarketData().getHistory();
        if (history.isEmpty()) {
            return List.of();
        }
        double average = history.stream()
                .mapToInt(Spot::getNumber)
                .average()
                .orElse(0.0);
        int lastSpot = Objects.requireNonNull(state.getMarketData().getLastSpot()).getNumber();
        Spot spot1 = Spot.getByNumber((int) (lastSpot + average));
        Spot spot2 = Spot.getByNumber((int) (lastSpot - average));
        return SpotPrediction.of(spot1, 0.5, spot2, 0.5);
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