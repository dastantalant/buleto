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

public class MarkovPredictor2 implements Predictor {

    private final int min;
    private final double probability;
    private final EnumMap<Spot, EnumMap<Spot, Long>> spotMap;
    private final EnumMap<BetType, EnumMap<BetType, Long>> typeMap;
    private long transitions;

    public MarkovPredictor2() {
        spotMap = new EnumMap<>(Spot.class);
        typeMap = new EnumMap<>(BetType.class);
        min = 2;
        probability = 0.0;
        transitions = 0;
    }

    @Override
    public List<SpotPrediction> getNextSpot(State state, Config config) {
        if (state.getMarketData().getHistory().size() < min) {
            return List.of();
        }

        updateMarkovModel(state, config);
        EnumMap<Spot, Long> enumMap = spotMap.getOrDefault(state.getMarketData().getLastSpot(), new EnumMap<>(Spot.class));

        return Spot.getAvailableList(config.rouletteType())
                .stream()
                .map(spot -> SpotPrediction.of(spot, calculate(enumMap.getOrDefault(spot, 0L))))
                .filter(prediction -> prediction.probability() > 0)
                .toList();
    }

    @Override
    public List<BetTypePrediction> getNextType(State state, Config config) {
        if (state.getMarketData().getHistory().size() < min) {
            return List.of();
        }

        updateMarkovModel(state, config);
        List<BetType> list = BetType.getAvailableList(config.rouletteType());
        List<BetType> filtered = list.stream()
                .filter(type -> BetHelper.isWin(type, state.getMarketData().getLastSpot()))
                .toList();

        if (filtered.isEmpty()) {
            return List.of();
        }

        return list.stream()
                .flatMap(item -> filtered.stream()
                        .map(next -> BetTypePrediction.of(next,
                                calculate(typeMap.getOrDefault(item, new EnumMap<>(BetType.class)).getOrDefault(next, 0L))))
                        .filter(prediction -> prediction.probability() > 0))
                .toList();
    }

    @Override
    public ColorPrediction getNextColor(State state, Config config) {
        return ColorPrediction.of(probability);
    }

    private void updateMarkovModel(State state, Config config) {
        if (state.getMarketData().getHistory().size() < min) {
            return;
        }

        for (int i = 0; i < state.getMarketData().getHistory().size() - 1; i++) {
            Spot spot1 = state.getMarketData().getHistory().get(i);
            Spot spot2 = state.getMarketData().getHistory().get(i + 1);
            spotMap.computeIfAbsent(spot1, k -> new EnumMap<>(Spot.class))
                    .merge(spot2, 1L, Long::sum);
        }

        for (int i = 0; i < state.getMarketData().getHistory().size() - 1; i++) {
            Spot spot1 = state.getMarketData().getHistory().get(i);
            Spot spot2 = state.getMarketData().getHistory().get(i + 1);
            List<BetType> list1 = BetType.getAvailableList(config.rouletteType())
                    .stream()
                    .filter(type -> BetHelper.isWin(type, spot1))
                    .toList();
            List<BetType> list2 = BetType.getAvailableList(config.rouletteType())
                    .stream()
                    .filter(type -> BetHelper.isWin(type, spot2))
                    .toList();

            for (BetType type1 : list1) {
                for (BetType type2 : list2) {
                    typeMap.computeIfAbsent(type1, k -> new EnumMap<>(BetType.class))
                            .merge(type2, 1L, Long::sum);
                }
            }
        }
        transitions = state.getMarketData().getHistory().size() - 1L;
    }

    private double calculate(long occurrences) {
        return transitions == 0 ? probability : (double) occurrences / transitions;
    }

    public void reset() {
        spotMap.clear();
        typeMap.clear();
        transitions = 0;
    }
}