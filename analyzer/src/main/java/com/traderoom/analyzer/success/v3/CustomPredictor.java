package com.traderoom.analyzer.success.v3;

import com.traderoom.api.Predictor;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.SpotPrediction;
import com.traderoom.api.model.State;
import com.traderoom.api.model.config.Config;

import java.util.Comparator;
import java.util.EnumMap;
import java.util.List;

public class CustomPredictor implements Predictor {

    private final List<Predictor> predictors;
    private final int limitBet;
    private final int count;

    public CustomPredictor(int windowSize, int limitBet) {
        this.limitBet = limitBet;
        predictors = List.of(
                new CustomSlidingWindowFreqPredictor(windowSize),
                new CustomPatternPredictor(windowSize));
        int cou = limitBet / predictors.size();
        int div = limitBet % predictors.size();
        count = div == 0 ? cou : cou + 1;
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
                        .limit(count)
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
                .limit(limitBet)
                .mapToDouble(v -> v)
                .sum();
        return selectedSpotsMap.entrySet()
                .stream()
                .limit(limitBet)
                .map(entry -> SpotPrediction.of(entry.getKey(), entry.getValue() / totalSum))
                .toList();
    }

}