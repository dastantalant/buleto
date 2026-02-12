package com.traderoom.analyzer.test.v11;


import com.traderoom.api.*;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.*;
import com.traderoom.api.model.config.Config;
import java.util.*;
import java.util.stream.Collectors;

public class SmartCollectorPredictor implements Predictor {
    private final int windowSize;

    public SmartCollectorPredictor(int windowSize) {
        this.windowSize = windowSize;
    }

    @Override
    public List<SpotPrediction> predictSpot(State state, Config config) {
        List<Spot> history = state.getMarket().getHistory();
        if (history.isEmpty()) return List.of();

        // Берем последние N спинов (цикл)
        int currentWindow = Math.min(history.size(), windowSize);
        List<Spot> cycle = history.subList(history.size() - currentWindow, history.size());

        // Считаем частоту выпадения каждого числа в этом цикле
        Map<Spot, Integer> frequency = new EnumMap<>(Spot.class);
        for (Spot spot : cycle) {
            if (spot == Spot.SPOT_0 || spot == Spot.SPOT_00) continue; // Игнорируем зеро для чистоты
            frequency.merge(spot, 1, Integer::sum);
        }

        // Стратегия: ставим на те числа, которые выпали РОВНО 1 или 2 раза.
        // Мы ловим "горячую волну". Если число выпало 3+ раза, оно "остывает".
        List<SpotPrediction> targets = frequency.entrySet().stream()
                .filter(e -> e.getValue() >= 1 && e.getValue() <= 2)
                .map(e -> SpotPrediction.of(e.getKey(), 1.0)) // Вероятность не важна для флэта
                .toList();

        // Если кандидатов слишком много (покрытие > 18 чисел), это опасно (расход > 50% банка за спин)
        // Ограничиваем список самыми "свежими"
        if (targets.size() > 18) {
            // Сортировка или просто возврат пустого списка, чтобы пропустить ход
            return List.of();
        }

        return targets;
    }
}