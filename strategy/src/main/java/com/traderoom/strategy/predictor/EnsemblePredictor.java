package com.traderoom.strategy.predictor;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.BetTypePrediction;
import com.traderoom.strategy.model.ColorPrediction;
import com.traderoom.strategy.model.SpotPrediction;

import java.util.Collections;
import java.util.EnumMap;
import java.util.List;
import java.util.Objects;

/**
 * Предиктор, который объединяет предсказания от нескольких других предикторов.
 * Может использовать усреднение или взвешенное усреднение.
 */
public class EnsemblePredictor implements Predictor {

    private final List<Predictor> predictors;

    public EnsemblePredictor(List<Predictor> predictors) {
        Objects.requireNonNull(predictors, "Список предикторов не может быть null");
        if (predictors.isEmpty()) {
            throw new IllegalArgumentException("Список предикторов не может быть пустым");
        }
        this.predictors = List.copyOf(predictors);
    }

    public static EnsemblePredictor createDefaultEnsemble() {
        List<Predictor> defaultPredictors = List.of(
                new EfficientCountPredictor(),
                new ImprovedMarkovPredictor(),
                new PatternPredictor()
        );
        return new EnsemblePredictor(defaultPredictors);
    }

    @Override
    public List<SpotPrediction> getNextSpotPredictionList(Context context) {
        EnumMap<Spot, Double> combinedProbabilities = new EnumMap<>(Spot.class);
        int activePredictors = 0;

        for (Predictor p : predictors) {
            List<SpotPrediction> predictions = p.getNextSpotPredictionList(context);
            if (!predictions.isEmpty()) {
                activePredictors++;
                predictions.forEach(sp -> combinedProbabilities.merge(sp.spot(), sp.probability(), Double::sum));
            }
        }

        if (activePredictors == 0 || combinedProbabilities.isEmpty()) {
            return Collections.emptyList();
        }

        final int finalActivePredictors = activePredictors;
        List<SpotPrediction> result = combinedProbabilities.entrySet().stream()
                .map(entry -> SpotPrediction.builder()
                        .spot(entry.getKey())
                        .probability(entry.getValue() / finalActivePredictors)
                        .build())
                .toList();

        double totalSum = result.stream().mapToDouble(SpotPrediction::probability).sum();
        if (totalSum > 0) {
            return result.stream()
                    .map(p -> SpotPrediction.builder().spot(p.spot()).probability(p.probability() / totalSum).build())
                    .toList();
        }
        return Collections.emptyList();
    }

    @Override
    public List<BetTypePrediction> getNextBetTypePredictionList(Context context) {
        EnumMap<BetType, Double> combinedProbabilities = new EnumMap<>(BetType.class);
        int activePredictors = 0;

        for (Predictor p : predictors) {
            List<BetTypePrediction> predictions = p.getNextBetTypePredictionList(context);
            if (!predictions.isEmpty()) {
                activePredictors++;
                predictions.forEach(btp -> combinedProbabilities.merge(btp.type(), btp.probability(), Double::sum));
            }
        }

        if (activePredictors == 0 || combinedProbabilities.isEmpty()) {
            return Collections.emptyList();
        }

        final int finalActivePredictors = activePredictors;
        List<BetTypePrediction> result = combinedProbabilities.entrySet().stream()
                .map(entry -> BetTypePrediction.builder()
                        .type(entry.getKey())
                        .probability(entry.getValue() / finalActivePredictors)
                        .build())
                .toList();

        double totalSum = result.stream().mapToDouble(BetTypePrediction::probability).sum();
        if (totalSum > 0) {
            return result.stream()
                    .map(p -> BetTypePrediction.builder().type(p.type()).probability(p.probability() / totalSum).build())
                    .toList();
        }
        return Collections.emptyList();
    }

    @Override
    public ColorPrediction getNextColorPrediction(Context context) {
        double red = 0, black = 0, green = 0;
        int activePredictors = 0;

        for (Predictor p : predictors) {
            ColorPrediction cp = p.getNextColorPrediction(context);
            if (cp != null && (cp.red() > 0 || cp.black() > 0 || cp.green() > 0)) {
                activePredictors++;
                red += cp.red();
                black += cp.black();
                green += cp.green();
            }
        }

        if (activePredictors == 0) {
            return ColorPrediction.builder().red(0).black(0).green(0).build();
        }

        return ColorPrediction.builder()
                .red(red / activePredictors)
                .black(black / activePredictors)
                .green(green / activePredictors)
                .build();
    }
}