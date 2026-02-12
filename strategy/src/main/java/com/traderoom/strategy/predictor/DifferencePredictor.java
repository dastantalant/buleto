package com.traderoom.strategy.predictor;

import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.model.State;
import com.traderoom.api.model.SpotPrediction;
import com.traderoom.api.Predictor;

import java.util.List;
import java.util.Objects;

@Deprecated
public class DifferencePredictor implements Predictor {

    @Override
    public List<SpotPrediction> predictSpot(State state, Config config) {
        List<Spot> history = state.getMarket().getHistory();
        if (history.isEmpty()) {
            return List.of();
        }
        double average = history.stream()
                .mapToInt(Spot::getNumber)
                .average()
                .orElse(0.0);
        int lastSpot = Objects.requireNonNull(state.getMarket().getLastSpot()).getNumber();
        Spot spot1 = Spot.getByNumber((int) (lastSpot + average));
        Spot spot2 = Spot.getByNumber((int) (lastSpot - average));
        return SpotPrediction.of(spot1, 0.5, spot2, 0.5);
    }
}