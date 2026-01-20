package com.traderoom.strategy.predictor;

import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.BetTypePrediction;
import com.traderoom.strategy.model.ColorPrediction;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.model.SpotPrediction;

import java.util.EnumMap;
import java.util.List;

public class EnsemblePredictor implements Predictor {

    private final List<Predictor> predictors;

    public EnsemblePredictor(List<Predictor> predictors) {
        this.predictors = List.copyOf(predictors);
    }

    public static EnsemblePredictor createDefaultEnsemble() {
        return new EnsemblePredictor(List.of(
                new EfficientCountPredictor(),
                new MultiOrderMarkovPredictor(),
                new PatternPredictor()
        ));
    }

    @Override
    public List<SpotPrediction> getNextSpot(State state, Config config) {
        EnumMap<Spot, Double> enumMap = new EnumMap<>(Spot.class);
        int active = 0;

        for (Predictor predictor : predictors) {
            List<SpotPrediction> predictions = predictor.getNextSpot(state, config);
            if (!predictions.isEmpty()) {
                active++;
                predictions.forEach(sp -> enumMap.merge(sp.spot(), sp.probability(), Double::sum));
            }
        }

        if (active == 0 || enumMap.isEmpty()) {
            return List.of();
        }

        final int fnActive = active;
        List<SpotPrediction> result = enumMap.entrySet()
                .stream()
                .map(entry -> SpotPrediction.of(entry.getKey(), entry.getValue() / fnActive))
                .toList();

        final double sum = result.stream()
                .mapToDouble(SpotPrediction::probability)
                .sum();
        return (sum > 0) ? result.stream()
                .map(item -> SpotPrediction.of(item.spot(), item.probability() / sum))
                .toList()
                : List.of();
    }

    @Override
    public List<BetTypePrediction> getNextType(State state, Config config) {
        EnumMap<BetType, Double> enumMap = new EnumMap<>(BetType.class);
        int active = 0;
        for (Predictor predictor : predictors) {
            List<BetTypePrediction> list = predictor.getNextType(state, config);
            if (!list.isEmpty()) {
                active++;
                list.forEach(btp -> enumMap.merge(btp.type(), btp.probability(), Double::sum));
            }
        }

        if (active == 0 || enumMap.isEmpty()) {
            return List.of();
        }

        final int fnActive = active;
        List<BetTypePrediction> result = enumMap.entrySet().stream()
                .map(entry -> BetTypePrediction.of(entry.getKey(), entry.getValue() / fnActive))
                .toList();

        final double sum = result.stream()
                .mapToDouble(BetTypePrediction::probability)
                .sum();
        return (0 < sum) ? result.stream()
                .map(item -> BetTypePrediction.of(item.type(), item.probability() / sum))
                .toList()
                : List.of();

    }

    @Override
    public ColorPrediction getNextColor(State state, Config config) {
        double red = 0L;
        double black = 0L;
        double green = 0L;
        int active = 0;

        for (Predictor predictor : predictors) {
            ColorPrediction color = predictor.getNextColor(state, config);
            if (color != null && (color.red() > 0 || color.black() > 0 || color.green() > 0)) {
                active++;
                red += color.red();
                black += color.black();
                green += color.green();
            }
        }

        if (active == 0) {
            return ColorPrediction.of();
        }

        return ColorPrediction.of(red / active, black / active, green / active);
    }
}