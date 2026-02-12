package com.traderoom.analyzer.success.v4;

import com.traderoom.api.enums.RouletteType;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.SpotPrediction;

import java.util.Comparator;
import java.util.EnumMap;
import java.util.List;

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
public class PatternTest implements PredictorTest {

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
     * Главный метод прогнозирования.
     * <p>
     * Алгоритм:
     * 1. Берет срез истории (последние N спинов).
     * 2. Рассчитывает 3 карты весов: Базовая частота, Hot/Cold статус, Паттерны.
     * 3. Перемножает веса для каждого числа рулетки: {@code Prob = Base * HotCold * Pattern}.
     * 4. Нормализует результаты (сумма вероятностей = 100%).
     */

    @Override
    public List<SpotPrediction> predict(List<Spot> history, RouletteType rouletteType, int windowSize) {
        List<Spot> window = split(history, windowSize);
        // Шаг 1: Базовая математическая вероятность (Частота выпадения)
        EnumMap<Spot, Double> baseFrequency = calculateBaseFrequency(window);
        // Шаг 2: Корректировка на "температуру" числа
        EnumMap<Spot, Double> hotColdWeights = calculateHotColdWeights(window, rouletteType);
        // Шаг 3: Корректировка на последовательности чисел
        EnumMap<Spot, Double> patternWeights = calculatePatternWeights(window, rouletteType);
        List<Spot> availableSpots = Spot.getAvailableList(rouletteType);
        if (availableSpots.isEmpty()) {
            return List.of();
        }
        // Комбинирование факторов
        List<SpotPrediction> predictions = availableSpots.stream()
                .map(spot -> {
                    double base = baseFrequency.getOrDefault(spot, defaultProbability);
                    double hotCold = hotColdWeights.getOrDefault(spot, 1.0);
                    double pattern = patternWeights.getOrDefault(spot, 1.0);
                    // Мультипликативная модель: факторы усиливают или ослабляют друг друга
                    double combinedProb = base * hotCold * pattern;
                    return SpotPrediction.of(spot, combinedProb);
                })
                .filter(prediction -> prediction.probability() > 0)
                .toList();

        return normalizeProbabilities(predictions);
    }

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
    private EnumMap<Spot, Double> calculateHotColdWeights(List<Spot> history, RouletteType rouletteType) {
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
        for (Spot spot : Spot.getAvailableList(rouletteType)) {
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
    private EnumMap<Spot, Double> calculatePatternWeights(List<Spot> history, RouletteType rouletteType) {
        EnumMap<Spot, Double> weights = new EnumMap<>(Spot.class);
        List<Spot> availableSpots = Spot.getAvailableList(rouletteType);
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