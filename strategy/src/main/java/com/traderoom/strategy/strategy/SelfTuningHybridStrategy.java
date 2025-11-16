package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.predictor.EfficientCountPredictor;
import com.traderoom.strategy.predictor.ImprovedMarkovPredictor;
import com.traderoom.strategy.predictor.Predictor;
import com.traderoom.strategy.predictor.RnnPredictor;
import com.traderoom.strategy.utils.BetHelper;
import org.deeplearning4j.nn.multilayer.MultiLayerNetwork;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Улучшенная самообучающаяся гибридная стратегия, которая включает RnnPredictor
 * в свой ансамбль "экспертов".
 */
public class SelfTuningHybridStrategy extends BaseStrategy {
    private static final double MARKOV_WEIGHT = 0.3;
    private static final double COUNT_WEIGHT = 0.2;
    private static final double RNN_WEIGHT = 0.5;

    private double dynamicConfidenceThreshold;
    private double dynamicBudgetFraction;

    private static final int ADAPTATION_WINDOW = 50;
    private static final double LOW_WIN_RATE_THRESHOLD = 0.45;
    private static final double HIGH_WIN_RATE_THRESHOLD = 0.60;

    private static final double BASE_CONFIDENCE_THRESHOLD = 0.08;
    private static final double BASE_BUDGET_FRACTION = 0.05;

    private final Predictor predictorMarkov;
    private final Predictor predictorCount;
    private final Predictor predictorRnn;
    public SelfTuningHybridStrategy(Context context, Optional<MultiLayerNetwork> rnnModelOpt) {
        super(context);
        this.predictorMarkov = new ImprovedMarkovPredictor();
        this.predictorCount = new EfficientCountPredictor();
        this.predictorRnn = rnnModelOpt
                .map(net -> new RnnPredictor(net, context.getRouletteType()))
                .orElse(null);

        this.dynamicConfidenceThreshold = BASE_CONFIDENCE_THRESHOLD;
        this.dynamicBudgetFraction = BASE_BUDGET_FRACTION;
    }
    @Override
    public String getName() {
        return SelfTuningHybridStrategy.class.getName();
    }

    @Override
    protected List<Bet> getNextInternal(Context context) {
        if (context.getCurrentLoopCount() > 0 && context.getCurrentLoopCount() % ADAPTATION_WINDOW == 0 && bet > 0) {
            adjustParameters();
        }

        Map<Spot, Double> markovPredictions = predictorMarkov.getNextSpotPredictionList(context).stream()
                .collect(Collectors.toMap(SpotPrediction::spot, SpotPrediction::probability));
        Map<Spot, Double> countPredictions = predictorCount.getNextSpotPredictionList(context).stream()
                .collect(Collectors.toMap(SpotPrediction::spot, SpotPrediction::probability));

        Map<Spot, Double> rnnPredictions = (predictorRnn != null)
                ? predictorRnn.getNextSpotPredictionList(context).stream().collect(Collectors.toMap(SpotPrediction::spot, SpotPrediction::probability))
                : Collections.emptyMap();

        Map<Spot, Double> hybridScores = Spot.getAvailableList(context.getRouletteType()).stream()
                .collect(Collectors.toMap(
                        spot -> spot,
                        spot -> {
                            double markovProb = markovPredictions.getOrDefault(spot, 0.0);
                            double countProb = countPredictions.getOrDefault(spot, 0.0);
                            double rnnProb = rnnPredictions.getOrDefault(spot, 0.0);

                            if (predictorRnn != null) {
                                return (markovProb * MARKOV_WEIGHT) + (countProb * COUNT_WEIGHT) + (rnnProb * RNN_WEIGHT);
                            } else {
                                return (markovProb * 0.6) + (countProb * 0.4);
                            }
                        }
                ));

        List<SpotPrediction> topCandidates = hybridScores.entrySet().stream()
                .map(entry -> SpotPrediction.builder().spot(entry.getKey()).probability(entry.getValue()).build())
                .filter(p -> p.probability() >= dynamicConfidenceThreshold)
                .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
                .limit(4)
                .toList();

        if (topCandidates.isEmpty()) return List.of();

        long roundBudget = (long) (curBalance * dynamicBudgetFraction);
        if (roundBudget < context.getMin()) return List.of();

        double totalScore = topCandidates.stream().mapToDouble(SpotPrediction::probability).sum();
        if (totalScore == 0) return List.of();

        return topCandidates.stream()
                .map(p -> {
                    long betValue = (long) (roundBudget * (p.probability() / totalScore));
                    long clampedValue = Math.max(context.getMin(), Math.min(betValue, context.getMax()));
                    if (clampedValue > curBalance) return null;
                    return Bet.builder().type(BetHelper.getStraightUpBetType(p.spot())).value(clampedValue).build();
                })
                .filter(Objects::nonNull)
                .toList();
    }

    private void adjustParameters() {
        double currentWinRate = getWinningAverage();
        if (currentWinRate < LOW_WIN_RATE_THRESHOLD) {
            dynamicConfidenceThreshold = Math.min(BASE_CONFIDENCE_THRESHOLD * 1.25, 0.15);
            dynamicBudgetFraction = Math.max(BASE_BUDGET_FRACTION * 0.5, 0.01);
        } else if (currentWinRate > HIGH_WIN_RATE_THRESHOLD) {
            dynamicConfidenceThreshold = Math.max(BASE_CONFIDENCE_THRESHOLD * 0.9, 0.05);
            dynamicBudgetFraction = Math.min(BASE_BUDGET_FRACTION * 1.1, 0.075);
        } else {
            if (dynamicConfidenceThreshold != BASE_CONFIDENCE_THRESHOLD || dynamicBudgetFraction != BASE_BUDGET_FRACTION) {
                dynamicConfidenceThreshold = BASE_CONFIDENCE_THRESHOLD;
                dynamicBudgetFraction = BASE_BUDGET_FRACTION;
            }
        }
        this.won = 0;
        this.lost = 0;
        this.bet = 0;
    }
}