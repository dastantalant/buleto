package com.traderoom.analyzer.test.v15;


import com.traderoom.api.*;
import com.traderoom.api.enums.Color;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.*;
import com.traderoom.api.model.config.Config;
import java.util.*;

public class TrendFollowerPredictor implements Predictor {

    @Override
    public List<SpotPrediction> predictSpot(State state, Config config) {
        return List.of(); // Мы работаем через цвета внутри стратегии
    }

    public Color predict(State state) {
        Spot last = state.getMarket().getLastSpot();
        if (last == null || last.isGreen()) {
            // Если зеро, ищем последний цвет
            List<Spot> history = state.getMarket().getHistory();
            for (int i = history.size() - 1; i >= 0; i--) {
                if (!history.get(i).isGreen()) return history.get(i).getColor();
            }
            return Color.RED; // Дефолт
        }
        return last.getColor();
    }
}