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