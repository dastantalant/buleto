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
        Deque<Spot> history = state.getMarket().getHistory();
        if (history.isEmpty()) {
            return Color.RED;
        }

        var it = history.descendingIterator();
        Spot last = it.next();

        if (!last.isGreen()) {
            return last.getColor();
        }

        while (it.hasNext()) {
            Spot s = it.next();
            if (!s.isGreen()) {
                return s.getColor();
            }
        }

        return Color.RED;
    }
}