package com.buleto.analyzer.predictor;


import com.trading.roulette.api.Predictor;
import com.trading.roulette.api.enums.Spot;
import com.trading.roulette.api.model.SpotPrediction;
import com.trading.roulette.api.model.State;
import com.trading.roulette.api.model.config.Config;
import com.trading.roulette.api.utils.HistoryUtil;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Deque;
import java.util.EnumMap;
import java.util.List;
import java.util.stream.Collectors;

/**
 * <strong>PatternPredictor</strong> — это гибридный предиктор, который комбинирует частотный анализ
 * с поиском специфических паттернов поведения рулетки.
 * <p>
 * Он рассчитывает вероятность выпадения каждого числа на основе трех факторов:
 * <ol>
 *     <li><strong>Базовая частота (Base Frequency):</strong> Как часто число выпадало в скользящем окне.</li>
 *     <li><strong>Веса Hot/Cold:</strong> Корректировка на основе "температуры" числа (давно не было или выпадает часто).</li>
 *     <li><strong>Паттерны последовательностей:</strong> Поиск арифметических и повторяющихся зависимостей.</li>
 * </ol>
 *
 * <h3>Примеры логики:</h3>
 * <ul>
 *     <li>Если число выпадало часто за последние 10 спинов, его вес увеличивается (Hot Spot).</li>
 *     <li>Если число не выпадало очень давно (>15 спинов), его вес уменьшается (избегаем "холодных").</li>
 *     <li>Если выпало <strong>10, 20, 10</strong>, предиктор повысит вероятность выпадения <strong>20</strong> (паттерн A-B-A).</li>
 *     <li>Если выпало <strong>25</strong>, предиктор повысит вероятность <strong>24</strong> и <strong>26</strong> (соседние номиналы).</li>
 * </ul>
 */
public class CustomPatternPredictorV2 implements Predictor {

    // --- Весовые коэффициенты (Настройка "характера" предиктора) ---

    /**
     * Множитель для "Горячих" чисел (Hot Spot).
     * Если число выпало >1 раза в недавнем окне, его вероятность умножается на 1.2.
     * Это стратегия следования за трендом.
     */
    private final double hotSpotWeight = 1.2;

    /**
     * Множитель для "Холодных" чисел.
     * Если числа давно не было, его вероятность умножается на 0.8 (снижается).
     */
    private final double coldSpotWeight = 0.8;

    /**
     * Множитель для чисел, которых не было вообще в окне анализа.
     * Сильное снижение вероятности (x0.5).
     */
    private final double neverSeenWeight = 0.5;

    /**
     * Множитель для числовых соседей (Consecutive).
     * Пример: выпало 5. Числа 4 и 6 получат бонус x1.3.
     */
    private final double consecutiveWeight = 1.3;

    /**
     * Множитель для повторяющегося паттерна (A-B-A -> B).
     * Пример: 10-5-10 -> ожидаем 5. Бонус x1.1.
     */
    private final double repeatingPatternWeight = 1.1;

    /**
     * Множитель повтора последнего числа.
     * Пример: выпало 32. Вероятность повтора 32 умножается на 0.7 (считаем повтор маловероятным).
     */
    private final double lastSpotWeight = 0.7;

    // --- Настройки окна анализа ---

    /**
     * Размер скользящего окна истории (например, 1024 последних спина).
     */
    private final int analysisWindowSize;

    /**
     * Размер "короткого" окна для определения Hot Spot (последние 10 спинов).
     */
    private final int hotWindowSize = 10;

    /**
     * Порог "холода": сколько спинов число не выпадало, чтобы считаться холодным (15).
     */
    private final int coldThreshold = 15;

    /**
     * Минимальное количество истории для начала работы (4).
     */
    private final int minHistoryRequired = 4;

    private final double defaultProbability = 0.0;

    /**
     * Конструктор по умолчанию. Использует окно анализа 1024.
     */
    public CustomPatternPredictorV2() {
        this(1024);
    }

    /**
     * Основной конструктор.
     *
     * @param analysisWindowSize Глубина истории для анализа частот.
     */
    public CustomPatternPredictorV2(int analysisWindowSize) {
        this.analysisWindowSize = analysisWindowSize;
    }


