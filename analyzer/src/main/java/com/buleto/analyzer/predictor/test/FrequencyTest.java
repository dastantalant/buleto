package com.buleto.analyzer.predictor.test;

import com.trading.roulette.api.enums.RouletteType;
import com.trading.roulette.api.enums.Spot;
import com.trading.roulette.api.model.SpotPrediction;

import java.util.Comparator;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class FrequencyTest implements PredictorTest {

    @Override
    public List<SpotPrediction> predict(Deque<Spot> history, RouletteType rouletteType, int windowSize) {
        List<Spot> window = split(history, windowSize);
        double totalInWindow = window.size();

        Map<Integer, Long> counts = window.stream()
                .collect(Collectors.groupingBy(Spot::getNumber, Collectors.counting()));

        return counts.entrySet().stream()
                .map(e -> SpotPrediction.of(Spot.getByNumber(e.getKey()), e.getValue() / totalInWindow))
                .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
                .collect(Collectors.toCollection(LinkedList::new));
    }
}
