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
 * Гибридная стратегия, использующая ансамбль из нескольких предикторов.
 * 1. Собирает прогнозы от разных моделей (Марковская цепь, Частотный анализ).
 * 2. Вычисляет взвешенную "гибридную уверенность" для каждого номера.
 * 3. Динамически выделяет бюджет на раунд в % от текущего баланса.
 * 4. Размер ставки на номер пропорционален гибридной уверенности.
 * 5. Адаптируется к проигрышным сериям, переходя в "осторожный режим".
 */
public class HybridPredictorStrategy extends BaseStrategy {

    private static final double MARKOV_WEIGHT = 0.3;
    private static final double COUNT_WEIGHT = 0.2;
    private static final double RNN_WEIGHT = 0.5;
    private static final double CONFIDENCE_THRESHOLD = 0.08;

    private static final double ROUND_BUDGET_FRACTION = 0.05;

    private static final int MAX_BETS_PER_ROUND = 4;

    private static final int CONSECUTIVE_LOSS_STREAK_FOR_CAUTION = 3;

    private static final double CAUTIOUS_BUDGET_FRACTION = 0.025;

    private int consecutiveLosses = 0;

    private final Predictor predictorMarkov;
    private final Predictor predictorCount;
    private final Predictor predictorRnn;

    public HybridPredictorStrategy(Context context, Optional<MultiLayerNetwork> rnnModelOpt) {
        super(context);
        predictorMarkov = new ImprovedMarkovPredictor();
        predictorCount = new EfficientCountPredictor();

        predictorRnn = rnnModelOpt
                .map(net -> new RnnPredictor(net, context.getRouletteType()))
                .orElse(null);
    }

    @Override
    public String getName() {
        return HybridPredictorStrategy.class.getSimpleName();
    }

    @Override
    public void updateStrategyParameter(List<Bet> betList, Spot spot, Context context) {
        super.updateStrategyParameter(betList, spot, context);
        if (hasLastBet()) {
            if (wasLastBetWon(context)) {
                consecutiveLosses = 0;
            } else {
                consecutiveLosses++;
            }
        }
    }

    @Override
    protected List<Bet> getNextInternal(Context context) {
        Map<Spot, Double> markovPredictions = predictorMarkov.getNextSpotPredictionList(context).stream()
                .collect(Collectors.toMap(SpotPrediction::spot, SpotPrediction::probability));

        Map<Spot, Double> countPredictions = predictorCount.getNextSpotPredictionList(context).stream()
                .collect(Collectors.toMap(SpotPrediction::spot, SpotPrediction::probability));
        Map<Spot, Double> rnnPredictions = (predictorRnn != null)
                ? predictorRnn.getNextSpotPredictionList(context).stream()
                .collect(Collectors.toMap(SpotPrediction::spot, SpotPrediction::probability))
                : Collections.emptyMap();
        List<Spot> availableSpots = Spot.getAvailableList(context.getRouletteType());
        Map<Spot, Double> hybridScores = availableSpots.stream()
                .collect(Collectors.toMap(
                        spot -> spot,
                        spot -> {
                            double markovProb = markovPredictions.getOrDefault(spot, 0.0);
                            double countProb = countPredictions.getOrDefault(spot, 0.0);
                            double rnnProb = rnnPredictions.getOrDefault(spot, 0.0);
                            return (markovProb * MARKOV_WEIGHT) + (countProb * COUNT_WEIGHT) + (rnnProb * RNN_WEIGHT);
                        }
                ));

        List<SpotPrediction> topCandidates = hybridScores.entrySet().stream()
                .map(entry -> SpotPrediction.builder().spot(entry.getKey()).probability(entry.getValue()).build())
                .filter(p -> p.probability() >= CONFIDENCE_THRESHOLD)
                .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
                .limit(MAX_BETS_PER_ROUND)
                .toList();

        if (topCandidates.isEmpty()) {
            return List.of();
        }

        double currentBudgetFraction = (consecutiveLosses >= CONSECUTIVE_LOSS_STREAK_FOR_CAUTION)
                ? CAUTIOUS_BUDGET_FRACTION
                : ROUND_BUDGET_FRACTION;

        long roundBudget = (long) (curBalance * currentBudgetFraction);
        if (roundBudget < context.getMin()) {
            return List.of();
        }

        double totalScoreOfTopBets = topCandidates.stream().mapToDouble(SpotPrediction::probability).sum();
        if (totalScoreOfTopBets == 0) {
            return List.of();
        }

        return topCandidates.stream()
                .map(prediction -> {
                    long betValue = (long) (roundBudget * (prediction.probability() / totalScoreOfTopBets));
                    long clampedValue = Math.max(context.getMin(), betValue);
                    clampedValue = Math.min(clampedValue, context.getMax());
                    if (clampedValue > curBalance) return null;
                    return Bet.builder()
                            .type(BetHelper.getStraightUpBetType(prediction.spot()))
                            .value(clampedValue)
                            .build();
                })
                .filter(Objects::nonNull)
                .toList();
    }
}