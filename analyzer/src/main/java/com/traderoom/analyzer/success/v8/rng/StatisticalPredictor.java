package com.traderoom.analyzer.success.v8.rng;

import com.traderoom.api.Predictor;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.SpotPrediction;
import com.traderoom.api.model.State;
import com.traderoom.api.model.config.Config;

import java.util.Comparator;
import java.util.Deque;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public class StatisticalPredictor implements Predictor {
    // В ГСЧ нет "окон", есть выборка. Мы будем передавать всю выборку текущей сессии.

    @Override
    public List<SpotPrediction> predictSpot(State state, Config config) {
        // Мы используем историю, накопленную только внутри текущей "сессии" стратегии
        Deque<Spot> history = state.getMarket().getHistory();

        if (history.isEmpty()) return List.of();

        // Считаем частоту каждого числа
        Map<Spot, Long> counts = history.stream()
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

        double totalSpins = history.size();

        // Сортируем: сверху самые частые (Горячие)
        return counts.entrySet().stream()
                .map(entry -> {
                    // Вероятность = кол-во выпадений / всего спинов
                    double probability = entry.getValue() / totalSpins;
                    return SpotPrediction.of(entry.getKey(), probability);
                })
                .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
                .toList();
    }
}