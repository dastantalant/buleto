package com.traderoom.strategy.predictor;

import com.traderoom.api.enums.BetType;
import com.traderoom.api.enums.Constants;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.BetTypePrediction;
import com.traderoom.api.model.ColorPrediction;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.model.State;
import com.traderoom.api.model.SpotPrediction;
import com.traderoom.api.Predictor;

import java.util.List;

public class RandomPredictor implements Predictor {

    private final double probability;

    public RandomPredictor() {
        probability = 1.0;
    }

    @Override
    public List<SpotPrediction> predictSpot(State state, Config config) {
        List<Spot> list = Spot.getAvailableList(config.rouletteType());
        if (list.isEmpty()) {
            return List.of();
        }

        return normalize(list.stream()
                .map(spot -> SpotPrediction.of(spot, Constants.RANDOM.nextDouble()))
                .toList());
    }

    @Override
    public List<BetTypePrediction> predictType(State state, Config config) {
        List<BetType> list = BetType.getAvailableList(config.rouletteType());
        if (list.isEmpty()) {
            return List.of();
        }
        return normalizeBetType(list.stream()
                .map(betType -> BetTypePrediction.of(betType, Constants.RANDOM.nextDouble()))
                .toList());
    }

    @Override
    public ColorPrediction predictColor(State state, Config config) {
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