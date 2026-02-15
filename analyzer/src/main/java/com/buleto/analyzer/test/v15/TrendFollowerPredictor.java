package com.buleto.analyzer.test.v15;


import com.trading.roulette.api.*;
import com.trading.roulette.api.enums.Color;
import com.trading.roulette.api.enums.Spot;
import com.trading.roulette.api.model.*;
import com.trading.roulette.api.model.config.Config;
import java.util.*;

public class TrendFollowerPredictor implements Predictor {

    @Override
    public List<SpotPrediction> predictSpot(State state, Config config) {
        return List.of(); // Мы работаем через цвета внутри стратегии
    }

    public Color predict(State state) {
        Deque<Spot> history = state.getMarket().getHistory();
        if (history.isEmpty()) {
            return Color.RED; // или другой дефолт
        }

        var it = history.descendingIterator();
        Spot last = it.next();

        if (!last.isGreen()) {
            return last.getColor();
        }

        // ищем последний не-зелёный с конца
        while (it.hasNext()) {
            Spot spot = it.next();
            if (!spot.isGreen()) {
                return spot.getColor();
            }
        }

        return Color.RED; // дефолт, если вся история — только зелёные
    }
}