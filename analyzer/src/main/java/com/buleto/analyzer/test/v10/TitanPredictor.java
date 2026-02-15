package com.buleto.analyzer.test.v10;

import com.trading.roulette.api.*;
import com.trading.roulette.api.enums.RouletteType;
import com.trading.roulette.api.enums.Spot;
import com.trading.roulette.api.model.*;
import com.trading.roulette.api.model.config.Config;
import com.trading.roulette.api.utils.HistoryUtil;

import java.util.*;
import java.util.stream.Collectors;

public class TitanPredictor implements Predictor {
    private final int windowSize;
    // Карта соседей на колесе (Spot -> List<Spot> [4 слева, spot, 4 справа])
    private final Map<Spot, List<Spot>> wheelNeighbors;

    public TitanPredictor(int windowSize) {
        this.windowSize = windowSize;
        this.wheelNeighbors = buildWheelMap();
    }

    @Override
    public List<SpotPrediction> predictSpot(State state, Config config) {
        Deque<Spot> history = state.getMarket().getHistory();
        if (history.size() < windowSize) return List.of();

        // Берем последние N спинов
//        int start = Math.max(0, history.size() - windowSize);
        List<Spot> recent = HistoryUtil.window(history,windowSize);//history.subList(start, history.size());

        // Считаем вес каждого сектора (9 чисел: центр + 4 соседа с каждой стороны)
        Map<Spot, Double> sectorWeights = new EnumMap<>(Spot.class);

        for (Spot center : Spot.getAvailableList(RouletteType.EUROPEAN)) {
            List<Spot> sector = wheelNeighbors.get(center);
            double weight = 0;

            // Анализируем попадания в этот сектор в истории
            for (int i = 0; i < recent.size(); i++) {
                Spot hSpot = recent.get(i);
                if (sector.contains(hSpot)) {
                    // Чем новее спин, тем выше вес (экспоненциальное затухание)
                    double recencyBonus = 1.0 + (double) i / recent.size();
                    weight += recencyBonus;
                }
            }
            sectorWeights.put(center, weight);
        }

        // Находим лучший сектор
        return sectorWeights.entrySet().stream()
                .sorted(Map.Entry.<Spot, Double>comparingByValue().reversed())
                .limit(1) // Возвращаем только лучший центр сектора
                .map(e -> SpotPrediction.of(e.getKey(), e.getValue()))
                .toList();
    }

    // Строим карту колеса для быстрого доступа к соседям
    private Map<Spot, List<Spot>> buildWheelMap() {
        Map<Spot, List<Spot>> map = new EnumMap<>(Spot.class);
        Spot[] wheel = Spot.getWheelLayouts().get(RouletteType.EUROPEAN);
        int len = wheel.length;

        for (int i = 0; i < len; i++) {
            List<Spot> sector = new ArrayList<>();
            // Берем 4 соседа слева, сам номер, 4 соседа справа (всего 9 номеров ~ 25% колеса)
            for (int offset = -4; offset <= 4; offset++) {
                int index = (i + offset) % len;
                if (index < 0) index += len;
                sector.add(wheel[index]);
            }
            map.put(wheel[i], sector);
        }
        return map;
    }

    public List<Spot> getSector(Spot center) {
        return wheelNeighbors.getOrDefault(center, List.of());
    }
}