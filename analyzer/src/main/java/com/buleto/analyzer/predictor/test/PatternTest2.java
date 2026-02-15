package com.buleto.analyzer.predictor.test;

import com.trading.roulette.api.enums.RouletteType;
import com.trading.roulette.api.enums.Spot;
import com.trading.roulette.api.model.SpotPrediction;

import java.util.Comparator;
import java.util.Deque;
import java.util.EnumMap;
import java.util.List;
import java.util.stream.Collectors;

@Deprecated
public class PatternTest2 implements PredictorTest {

    private static final double PROB = 1.0 / 37.0;

    /**
     * Главный метод прогнозирования.
     * <p>
     * Алгоритм:
     * 1. Берет срез истории (последние N спинов).
     * 2. Рассчитывает 3 карты весов: Базовая частота, Hot/Cold статус, Паттерны.
     * 3. Перемножает веса для каждого числа рулетки: {@code Prob = Base * HotCold * Pattern}.
     * 4. Нормализует результаты (сумма вероятностей = 100%).
     */
    public List<SpotPrediction> predict(Deque<Spot> history, RouletteType rouletteType, int windowSize) {
        List<Spot> window = split(history, windowSize);
        // 1. Z-Score: Глобальный статистический анализ (на всем окне 1000+ спинов)
        // Показывает, какие числа переоценены или недооценены ГСЧ.
        var statsWeights = calculateStatisticalAnomalies(window, rouletteType);
        // 2. Recency: Локальный тренд (последние 20 спинов)
        // Показывает, что "нравится" ГСЧ прямо сейчас.
        var recencyWeights = calculateRecencyWeights(window, rouletteType);
        List<Spot> availableSpots = Spot.getAvailableList(rouletteType);
        List<SpotPrediction> predictions = availableSpots.stream()
                .map(spot -> {
                    double statW = statsWeights.getOrDefault(spot, 1.0);
                    double recW = recencyWeights.getOrDefault(spot, 1.0);
                    // В RNG мы комбинируем:
                    // Долгосрочный дефицит (Stats) * Краткосрочный тренд (Recency)
                    double combinedProb = PROB * statW * recW;
                    return SpotPrediction.of(spot, combinedProb);
                })
                // Убираем совсем маловероятные, чтобы не распылять банк
                .filter(p -> p.probability() > PROB)
                .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
                .toList();

        return normalizeProbabilities(predictions);
    }

    /**
     * Рассчитывает веса на основе Z-Score (Стандартного отклонения).
     * Z = (X - μ) / σ
     * Где:
     * X - количество выпадений числа
     * μ (mu) - ожидаемое количество (TotalSpins * 1/37)
     * σ (sigma) - стандартное отклонение (sqrt(TotalSpins * p * (1-p)))
     */
    private EnumMap<Spot, Double> calculateStatisticalAnomalies(List<Spot> history, RouletteType rouletteType) {
        EnumMap<Spot, Double> weights = new EnumMap<>(Spot.class);
        int n = history.size();
        if (n < 50) { // Нужно хотя бы 50 спинов для валидной статистики
            Spot.getAvailableList(rouletteType).forEach(s -> weights.put(s, 1.0));
            return weights;
        }
        double expectedCount = n * PROB; // μ
        double stdDev = Math.sqrt(n * PROB * (1.0 - PROB)); // σ
        // Считаем реальное количество выпадений
        EnumMap<Spot, Long> counts = history.stream()
                .collect(Collectors.groupingBy(s -> s, () -> new EnumMap<>(Spot.class), Collectors.counting()));
        for (Spot spot : Spot.getAvailableList(rouletteType)) {
            long count = counts.getOrDefault(spot, 0L);
            double zScore = (count - expectedCount) / stdDev;
            double weight = 1.0;
            // Стратегия 1: "Горячие кластеры" (RNG часто выдает серии)
            // Если число выпадает значительно чаще нормы (Z > 2.0), RNG может "залипнуть" на нем.
            if (zScore > 2.0) {
                weight *= 1.3; // Бонус горячим
            }
            // Стратегия 2: "Возврат к среднему" (Mean Reversion)
            // Если число ОЧЕНЬ отстает (Z < -2.5), математика "давит" на его выпадение.
            // Осторожно: в RNG это может длиться долго.
            else if (zScore < -2.0) {
                weight *= 1.15; // Небольшой бонус на возврат
            }
            // Число в пределах нормы - ничего не делаем
            else {
                weight = 1.0;
            }
            weights.put(spot, weight);
        }
        return weights;
    }

    private EnumMap<Spot, Double> calculateRecencyWeights(List<Spot> history, RouletteType rouletteType) {
        EnumMap<Spot, Double> weights = new EnumMap<>(Spot.class);
        List<Spot> available = Spot.getAvailableList(rouletteType);
        available.forEach(s -> weights.put(s, 1.0));
        // Проходим по истории с конца к началу
        // Чем новее спин, тем сильнее он влияет на вес
        double decayFactor = 0.95; // Коэффициент затухания
        double currentInfluence = 1.5; // Начальная сила влияния последнего числа
        int limit = Math.min(history.size(), 20); // Смотрим только последние 20
        for (int i = 0; i < limit; i++) {
            Spot spot = history.get(history.size() - 1 - i);
            // Увеличиваем вес числа
            double oldWeight = weights.get(spot);
            weights.put(spot, oldWeight + (currentInfluence * 0.1)); // Добавляем долю влияния
            // Уменьшаем влияние для следующего шага
            currentInfluence *= decayFactor;
        }
        return weights;
    }

    /**
     * Нормализует список прогнозов, чтобы сумма вероятностей была равна 1.0.
     * Это необходимо для корректной работы стратегий, распределяющих бюджет
     */
    private List<SpotPrediction> normalizeProbabilities(List<SpotPrediction> predictions) {
        double sum = predictions.stream()
                .mapToDouble(SpotPrediction::probability)
                .sum();
        boolean invalidSum = (sum <= 0 || Double.isNaN(sum) || Double.isInfinite(sum));
        if (invalidSum && !predictions.isEmpty()) {
            double evenProb = 1.0 / predictions.size();
            return predictions.stream()
                    .map(p -> SpotPrediction.of(p.spot(), evenProb))
                    .toList();
        } else if (invalidSum) {
            return List.of();
        }
        return predictions.stream()
                .map(p -> SpotPrediction.of(p.spot(), p.probability() / sum))
                .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
                .toList();
    }
}
