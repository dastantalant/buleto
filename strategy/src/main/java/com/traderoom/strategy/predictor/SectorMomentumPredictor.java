package com.traderoom.strategy.predictor;

import com.traderoom.api.enums.RouletteType;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.SpotPrediction;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.model.State;
import com.traderoom.api.Predictor;

import java.util.*;

/**
 * Предиктор "Импульса Сектора" (или Почерка Дилера).
 * <p>
 * Анализирует физическое расстояние (в слотах колеса) между последовательными выпадениями.
 * Если дилер бросает шарик ритмично, часто образуется пик в распределении смещений
 * (например, шарик падает через 10-15 слотов от предыдущего номера по часовой стрелке).
 */
public class SectorMomentumPredictor implements Predictor {

    private final int historyDepth;
    private final int sectorWidth;

    public SectorMomentumPredictor() {
        this.historyDepth = 50; // Анализируем последние 50 бросков
        this.sectorWidth = 2;   // Ищем пик +/- 2 слота (сектор из 5 чисел)
    }

    @Override
    public List<SpotPrediction> predictSpot(State state, Config config) {
        List<Spot> history = state.getMarket().getHistory();
        if (history.size() < 2) return List.of();

        RouletteType type = config.rouletteType();
        Spot[] layout = Spot.getWheelLayouts().get(type);
        if (layout == null) return List.of();

        int wheelSize = layout.length;
        Map<Integer, Double> distanceFrequency = new HashMap<>();

        // 1. Анализируем смещения (Distances)
        int start = Math.max(0, history.size() - historyDepth);
        for (int i = start; i < history.size() - 1; i++) {
            Spot current = history.get(i);
            Spot next = history.get(i + 1);

            int pos1 = current.getWheelPosition(type);
            int pos2 = next.getWheelPosition(type);

            if (pos1 == -1 || pos2 == -1) continue;

            // Считаем смещение по часовой стрелке
            int distance = (pos2 - pos1 + wheelSize) % wheelSize;

            // Сглаживаем частоту (Kernel Density Estimation light)
            for (int offset = -1; offset <= 1; offset++) {
                int key = (distance + offset + wheelSize) % wheelSize;
                distanceFrequency.merge(key, 1.0 - (Math.abs(offset) * 0.3), Double::sum);
            }
        }

        if (distanceFrequency.isEmpty()) return List.of();

        // 2. Находим наиболее вероятное смещение
        int bestDistance = distanceFrequency.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse(0);

        // 3. Проецируем от ПОСЛЕДНЕГО выпавшего числа
        Spot lastSpot = state.getMarket().getLastSpot();
        int lastPos = lastSpot.getWheelPosition(type);

        // Целевой центр сектора
        int targetPos = (lastPos + bestDistance) % wheelSize;

        // 4. Формируем прогноз на сектор вокруг цели
        List<SpotPrediction> predictions = new ArrayList<>();
        double totalWeight = 0;

        for (int i = -sectorWidth; i <= sectorWidth; i++) {
            int p = (targetPos + i + wheelSize) % wheelSize;
            Spot spot = layout[p];
            // Чем ближе к центру прогноза, тем выше вероятность
            double prob = 1.0 - (Math.abs(i) * 0.15);
            predictions.add(SpotPrediction.of(spot, prob));
            totalWeight += prob;
        }

        // Нормализация
        final double finalWeight = totalWeight;
        return predictions.stream()
                .map(p -> SpotPrediction.of(p.spot(), p.probability() / finalWeight))
                .toList();
    }

}