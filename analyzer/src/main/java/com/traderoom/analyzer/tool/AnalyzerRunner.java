package com.traderoom.analyzer.tool;

import java.util.Deque;
import java.util.LinkedList;
import java.util.List;

import static com.traderoom.analyzer.BuletoConstants.DEQUE; // Ваш источник данных

public class AnalyzerRunner {

    public static void main(String[] args) {
        // 1. Загружаем данные
        Deque<Integer> rawData = new LinkedList<>(DEQUE);

        // Для анализа ГСЧ лучше брать последние 120-200 спинов.
        // Если взять 10000, всё усреднится и аномалий не будет видно.
        int analyzeWindow = 120;

        List<Integer> window = new LinkedList<>();
        // Берем последние N чисел из истории (или первые, как вам удобнее для теста)
        // Здесь берем первые 200 для примера
        for (int i = 0; i < analyzeWindow && !rawData.isEmpty(); i++) {
            window.add(rawData.poll());
        }

        // 2. Запускаем Анализатор
        RouletteSequenceAnalyzer analyzer = new RouletteSequenceAnalyzer(window);
        RouletteSequenceAnalyzer.AnalysisReport report = analyzer.analyze();

        // 3. Выводим результат
        report.print();

        // 4. Получаем прогноз для стратегии
        System.out.println("\n>>> PREDICTED TARGETS (Statistical):");
        var predictions = report.getPredictiveSuggestions(5);
        predictions.forEach(p -> System.out.println("Bet on: " + p.spot() + " (Strength: " + String.format("%.3f", p.probability()) + ")"));
    }
}