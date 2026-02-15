package com.buleto.analyzer.test.v12;


import com.trading.roulette.api.*;
import com.trading.roulette.api.enums.Color;
import com.trading.roulette.api.enums.Spot;
import com.trading.roulette.api.model.*;
import com.trading.roulette.api.model.config.Config;
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