package com.traderoom.strategy.predictor;

import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.BetTypePrediction;
import com.traderoom.strategy.model.ColorPrediction;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.model.SpotPrediction;

import java.util.List;
import java.util.Random;

public class RandomPredictor implements Predictor {

    private final double probability;
    private final Random random;

    public RandomPredictor() {
        random = new Random();
        probability = 1.0;
    }

    @Override
    public List<SpotPrediction> getNextSpot(State state, Config config) {
        List<Spot> list = Spot.getAvailableList(config.rouletteType());
        if (list.isEmpty()) {
            return List.of();
        }

        return normalize(list.stream()
                .map(spot -> SpotPrediction.of(spot, random.nextDouble()))
                .toList());
    }

    @Override
    public List<BetTypePrediction> getNextType(State state, Config config) {
        List<BetType> list = BetType.getAvailableList(config.rouletteType());
        if (list.isEmpty()) {
            return List.of();
        }
        return normalizeBetType(list.stream()
                .map(betType -> BetTypePrediction.of(betType, random.nextDouble()))
                .toList());
    }

    @Override
    public ColorPrediction getNextColor(State state, Config config) {
        return ColorPrediction.of(probability / 3);
    }

    private List<SpotPrediction> normalize(List<SpotPrediction> predictions) {
        double sum = predictions.stream()
                .mapToDouble(SpotPrediction::probability)
                .sum();
        boolean bool = (sum <= 0 || Double.isNaN(sum) || Double.isInfinite(sum));
        double prob = probability / predictions.size();
        return predictions.stream()
                .map(item -> SpotPrediction.of(item.spot(), bool ? prob : item.probability() / sum))
                .toList();
    }

    private List<BetTypePrediction> normalizeBetType(List<BetTypePrediction> predictions) {
        double sum = predictions.stream()
                .mapToDouble(BetTypePrediction::probability)
                .sum();
        boolean bool = (sum <= 0 || Double.isNaN(sum) || Double.isInfinite(sum));
        double prob = probability / predictions.size();
        return predictions.stream()
                .map(item -> BetTypePrediction.of(item.type(), bool ? prob : item.probability() / sum))
                .toList();
    }
}