    /**
     * Главный метод прогнозирования.
     * <p>
     * Алгоритм:
     * 1. Берет срез истории (последние N спинов).
     * 2. Рассчитывает 3 карты весов: Базовая частота, Hot/Cold статус, Паттерны.
     * 3. Перемножает веса для каждого числа рулетки: {@code Prob = Base * HotCold * Pattern}.
     * 4. Нормализует результаты (сумма вероятностей = 100%).
     */
    @Override
    public List<SpotPrediction> predictSpot(State state, Config config) {
        List<Spot> history = HistoryUtil.window(state, analysisWindowSize);
        if (history.size() < minHistoryRequired) return List.of();

        // 1. Z-Score: Глобальный статистический анализ (на всем окне 1000+ спинов)
        // Показывает, какие числа переоценены или недооценены ГСЧ.
        var statsWeights = calculateStatisticalAnomalies(history, config);

        // 2. Recency: Локальный тренд (последние 20 спинов)
        // Показывает, что "нравится" ГСЧ прямо сейчас.
        var recencyWeights = calculateRecencyWeights(history, config);

        List<Spot> availableSpots = Spot.getAvailableList(config.rouletteType());

        List<SpotPrediction> predictions = availableSpots.stream()
                .map(spot -> {
                    double statW = statsWeights.getOrDefault(spot, 1.0);
                    double recW = recencyWeights.getOrDefault(spot, 1.0);

                    // Базовая вероятность 1/37 (0.027)
                    double baseProb = 1.0 / 37.0;

                    // В RNG мы комбинируем:
                    // Долгосрочный дефицит (Stats) * Краткосрочный тренд (Recency)
                    double combinedProb = baseProb * statW * recW;

                    return SpotPrediction.of(spot, combinedProb);
                })
                // Убираем совсем маловероятные, чтобы не распылять банк
                .filter(p -> p.probability() > (1.0 / 37.0))
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
    private EnumMap<Spot, Double> calculateStatisticalAnomalies(List<Spot> history, Config config) {
        EnumMap<Spot, Double> weights = new EnumMap<>(Spot.class);
        int n = history.size();
        if (n < 50) { // Нужно хотя бы 50 спинов для валидной статистики
            Spot.getAvailableList(config.rouletteType()).forEach(s -> weights.put(s, 1.0));
            return weights;
        }

        double p = 1.0 / 37.0; // Вероятность для одного числа
        double expectedCount = n * p; // μ
        double stdDev = Math.sqrt(n * p * (1.0 - p)); // σ

        // Считаем реальное количество выпадений
        EnumMap<Spot, Long> counts = history.stream()
                .collect(Collectors.groupingBy(s -> s, () -> new EnumMap<>(Spot.class), Collectors.counting()));

        for (Spot spot : Spot.getAvailableList(config.rouletteType())) {
            long count = counts.getOrDefault(spot, 0L);
            double zScore = (count - expectedCount) / stdDev;

            // --- ЛОГИКА СТРАТЕГИИ ---
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

    private EnumMap<Spot, Double> calculateRecencyWeights(List<Spot> history, Config config) {
        EnumMap<Spot, Double> weights = new EnumMap<>(Spot.class);
        List<Spot> available = Spot.getAvailableList(config.rouletteType());

        // Инициализируем единицами
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
     * Возвращает "скользящее окно" истории (последние N элементов).
     * Это позволяет предиктору адаптироваться к изменениям и забывать старые данные.
     */
//    private List<Spot> getSlidingWindow(State state) {
//        Deque<Spot> fullHistory = state.getMarket().getHistory();
//        if (fullHistory.isEmpty()) return List.of();
//        int size = fullHistory.size();
//        int window = Math.min(analysisWindowSize, size);
//        List<Spot> result = new ArrayList<>(window);
//        var iterator = fullHistory.descendingIterator();
//        int collected = 0;
//        while (iterator.hasNext() && collected < window) {
//            result.add(iterator.next());
//            collected++;
//        }
//        Collections.reverse(result);
//        return result;
//    }

    /**
     * Рассчитывает базовую частоту выпадения чисел в окне.
     * <br>Formula: {@code Count(Spot) / TotalSpins}
     */
    private EnumMap<Spot, Double> calculateBaseFrequency(List<Spot> history) {
        EnumMap<Spot, Double> frequency = new EnumMap<>(Spot.class);
        double totalCount = history.size();
        if (totalCount == 0) {
            return frequency;
        }

        for (Spot spot : history) {
            frequency.merge(spot, 1.0, Double::sum);
        }

        frequency.replaceAll((k, v) -> v / totalCount);
        return frequency;
    }

    /**
     * Рассчитывает веса на основе "температуры" чисел.
     * <ul>
     *     <li><strong>Hot:</strong> Если число было >1 раза в последних 10 спинах.</li>
     *     <li><strong>Cold:</strong> Если числа не было более 15 спинов (налагается штраф).</li>
     *     <li><strong>Never Seen:</strong> Если числа вообще нет в истории окна.</li>
     * </ul>
     */
    private EnumMap<Spot, Double> calculateHotColdWeights(List<Spot> history, Config config) {
        EnumMap<Spot, Double> weights = new EnumMap<>(Spot.class);
        int historySize = history.size();
        int effectiveHotWindow = Math.min(hotWindowSize, historySize);

        EnumMap<Spot, Integer> recentCount = new EnumMap<>(Spot.class);
        EnumMap<Spot, Integer> lastAppearanceIndex = new EnumMap<>(Spot.class);

        // Анализируем историю
        for (int i = 0; i < historySize; i++) {
            Spot spot = history.get(i);
            lastAppearanceIndex.put(spot, i);

            // Если это последние N спинов - считаем их для Hot Spot
            if (i >= historySize - effectiveHotWindow) {
                recentCount.merge(spot, 1, Integer::sum);
            }
        }

        for (Spot spot : Spot.getAvailableList(config.rouletteType())) {
            double weight = 1.0;

            // Логика Hot Spot
            int recentAppearances = recentCount.getOrDefault(spot, 0);
            if (recentAppearances > 1) {
                weight *= hotSpotWeight; // x1.2
            }

            // Логика Cold / Never Seen
            Integer lastPos = lastAppearanceIndex.get(spot);
            if (lastPos != null) {
                int gapSinceLastAppearance = historySize - lastPos - 1;
                if (gapSinceLastAppearance > coldThreshold) {
                    weight *= coldSpotWeight; // x0.8 (штраф за "холод")
                }
            } else {
                weight *= neverSeenWeight; // x0.5 (сильный штраф)
            }

            weights.put(spot, weight);
        }
        return weights;
    }

    /**
     * Рассчитывает веса на основе паттернов последовательностей.
     * Анализирует ПОСЛЕДНЕЕ выпавшее число и ищет связи с кандидатами.
     */
    private EnumMap<Spot, Double> calculatePatternWeights(List<Spot> history, Config config) {
        EnumMap<Spot, Double> weights = new EnumMap<>(Spot.class);
        List<Spot> availableSpots = Spot.getAvailableList(config.rouletteType());

        if (history.size() < minHistoryRequired - 1) {
            availableSpots.forEach(spot -> weights.put(spot, 1.0));
            return weights;
        }

        Spot lastSpot = history.getLast();

        for (Spot spot : availableSpots) {
            double weight = 1.0;

            // 1. Арифметические соседи (выпало 10 -> ставим на 9 и 11)
            if (isConsecutiveNumber(lastSpot, spot)) {
                weight *= consecutiveWeight; // x1.3
            }

            // 2. Повторяющийся паттерн A-B-A (выпало 10, 20, 10 -> ставим на 20)
            if (hasRepeatingPattern(history, spot)) {
                weight *= repeatingPatternWeight; // x1.1
            }

            // 3. Повтор самого числа (выпало 5 -> ставим на 5)
            // Здесь мы занижаем вероятность (LastSpotWeight < 1.0)
            if (lastSpot == spot) {
                weight *= lastSpotWeight; // x0.7
            }

            weights.put(spot, weight);
        }
        return weights;
    }

    /**
     * Проверяет, являются ли числа арифметическими соседями (разница по модулю = 1).
     *
     * @param spot1 Последнее выпавшее число.
     * @param spot2 Кандидат.
     * @return true, если числа идут подряд (например, 22 и 23).
     */
    private boolean isConsecutiveNumber(Spot spot1, Spot spot2) {
        int num1 = spot1.getNumber();
        int num2 = spot2.getNumber();
        return num1 > 0 && num2 > 0 && Math.abs(num1 - num2) == 1;
    }

    /**
     * Проверяет паттерн A-B-A.
     * <br>Логика: Если история [..., A, B, A], то мы ожидаем B.
     * <br>Пример: История [Red(3), Black(10), Red(3)]. TargetSpot = Black(10). Вернет true.
     */
    private boolean hasRepeatingPattern(List<Spot> history, Spot targetSpot) {
        int size = history.size();
        if (size < 3) return false;

        Spot a1 = history.get(size - 3); // Пред-предпоследнее
        Spot b = history.get(size - 2);  // Предпоследнее
        Spot a2 = history.get(size - 1); // Последнее (Last)

        // Если A1 == A2 (паттерн замкнулся) и B == Target (кандидат совпадает с серединой)
        return a1 == a2 && b == targetSpot;
    }

    /**
     * Нормализует список прогнозов, чтобы сумма вероятностей была равна 1.0.
     * Это необходимо для корректной работы стратегий, распределяющих бюджет (например, Kelly).
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