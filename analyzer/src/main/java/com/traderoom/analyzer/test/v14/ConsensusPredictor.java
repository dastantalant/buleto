package com.traderoom.analyzer.test.v14;


import com.traderoom.api.*;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.*;
import com.traderoom.api.model.config.Config;
import java.util.*;
import java.util.stream.Collectors;

public class ConsensusPredictor implements Predictor {
    // Веса для разных окон
    private static final double W_SHORT = 2.5; // Короткий тренд самый важный
    private static final double W_MED = 1.0;   // Подтверждение
    private static final double W_LONG = 0.5;  // Общий фон

    private final int shortWin = 15;
    private final int medWin = 60;
    private final int longWin = 200;

    @Override
    public List<SpotPrediction> predictSpot(State state, Config config) {
        List<Spot> history = state.getMarket().getHistory();
        if (history.size() < medWin) return List.of(); // Нужно хотя бы среднее окно

        // Карты частот для трех окон
        Map<Spot, Double> shortScores = getFreqMap(history, shortWin);
        Map<Spot, Double> medScores = getFreqMap(history, medWin);
        Map<Spot, Double> longScores = getFreqMap(history, longWin);

        Map<Spot, Double> finalScore = new HashMap<>();

        for (Spot spot : Spot.getAvailableList(config.rouletteType())) {
            double s = shortScores.getOrDefault(spot, 0.0);
            double m = medScores.getOrDefault(spot, 0.0);
            double l = longScores.getOrDefault(spot, 0.0);

            // ФОРМУЛА КОНСЕНСУСА
            // 1. Базовый счет: взвешенная сумма частот
            double score = (s * W_SHORT) + (m * W_MED);

            // 2. Фильтр "Перегрева": Если на длинной дистанции число выпадало
            // СЛИШКОМ часто (больше 3 сигм), мы его штрафуем, оно скоро уйдет в спячку.
            // Ожидаемое кол-во за 200 спинов ~ 5.4 раз. Если выпало 12+ раз, это перебор.
            if (l > 12) {
                score *= 0.5; // Штраф
            } else if (l < 2) {
                score *= 0.8; // Штраф за "мертвое" число (холодильник)
            } else {
                score += (l * W_LONG); // Бонус за нормальную активность
            }

            finalScore.put(spot, score);
        }

        // Возвращаем Топ-5 с нормализованной вероятностью
        return finalScore.entrySet().stream()
                .sorted(Map.Entry.<Spot, Double>comparingByValue().reversed())
                .limit(5)
                .map(e -> SpotPrediction.of(e.getKey(), e.getValue()))
                .collect(Collectors.toList());
    }

    private Map<Spot, Double> getFreqMap(List<Spot> history, int window) {
        Map<Spot, Double> map = new HashMap<>();
        int start = Math.max(0, history.size() - window);
        List<Spot> sub = history.subList(start, history.size());
        for (Spot s : sub) {
            map.merge(s, 1.0, Double::sum);
        }
        return map;
    }
}