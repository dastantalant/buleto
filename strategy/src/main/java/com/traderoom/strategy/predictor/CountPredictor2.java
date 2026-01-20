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
import java.util.Map;

public class CountPredictor2 implements Predictor {

    @Override
    public List<SpotPrediction> getNextSpot(State state, Config config) {
        Map<Spot, Long> countMap = getSpotTypeCountMap(state);
        double totalCount = state.getMarketData().getHistory().size();
        return Spot.getAvailableList(config.rouletteType())
                .stream()
                .map(spot -> SpotPrediction.of(spot, calculate(countMap.getOrDefault(spot, 0L), totalCount)))
                .toList();
    }

    @Override
    public List<BetTypePrediction> getNextType(State state, Config config) {
        EnumMap<BetType, Long> countMap = getBetTypeCountMap(state, config);
        double totalCount = state.getMarketData().getHistory().size();
        return BetType.getAvailableList(config.rouletteType())
                .stream()
                .map(type -> BetTypePrediction.of(type, calculate(countMap.getOrDefault(type, 0L), totalCount)))
                .toList();
    }

    @Override
    public ColorPrediction getNextColor(State state, Config config) {
        EnumMap<Spot, Long> countMap = getSpotTypeCountMap(state);
        List<Spot> availableSpots = Spot.getAvailableList(config.rouletteType());
        if (availableSpots.isEmpty()) {
            return ColorPrediction.of();
        }

        double red = 0;
        double black = 0;
        double green = 0;
        for (Spot spot : availableSpots) {
            long spotCount = countMap.getOrDefault(spot, 0L);
            if (spot.isRed()) {
                red += spotCount;
            } else if (spot.isBlack()) {
                black += spotCount;
            } else if (spot.isGreen()) {
                green += spotCount;
            }
        }
        double totalCount = red + black + green;

        return ColorPrediction.of(calculate(red, totalCount), calculate(black, totalCount), calculate(green, totalCount));
    }

    private EnumMap<Spot, Long> getSpotTypeCountMap(State state) {
        EnumMap<Spot, Long> countMap = new EnumMap<>(Spot.class);
        for (Spot spot : state.getMarketData().getHistory()) {
            countMap.merge(spot, 1L, Long::sum);
        }
        return countMap;
    }

    private EnumMap<BetType, Long> getBetTypeCountMap(State state, Config config) {
        EnumMap<BetType, Long> countMap = new EnumMap<>(BetType.class);
        List<BetType> availableTypes = BetType.getAvailableList(config.rouletteType());
        for (Spot spot : state.getMarketData().getHistory()) {
            for (BetType betType : availableTypes) {
                if (BetHelper.isWin(betType, spot)) {
                    countMap.merge(betType, 1L, Long::sum);
                }
            }
        }
        return countMap;
    }

    private double calculate(double occurrences, double totalCount) {
        return totalCount == 0 ? 0.0 : occurrences / totalCount;
    }
}