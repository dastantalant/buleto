package com.traderoom.analyzer.success.v0;

import com.traderoom.api.Predictor;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.SpotPrediction;
import com.traderoom.api.model.State;
import com.traderoom.api.model.config.Config;
import com.traderoom.strategy.predictor.PatternPredictor;
import com.traderoom.strategy.predictor.SlidingWindowFreqPredictor;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.EnumMap;
import java.util.List;

public class CustomPredictor implements Predictor {

    private final List<Predictor> predictors;
private final int neighborCount =3;
    public CustomPredictor(List<Predictor> predictors) {
        this.predictors = List.copyOf(predictors);
    }

    public static CustomPredictor createDefaultEnsemble(int windowSize) {
        return new CustomPredictor(List.of(
//                new EfficientCountPredictor(windowSize),
//                new MultiOrderMarkovPredictor(windowSize),
                new PatternPredictor(windowSize),
                new SlidingWindowFreqPredictor(windowSize)
        ));
    }

    @Override
    public List<SpotPrediction> predictSpot(State state, Config config) {
        EnumMap<Spot, Double> selectedSpotsMap = new EnumMap<>(Spot.class);
        int activePredictors = 0;
        for (Predictor predictor : predictors) {
            List<SpotPrediction> allPredictions = predictor.predictSpot(state, config);
            if (!allPredictions.isEmpty()) {
                activePredictors++;
                List<SpotPrediction> topK = allPredictions.stream()
                        .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
                        .limit(3)
                        .toList();
                for (SpotPrediction sp : topK) {
                    selectedSpotsMap.merge(sp.spot(), sp.probability(), Double::sum);
                }
            }
        }

        if (activePredictors == 0 || selectedSpotsMap.isEmpty()) {
            return List.of();
        }
        double totalSum = selectedSpotsMap.values()
                .stream()
                .mapToDouble(v -> v)
                .sum();
        return selectedSpotsMap.entrySet()
                .stream()
                .map(entry -> SpotPrediction.of(entry.getKey(), entry.getValue() / totalSum))
                .toList();
    }
    private List<SpotPrediction> predictSpotNeigbor(State state, Config config) {
        Spot lastSpot = state.getMarket().getLastSpot();
        if (lastSpot == null) return List.of();

        Spot[] layout = Spot.getWheelLayouts().get(config.rouletteType());
        if (layout == null) return List.of();

        int wheelSize = layout.length;
        int lastPos = lastSpot.getWheelPosition(config.rouletteType());

        if (lastPos == -1) return List.of();
        List<SpotPrediction> predictions = new ArrayList<>();

        for (int i = -neighborCount; i <= neighborCount; i++) {
            int index = (lastPos + i + wheelSize) % wheelSize;
            Spot neighbor = layout[index];
            predictions.add(SpotPrediction.of(neighbor, 1.0));
        }
        return predictions;
    }
}