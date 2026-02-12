package com.traderoom.analyzer.test.v12;


import com.traderoom.api.*;
import com.traderoom.api.enums.Color;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.*;
import com.traderoom.api.model.config.Config;
import java.util.*;

public class TrendPredictor implements Predictor {

    @Override
    public List<SpotPrediction> predictSpot(State state, Config config) {
        // Нам не нужны SpotPrediction, мы работаем с цветами в стратегии.
        // Но интерфейс требует реализации.
        return List.of();
    }

    // Метод специально для стратегии цветов
    public Color predictNextColor(State state) {
        Spot lastSpot = state.getMarket().getLastSpot();

        // Если истории нет или последний был Зеро - ставим на Красное по умолчанию
        if (lastSpot == null || lastSpot.isGreen()) {
            // Пытаемся найти последний не зеленый
            List<Spot> history = state.getMarket().getHistory();
            for (int i = history.size() - 1; i >= 0; i--) {
                Spot s = history.get(i);
                if (!s.isGreen()) {
                    return s.getColor();
                }
            }
            return Color.RED; // Дефолт
        }

        return lastSpot.getColor();
    }
}