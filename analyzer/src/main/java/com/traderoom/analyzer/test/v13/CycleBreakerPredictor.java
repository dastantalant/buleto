package com.traderoom.analyzer.test.v13;

import com.traderoom.api.*;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.*;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.utils.HistoryUtil;

import java.util.*;
import java.util.stream.Collectors;

public class CycleBreakerPredictor implements Predictor {
    private final int windowSize;

    public CycleBreakerPredictor(int windowSize) {
        this.windowSize = windowSize;
    }

    @Override
    public List<SpotPrediction> predictSpot(State state, Config config) {
        Deque<Spot> history = state.getMarket().getHistory();
        if (history.isEmpty()) return List.of();

        // Берем последние N спинов (полуцикл 18-20 чисел)
        int currentWindow = Math.min(history.size(), windowSize);
        List<Spot> cycle = HistoryUtil.window(history,windowSize);//history.subList(history.size() - currentWindow, history.size());

        // Считаем частоту
        Map<Spot, Integer> frequency = new EnumMap<>(Spot.class);
        // Также запоминаем последний индекс, чтобы при равенстве брать более "свежее"
        Map<Spot, Integer> lastSeen = new EnumMap<>(Spot.class);

        for (int i = 0; i < cycle.size(); i++) {
            Spot s = cycle.get(i);
            frequency.merge(s, 1, Integer::sum);
            lastSeen.put(s, i);
        }

        // Сортируем: Сначала по частоте (убывание), потом по свежести (убывание)
        return frequency.entrySet().stream()
                .sorted((e1, e2) -> {
                    int freqCompare = e2.getValue().compareTo(e1.getValue());
                    if (freqCompare != 0) return freqCompare;
                    return lastSeen.get(e2.getKey()).compareTo(lastSeen.get(e1.getKey()));
                })
                .limit(3) // Берем ТОП-3 горячих
                .map(e -> SpotPrediction.of(e.getKey(), 1.0))
                .toList();
    }
}