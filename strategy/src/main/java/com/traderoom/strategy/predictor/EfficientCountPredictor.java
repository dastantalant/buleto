package com.traderoom.strategy.predictor;

import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.BetTypePrediction;
import com.traderoom.strategy.model.ColorPrediction;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.model.SpotPrediction;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

public class EfficientCountPredictor implements Predictor {

    public static EfficientCountPredictor of() {
        return new EfficientCountPredictor();
    }

    @Override
    public List<SpotPrediction> getNextSpot(State state, Config config) {
        Map<Spot, Integer> frequencies = state.getMarketData().getFrequencies();
        double size = state.getMarketData().getHistory().size();

        if (size == 0) {
            return List.of();
        }
        return Spot.getAvailableList(config.rouletteType())
                .stream()
                .map(spot -> SpotPrediction.of(spot, calculate(frequencies.getOrDefault(spot, 0), size)))
                .toList();
    }

    @Override
    public List<BetTypePrediction> getNextType(State state, Config config) {
        Map<Spot, Integer> frequencies = state.getMarketData().getFrequencies();
        double size = state.getMarketData().getHistory().size();

        if (size == 0) {
            return List.of();
        }

        List<BetType> types = BetType.getAvailableList(config.rouletteType());
        EnumMap<BetType, Long> betMap = new EnumMap<>(BetType.class);

        EnumMap<Spot, List<BetType>> spotMap = new EnumMap<>(Spot.class);
        for (BetType type : types) {
            for (Spot spot : type.getWinning()) {
                spotMap.computeIfAbsent(spot, _ -> new ArrayList<>()).add(type);
            }
        }

        for (Map.Entry<Spot, Integer> entry : frequencies.entrySet()) {
            List<BetType> winning = spotMap.get(entry.getKey());
            if (winning != null) {
                for (BetType type : winning) {
                    betMap.merge(type, Long.valueOf(entry.getValue()), Long::sum);
                }
            }
        }
        return types.stream()
                .map(type -> BetTypePrediction.of(type, calculate(betMap.getOrDefault(type, 0L), size)))
                .toList();
    }

    @Override
    public ColorPrediction getNextColor(State state, Config config) {
        Map<Spot, Integer> frequencies = state.getMarketData().getFrequencies();
        double size = state.getMarketData().getHistory().size();

        if (size == 0) {
            return ColorPrediction.of();
        }

        double red = frequencies.entrySet()
                .stream()
                .filter(entry -> entry.getKey().isRed())
                .mapToDouble(Map.Entry::getValue)
                .sum();
        double black = frequencies.entrySet()
                .stream()
                .filter(entry -> entry.getKey().isBlack())
                .mapToDouble(Map.Entry::getValue)
                .sum();
        double green = frequencies.entrySet()
                .stream()
                .filter(entry -> entry.getKey().isGreen())
                .mapToDouble(Map.Entry::getValue)
                .sum();

        return ColorPrediction.of(calculate(red, size), calculate(black, size), calculate(green, size));
    }

    private double calculate(double occurrences, double totalCount) {
        return totalCount == 0 ? 0.0 : occurrences / totalCount;
    }
}