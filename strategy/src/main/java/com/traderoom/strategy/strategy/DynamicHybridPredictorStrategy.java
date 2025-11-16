package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.predictor.EfficientCountPredictor;
import com.traderoom.strategy.predictor.ImprovedMarkovPredictor;
import com.traderoom.strategy.predictor.Predictor;
import com.traderoom.strategy.predictor.RnnPredictor;
import com.traderoom.strategy.utils.BetHelper;
import org.deeplearning4j.nn.multilayer.MultiLayerNetwork;

import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Queue;
import java.util.stream.Collectors;

public class DynamicHybridPredictorStrategy extends BaseStrategy {

    private double dynamicMarkovWeight = 0.3;
    private double dynamicCountWeight = 0.2;
    private double dynamicRnnWeight = 0.5;

    private static final double CONFIDENCE_THRESHOLD = 0.08;
    private static final double ROUND_BUDGET_FRACTION = 0.05;
    private static final int MAX_BETS_PER_ROUND = 4;
    private static final int PERFORMANCE_WINDOW = 30;

    private final Predictor predictorMarkov;
    private final Predictor predictorCount;
    private final Predictor predictorRnn;

    private final Queue<Boolean> markovSuccess = new LinkedList<>();
    private final Queue<Boolean> countSuccess = new LinkedList<>();
    private final Queue<Boolean> rnnSuccess = new LinkedList<>();

    public DynamicHybridPredictorStrategy(Context context, Optional<MultiLayerNetwork> rnnModelOpt) {
        super(context);
        predictorMarkov = new ImprovedMarkovPredictor();
        predictorCount = new EfficientCountPredictor();

        predictorRnn = rnnModelOpt
                .map(net -> new RnnPredictor(net, context.getRouletteType()))
                .orElse(null);
    }

    @Override
    public String getName() {
        return DynamicHybridPredictorStrategy.class.getSimpleName();
    }

    @Override
    public void updateStrategyParameter(List<Bet> betList, Spot winningSpot, Context context) {
        super.updateStrategyParameter(betList, winningSpot, context);

        updatePredictorPerformance(context, winningSpot);
        adjustPredictorWeights();
    }

    private void updatePredictorPerformance(Context context, Spot winningSpot) {
        isPredictorCorrect(predictorMarkov, context, winningSpot, markovSuccess);
        isPredictorCorrect(predictorCount, context, winningSpot, countSuccess);
        if (predictorRnn != null) {
            isPredictorCorrect(predictorRnn, context, winningSpot, rnnSuccess);
        }
    }

    private void isPredictorCorrect(Predictor predictor, Context context, Spot winningSpot, Queue<Boolean> successQueue) {
        Optional<Spot> predictedSpot = predictor.getNextSpotPredictionList(context).stream()
                .max(Comparator.comparingDouble(SpotPrediction::probability))
                .map(SpotPrediction::spot);

        successQueue.add(predictedSpot.isPresent() && predictedSpot.get().equals(winningSpot));
        if (successQueue.size() > PERFORMANCE_WINDOW) {
            successQueue.poll();
        }
    }

    private void adjustPredictorWeights() {
        double markovWinRate = calculateWinRate(markovSuccess);
        double countWinRate = calculateWinRate(countSuccess);
        double rnnWinRate = predictorRnn != null ? calculateWinRate(rnnSuccess) : 0.0;

        double totalRate = markovWinRate + countWinRate + rnnWinRate;
        if (totalRate > 0) {
            dynamicMarkovWeight = markovWinRate / totalRate;
            dynamicCountWeight = countWinRate / totalRate;
            dynamicRnnWeight = rnnWinRate / totalRate;
        }
    }

