package com.traderoom.strategy.predictor;

import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.BetTypePrediction;
import com.traderoom.strategy.model.ColorPrediction;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.utils.BetHelper;

import java.util.EnumMap;
import java.util.List;

public class CountPredictor implements Predictor {

    private final EnumMap<Spot, Long> spotMap;
    private final EnumMap<BetType, Long> typeMap;
    private long count;

    public CountPredictor() {
        spotMap = new EnumMap<>(Spot.class);
        typeMap = new EnumMap<>(BetType.class);
        count = 0;
    }

    private double calculate(double occurrences) {
        return count == 0 ? 0.0 : occurrences / count;
    }

    @Override
    public List<SpotPrediction> getNextSpot(State state, Config config) {
        updateParameter(state, config);
        return Spot.getAvailableList(config.rouletteType())
                .stream()
                .map(spot -> SpotPrediction.of(spot, calculate(spotMap.getOrDefault(spot, 0L))))
                .toList();
    }

    @Override
    public List<BetTypePrediction> getNextType(State state, Config config) {
        updateParameter(state, config);
        return BetType.getAvailableList(config.rouletteType())
                .stream()
                .map(type -> BetTypePrediction.of(type, calculate(typeMap.getOrDefault(type, 0L))))
                .toList();
    }

    @Override
    public ColorPrediction getNextColor(State state, Config config) {
        updateParameter(state, config);

        double red = 0;
        double black = 0;
        double green = 0;
        for (Spot spot : Spot.getAvailableList(config.rouletteType())) {
            long spotCount = spotMap.getOrDefault(spot, 0L);
            if (spot.isRed()) {
                red += spotCount;
            } else if (spot.isBlack()) {
                black += spotCount;
            } else if (spot.isGreen()) {
                green += spotCount;
            }
        }
        return ColorPrediction.of(calculate(red), calculate(black), calculate(green));
    }

    private void updateParameter(State state, Config config) {
        spotMap.merge(state.getMarketData().getLastSpot(), 1L, Long::sum);
        for (BetType type : BetType.getAvailableList(config.rouletteType())) {
            if (BetHelper.isWin(type, state.getMarketData().getLastSpot())) {
                typeMap.merge(type, 1L, Long::sum);
            }
        }
        count++;
    }

}