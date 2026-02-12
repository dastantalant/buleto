package com.traderoom.analyzer.success.v4;

import com.traderoom.api.enums.RouletteType;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.SpotPrediction;

import java.util.LinkedList;
import java.util.List;

@FunctionalInterface
public interface PredictorTest {
    List<SpotPrediction> predict(List<Spot> history, RouletteType rouletteType, int windowSize);

    default List<Spot> split(List<Spot> history, int windowSize) {
        int size = history.size();
        if (size == 0 || windowSize > history.size()) return new LinkedList<>();
        int start = Math.max(0, size - windowSize);
        return history.subList(start, size);
    }
}