    private double calculateWinRate(Queue<Boolean> successQueue) {
        if (successQueue.isEmpty()) return 0.0;
        return (double) Collections.frequency(successQueue, true) / successQueue.size();
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
                            return (markovProb * dynamicMarkovWeight) + (countProb * dynamicCountWeight) + (rnnProb * dynamicRnnWeight);
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

        long roundBudget = (long) (curBalance * ROUND_BUDGET_FRACTION);
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
//package com.traderoom.strategy.strategy;
//
//import com.traderoom.strategy.application.Context;
//import com.traderoom.strategy.enums.Spot;
//import com.traderoom.strategy.model.Bet;
//import com.traderoom.strategy.model.SpotPrediction;
//import com.traderoom.strategy.predictor.EfficientCountPredictor;
//import com.traderoom.strategy.predictor.ImprovedMarkovPredictor;
//import com.traderoom.strategy.predictor.Predictor;
//import com.traderoom.strategy.predictor.RnnPredictor;
//import com.traderoom.strategy.utils.BetHelper;
//import org.deeplearning4j.nn.multilayer.MultiLayerNetwork;
//
//import java.util.Collections;
//import java.util.Comparator;
//import java.util.LinkedList;
//import java.util.List;
//import java.util.Map;
//import java.util.Objects;
//import java.util.Optional;
//import java.util.Queue;
//import java.util.stream.Collectors;
//
//public class DynamicHybridPredictorStrategy extends BaseStrategy {
//
//    private double dynamicMarkovWeight = 0.3;
//    private double dynamicCountWeight = 0.2;
//    private double dynamicRnnWeight = 0.5;
//
//    private static final double CONFIDENCE_THRESHOLD = 0.08;
//    private static final double ROUND_BUDGET_FRACTION = 0.05;
//    private static final int MAX_BETS_PER_ROUND = 4;
//    private static final int PERFORMANCE_WINDOW = 30;
//
//    private final Predictor predictorMarkov;
//    private final Predictor predictorCount;
//    private final Predictor predictorRnn;
//
//    private final Queue<Boolean> markovSuccess = new LinkedList<>();
//    private final Queue<Boolean> countSuccess = new LinkedList<>();
//    private final Queue<Boolean> rnnSuccess = new LinkedList<>();
//
//    public DynamicHybridPredictorStrategy(Context context, Optional<MultiLayerNetwork> rnnModelOpt) {
//        super(context);
//        predictorMarkov = new ImprovedMarkovPredictor();
//        predictorCount = new EfficientCountPredictor();
//
//        predictorRnn = rnnModelOpt
//                .map(net -> new RnnPredictor(net, context.getRouletteType()))
//                .orElse(null);
//    }
//
//    @Override
//    public String getName() {
//        return DynamicHybridPredictorStrategy.class.getSimpleName();
//    }
//
//    @Override
//    public void updateStrategyParameter(List<Bet> betList, Spot winningSpot, Context context) {
//        super.updateStrategyParameter(betList, winningSpot, context);
//
//        updatePredictorPerformance(context, winningSpot);
//        adjustPredictorWeights();
//    }
//
//    private void updatePredictorPerformance(Context context, Spot winningSpot) {
//        isPredictorCorrect(predictorMarkov, context, winningSpot, markovSuccess);
//        isPredictorCorrect(predictorCount, context, winningSpot, countSuccess);
//        if (predictorRnn != null) {
//            isPredictorCorrect(predictorRnn, context, winningSpot, rnnSuccess);
//        }
//    }
//
//    private void isPredictorCorrect(Predictor predictor, Context context, Spot winningSpot, Queue<Boolean> successQueue) {
//        Optional<Spot> predictedSpot = predictor.getNextSpotPredictionList(context).stream()
//                .max(Comparator.comparingDouble(SpotPrediction::probability))
//                .map(SpotPrediction::spot);
//
//        successQueue.add(predictedSpot.isPresent() && predictedSpot.get().equals(winningSpot));
//        if (successQueue.size() > PERFORMANCE_WINDOW) {
//            successQueue.poll();
//        }
//    }
//
//    private void adjustPredictorWeights() {
//        double markovWinRate = calculateWinRate(markovSuccess);
//        double countWinRate = calculateWinRate(countSuccess);
//        double rnnWinRate = predictorRnn != null ? calculateWinRate(rnnSuccess) : 0.0;
//
//        double totalRate = markovWinRate + countWinRate + rnnWinRate;
//        if (totalRate > 0) {
//            dynamicMarkovWeight = markovWinRate / totalRate;
//            dynamicCountWeight = countWinRate / totalRate;
//            dynamicRnnWeight = rnnWinRate / totalRate;
//        }
//    }
//
//    private double calculateWinRate(Queue<Boolean> successQueue) {
//        if (successQueue.isEmpty()) return 0.0;
//        return (double) Collections.frequency(successQueue, true) / successQueue.size();
//    }
//
//    @Override
//    protected List<Bet> getNextInternal(Context context) {
//        Map<Spot, Double> markovPredictions = predictorMarkov.getNextSpotPredictionList(context).stream()
//                .collect(Collectors.toMap(SpotPrediction::spot, SpotPrediction::probability));
//
//        Map<Spot, Double> countPredictions = predictorCount.getNextSpotPredictionList(context).stream()
//                .collect(Collectors.toMap(SpotPrediction::spot, SpotPrediction::probability));
//        Map<Spot, Double> rnnPredictions = (predictorRnn != null)
//                ? predictorRnn.getNextSpotPredictionList(context).stream()
//                .collect(Collectors.toMap(SpotPrediction::spot, SpotPrediction::probability))
//                : Collections.emptyMap();
//
//        List<Spot> availableSpots = Spot.getAvailableList(context.getRouletteType());
//        Map<Spot, Double> hybridScores = availableSpots.stream()
//                .collect(Collectors.toMap(
//                        spot -> spot,
//                        spot -> {
//                            double markovProb = markovPredictions.getOrDefault(spot, 0.0);
//                            double countProb = countPredictions.getOrDefault(spot, 0.0);
//                            double rnnProb = rnnPredictions.getOrDefault(spot, 0.0);
//                            // Изменение: Используем динамические веса
//                            return (markovProb * dynamicMarkovWeight) + (countProb * dynamicCountWeight) + (rnnProb * dynamicRnnWeight);
//                        }
//                ));
//
//        List<SpotPrediction> topCandidates = hybridScores.entrySet().stream()
//                .map(entry -> SpotPrediction.builder().spot(entry.getKey()).probability(entry.getValue()).build())
//                .filter(p -> p.probability() >= CONFIDENCE_THRESHOLD)
//                .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
//                .limit(MAX_BETS_PER_ROUND)
//                .toList();
//
//        if (topCandidates.isEmpty()) {
//            return List.of();
//        }
//
//        long roundBudget = (long) (curBalance * ROUND_BUDGET_FRACTION);
//        if (roundBudget < context.getMin()) {
//            return List.of();
//        }
//
//        double totalScoreOfTopBets = topCandidates.stream().mapToDouble(SpotPrediction::probability).sum();
//        if (totalScoreOfTopBets == 0) {
//            return List.of();
//        }
//
//        return topCandidates.stream()
//                .map(prediction -> {
//                    long betValue = (long) (roundBudget * (prediction.probability() / totalScoreOfTopBets));
//                    long clampedValue = Math.max(context.getMin(), betValue);
//                    clampedValue = Math.min(clampedValue, context.getMax());
//                    if (clampedValue > curBalance) return null;
//                    return Bet.builder()
//                            .type(BetHelper.getStraightUpBetType(prediction.spot()))
//                            .value(clampedValue)
//                            .build();
//                })
//                .filter(Objects::nonNull)
//                .toList();
//    }
//}