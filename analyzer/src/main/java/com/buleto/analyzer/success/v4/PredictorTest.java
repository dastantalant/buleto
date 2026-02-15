package com.buleto.analyzer.success.v4;

import com.trading.roulette.api.enums.RouletteType;
import com.trading.roulette.api.enums.Spot;
import com.trading.roulette.api.model.SpotPrediction;
import com.trading.roulette.api.utils.HistoryUtil;

import java.util.Deque;
import java.util.LinkedList;
import java.util.List;

@FunctionalInterface
public interface PredictorTest {
    List<SpotPrediction> predict(Deque<Spot> history, RouletteType rouletteType, int windowSize);

    default List<Spot> split(Deque<Spot> history, int windowSize) {
        return HistoryUtil.window(history, windowSize);
    }
}
