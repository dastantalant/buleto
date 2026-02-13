package com.traderoom.strategy.predictor;

import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.*;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.Predictor;
import com.traderoom.api.utils.HistoryUtil;

import java.util.*;

public class MarkovPredictor implements Predictor {
    private final int windowSize;

    public MarkovPredictor() {
        this(1000);
    }

    public MarkovPredictor(int windowSize) {
        this.windowSize = windowSize;
    }

    @Override
    public List<SpotPrediction> predictSpot(State state, Config config) {
        List<Spot> window = HistoryUtil.window(state, windowSize);
        if (window.size() < 2) return List.of();

        Spot lastSpot = state.getMarket().getLastSpot();

        // 1. Строим карту переходов только для текущего окна
        // Смотрим, куда переходил lastSpot в пределах этого окна
        Map<Spot, Integer> transitions = new EnumMap<>(Spot.class);
        long totalTransitions = 0;

        for (int i = 0; i < window.size() - 1; i++) {
            if (window.get(i) == lastSpot) {
                Spot next = window.get(i + 1);
                transitions.merge(next, 1, Integer::sum);
                totalTransitions++;
            }
        }

        if (totalTransitions == 0) return List.of();

        final double finalTotal = totalTransitions;
        return Spot.getAvailableList(config.rouletteType()).stream()
                .map(spot -> {
                    int count = transitions.getOrDefault(spot, 0);
                    return SpotPrediction.of(spot, count / finalTotal);
                })
                .filter(p -> p.probability() > 0)
                .toList();
    }

}