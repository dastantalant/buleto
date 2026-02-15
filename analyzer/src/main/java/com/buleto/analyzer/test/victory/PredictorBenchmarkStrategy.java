package com.buleto.analyzer.test.victory;

import com.trading.roulette.api.AbstractStrategy;
import com.trading.roulette.api.Predictor;
import com.trading.roulette.api.model.config.Config;
import com.trading.roulette.api.enums.Spot;
import com.trading.roulette.api.annotation.Tag;
import com.trading.roulette.api.annotation.Strategy;
import com.trading.roulette.api.model.Bet;
import com.trading.roulette.api.model.SpotPrediction;
import com.trading.roulette.strategy.predictor.EfficientCountPredictor;
import com.trading.roulette.strategy.predictor.MarkovPredictor2;
import com.trading.roulette.strategy.predictor.MultiOrderMarkovPredictor;
import com.trading.roulette.strategy.predictor.PatternPredictor;
import com.trading.roulette.strategy.predictor.SectorMomentumPredictor;

import java.util.*;

/**
 * Стратегия для тестирования и сравнения точности предикторов.
 * Не делает ставок (или делает фиктивные), но ведет детальную статистику
 * по каждому алгоритму.
 */
@Strategy(tags = {Tag.STATISTICAL, Tag.SPECIAL})
public class PredictorBenchmarkStrategy extends AbstractStrategy {

    private final List<Predictor> predictors;
    private final Map<String, PredictorStats> stats;

    // Храним предсказания, сделанные ПЕРЕД раундом, чтобы сверить их ПОСЛЕ
    private Map<String, List<SpotPrediction>> pendingPredictions;

    public PredictorBenchmarkStrategy(Config config) {
        super(config, "Benchmark");

        // Инициализируем список предикторов для теста
        this.predictors = new ArrayList<>();
        this.predictors.add(new MultiOrderMarkovPredictor());
        this.predictors.add(new EfficientCountPredictor());
        this.predictors.add(new PatternPredictor());
        this.predictors.add(new SectorMomentumPredictor());
        this.predictors.add(new MarkovPredictor2());
//        this.predictors.add(new DifferencePredictor());

        this.stats = new HashMap<>();
        this.pendingPredictions = new HashMap<>();

        for (Predictor p : predictors) {
            stats.put(p.getClass().getSimpleName(), new PredictorStats());
        }
    }

    @Override
    public List<Bet> decide() {
        // 1. Генерируем предсказания на текущий раунд
        pendingPredictions.clear();

        for (Predictor predictor : predictors) {
            List<SpotPrediction> predictions = predictor.predictSpot(getState(), getConfig());

            // Сортируем по вероятности (desc)
            List<SpotPrediction> sorted = predictions.stream()
                    .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
                    .toList();

            pendingPredictions.put(predictor.getClass().getSimpleName(), sorted);
        }

        // Возвращаем пустой список (мы только тестируем, не ставим)
        // Если движок требует ставку, можно вернуть 1 фишку на Red
        return Collections.emptyList();
    }

    @Override
    protected void onRoundCustom(Spot spot, List<Bet> bets) {
        if (pendingPredictions.isEmpty()) return;

        // 2. Сверяем предсказания с реальностью
        for (Map.Entry<String, List<SpotPrediction>> entry : pendingPredictions.entrySet()) {
            String name = entry.getKey();
            List<SpotPrediction> preds = entry.getValue();
            PredictorStats stat = stats.get(name);

            stat.processRound(spot, preds);
        }

        // 3. Вывод логов (например, каждые 50 спинов)
        if (getRoundNumber() > 0 && getRoundNumber() % 50 == 0) {
            printReport();
        }
    }

    private void printReport() {
        System.out.println("\n=== PREDICTOR BENCHMARK REPORT (Round " + getRoundNumber() + ") ===");
        System.out.printf("%-25s | %-8s | %-8s | %-8s | %-12s%n",
                "Predictor", "Rounds", "Top-1 %", "Top-5 %", "Avg Prob");
        System.out.println("-".repeat(75));

        stats.entrySet().stream()
                .sorted((e1, e2) -> Double.compare(e2.getValue().getProbabilityScore(), e1.getValue().getProbabilityScore()))
                .forEach(e -> {
                    System.out.printf("%-25s | %s%n", e.getKey(), e.getValue().toString());
                });
        System.out.println("=========================================================\n");
    }

    /**
     * Внутренний класс для подсчета статистики
     */
    private static class PredictorStats {
        private int totalRounds = 0;
        private int activeRounds = 0; // Раунды, где предиктор вернул хоть что-то
        private int hitsTop1 = 0;
        private int hitsTop3 = 0;
        private int hitsTop5 = 0;
        private double totalProbabilityAssignedToWinner = 0.0;

        public void processRound(Spot winner, List<SpotPrediction> predictions) {
            totalRounds++;
            if (predictions == null || predictions.isEmpty()) {
                return;
            }
            activeRounds++;

            // Находим позицию победителя в прогнозе
            int rank = -1;
            double prob = 0.0;

            for (int i = 0; i < predictions.size(); i++) {
                if (predictions.get(i).spot() == winner) {
                    rank = i;
                    prob = predictions.get(i).probability();
                    break;
                }
            }

            // Обновляем метрики
            if (rank == 0) hitsTop1++;
            if (rank != -1 && rank < 3) hitsTop3++;
            if (rank != -1 && rank < 5) hitsTop5++;

            totalProbabilityAssignedToWinner += prob;
        }

        public double getProbabilityScore() {
            return activeRounds == 0 ? 0.0 : totalProbabilityAssignedToWinner / activeRounds;
        }

        @Override
        public String toString() {
            if (activeRounds == 0) return String.format("%-8d | %-8s | %-8s | %-12s", totalRounds, "N/A", "N/A", "Cold Start");

            double p1 = (double) hitsTop1 / activeRounds * 100;
            double p5 = (double) hitsTop5 / activeRounds * 100;
            double avgProb = (totalProbabilityAssignedToWinner / activeRounds) * 100;

            return String.format("%-8d | %6.2f %% | %6.2f %% | %6.2f %%",
                    activeRounds, p1, p5, avgProb);
        }
    }
}