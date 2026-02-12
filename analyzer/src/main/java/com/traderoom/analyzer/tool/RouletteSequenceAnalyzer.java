package com.traderoom.analyzer.tool;


import com.traderoom.api.enums.RouletteType;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.SpotPrediction;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Инструмент для статистической характеризации последовательности ГСЧ.
 * Использует Z-Score (Стандартное отклонение) для поиска аномалий.
 */
public class RouletteSequenceAnalyzer {

    private final List<Spot> history;

    public RouletteSequenceAnalyzer(Collection<Integer> numbers) {
        this.history = numbers.stream()
                .map(n -> n == -1 ? Spot.SPOT_0 : Spot.getByNumber(n))
                .toList();
    }

    public AnalysisReport analyze() {
        int totalSpins = history.size();
        if (totalSpins < 37) {
            return new AnalysisReport("Недостаточно данных (нужно > 37 спинов)", List.of(), Map.of());
        }

        // 1. Частотный анализ
        Map<Spot, Long> frequency = history.stream()
                .collect(Collectors.groupingBy(s -> s, Collectors.counting()));

        // 2. Расчет Математического Ожидания и Z-Score
        // Вероятность выпадения одного числа (1/37)
        double p = 1.0 / 37.0;
        // Ожидаемое количество выпадений за N спинов
        double expectedCount = totalSpins * p;
        // Стандартное отклонение (Sigma)
        double sigma = Math.sqrt(totalSpins * p * (1 - p));

        List<SpotStat> stats = new ArrayList<>();

        for (Spot spot : Spot.getAvailableList(RouletteType.EUROPEAN)) {
            long count = frequency.getOrDefault(spot, 0L);
            // Формула Z-Score: (Факт - Ожидание) / Сигма
            double zScore = (count - expectedCount) / sigma;
            stats.add(new SpotStat(spot, count, zScore));
        }

        // Сортируем от самых горячих (Z > 0) к холодным
        stats.sort(Comparator.comparingDouble(SpotStat::zScore).reversed());

        // 3. Анализ Шансов (Красное/Черное)
        long redCount = history.stream().filter(Spot::isRed).count();
        long blackCount = history.stream().filter(Spot::isBlack).count();
        long zeroCount = history.stream().filter(s -> s == Spot.SPOT_0).count();

        Map<String, String> characteristics = new LinkedHashMap<>();
        characteristics.put("Total Spins", String.valueOf(totalSpins));
        characteristics.put("Balance R/B", String.format("Red: %d | Black: %d (Diff: %d)", redCount, blackCount, (redCount - blackCount)));
        characteristics.put("Zero Hits", String.format("%d (Exp: %.1f)", zeroCount, expectedCount));

        // Оценка состояния рынка (Хаос или Тренд)
        // Если у Топ-1 числа Z-Score > 3.0 -> Рынок Аномальный (Трендовый)
        double topZ = stats.get(0).zScore;
        String marketState = "FLAT (Спокойный)";
        if (topZ > 3.0) marketState = "EXTREME ANOMALY (Очень сильный перекос)";
        else if (topZ > 2.0) marketState = "TRENDING (Есть лидеры)";

        characteristics.put("Market State", marketState);

        return new AnalysisReport(marketState, stats, characteristics);
    }

    // --- Вложенные классы для результатов ---

    public record SpotStat(Spot spot, long count, double zScore) {
        public String getStatus() {
            if (zScore > 3.0) return "🔥🔥 SUPER HOT";
            if (zScore > 2.0) return "🔥 HOT";
            if (zScore > 1.0) return "WARM";
            if (zScore < -2.0) return "❄️ ICE COLD";
            return "NORMAL";
        }
    }

    public record AnalysisReport(String summary, List<SpotStat> spotStats, Map<String, String> properties) {

        // Метод для получения прогноза (как StatisticalPredictor)
        public List<SpotPrediction> getPredictiveSuggestions(int limit) {
            // Стратегия: Ставим на Hot (> 2.0) и Warm (> 1.0)
            // Игнорируем Super Hot (> 3.0) так как возможен откат (Mean Reversion),
            // но для ГСЧ лучше следовать за трендом.
            return spotStats.stream()
                    .filter(s -> s.zScore > 0.5) // Берем все, что выше среднего
                    .limit(limit)
                    .map(s -> SpotPrediction.of(s.spot(), normalizeProb(s.zScore)))
                    .toList();
        }

        private double normalizeProb(double zScore) {
            // Превращаем Z-Score в условную вероятность (для сортировки)
            return 0.027 + (zScore * 0.005);
        }

        public void print() {
            System.out.println("\n=== ROULETTE SEQUENCE ANALYSIS ===");
            properties.forEach((k, v) -> System.out.printf("%-15s : %s%n", k, v));
            System.out.println("----------------------------------");
            System.out.printf("%-5s | %-5s | %-6s | %s%n", "Spot", "Count", "Z-Score", "Status");
            System.out.println("----------------------------------");

            // Печатаем Топ-5 Горячих и Топ-3 Холодных
            spotStats.stream().limit(7).forEach(this::printRow);
            System.out.println("... (middle) ...");
            spotStats.stream().skip(spotStats.size() - 3).forEach(this::printRow);
        }

        private void printRow(SpotStat s) {
            System.out.printf("%-5d | %-5d | %-+6.2f | %s%n",
                    s.spot.getNumber(), s.count, s.zScore, s.getStatus());
        }
    }
}