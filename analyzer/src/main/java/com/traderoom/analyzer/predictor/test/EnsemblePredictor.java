package com.traderoom.analyzer.predictor.test;

import com.traderoom.api.enums.RouletteType;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.SpotPrediction;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class EnsemblePredictor implements PredictorTest {
    private final List<PredictorTest> predictions;

    public EnsemblePredictor() {
        predictions = List.of(new BayesianTest(), new FrequencyTest(), new PatternTest());
    }

    @Override
    public List<SpotPrediction> predict(Deque<Spot> history, RouletteType rouletteType, int windowSize) {
        Map<Spot, Double> accumulator = HashMap.newHashMap(48);
        for (var prediction : predictions) {
            for (var predict : prediction.predict(history, rouletteType, windowSize)) {
                accumulator.merge(predict.spot(), predict.probability(), Double::sum);
            }
        }
        var result = new ArrayList<SpotPrediction>(accumulator.size());
        accumulator.forEach((spot, prob) -> result.add(SpotPrediction.of(spot, prob)));
        result.sort(Comparator.comparingDouble(SpotPrediction::probability).reversed());
        return result;
    }
}
