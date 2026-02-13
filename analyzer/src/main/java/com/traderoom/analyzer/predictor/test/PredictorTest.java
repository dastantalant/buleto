package com.traderoom.analyzer.predictor.test;

import com.traderoom.api.enums.RouletteType;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.SpotPrediction;
import com.traderoom.api.utils.HistoryUtil;

import java.util.Deque;
import java.util.LinkedList;
import java.util.List;

@FunctionalInterface
public interface PredictorTest {
    List<SpotPrediction> predict(Deque<Spot> history, RouletteType rouletteType, int windowSize);

    default List<Spot> split( Deque<Spot> history, int windowSize) {
        return HistoryUtil.window(history, windowSize);
    }
}
