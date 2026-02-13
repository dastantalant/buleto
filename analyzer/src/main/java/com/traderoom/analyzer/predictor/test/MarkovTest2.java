package com.traderoom.analyzer.predictor.test;

import com.traderoom.api.enums.BetType;
import com.traderoom.api.enums.RouletteType;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.SpotPrediction;
import com.traderoom.api.utils.BetHelper;

import java.util.Deque;
import java.util.EnumMap;
import java.util.List;

@Deprecated
public class MarkovTest2 implements PredictorTest {

    private final int min = 2;
    private final double probability = 0.0;
    private final EnumMap<Spot, EnumMap<Spot, Long>> spotMap = new EnumMap<>(Spot.class);
    private final EnumMap<BetType, EnumMap<BetType, Long>> typeMap = new EnumMap<>(BetType.class);
    private long transitions = 0;

    @Override
    public List<SpotPrediction> predict(Deque<Spot> history, RouletteType rouletteType, int windowSize) {
        List<Spot> window = split(history, windowSize);
        if (window.size() < min) {
            return List.of();
        }
        updateMarkovModel(window, rouletteType);
        EnumMap<Spot, Long> enumMap = spotMap.getOrDefault(window.getLast(), new EnumMap<>(Spot.class));
        return Spot.getAvailableList(rouletteType)
                .stream()
                .map(spot -> SpotPrediction.of(spot, calculate(enumMap.getOrDefault(spot, 0L))))
                .filter(prediction -> prediction.probability() > 0)
                .toList();
    }

    private void updateMarkovModel(List<Spot> window, RouletteType rouletteType) {
        for (int i = 0; i < window.size() - 1; i++) {
            Spot spot1 = window.get(i);
            Spot spot2 = window.get(i + 1);
            spotMap.computeIfAbsent(spot1, k -> new EnumMap<>(Spot.class))
                    .merge(spot2, 1L, Long::sum);
        }
        for (int i = 0; i < window.size() - 1; i++) {
            Spot spot1 = window.get(i);
            Spot spot2 = window.get(i + 1);
            List<BetType> list1 = BetType.getAvailableList(rouletteType)
                    .stream()
                    .filter(type -> BetHelper.isWin(type, spot1))
                    .toList();
            List<BetType> list2 = BetType.getAvailableList(rouletteType)
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
        transitions = window.size() - 1L;
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
