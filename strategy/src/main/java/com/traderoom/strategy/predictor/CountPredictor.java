package com.traderoom.strategy.predictor;

import com.traderoom.api.enums.BetType;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.*;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.Predictor;
import com.traderoom.api.utils.BetHelper;
import com.traderoom.api.utils.HistoryUtil;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;

public class CountPredictor implements Predictor {
    private final int windowSize;

    public CountPredictor() {
        this(200);
    }

    public CountPredictor(int windowSize) {
        this.windowSize = windowSize;
    }

    @Override
    public List<SpotPrediction> predictSpot(State state, Config config) {
        List<Spot> window = HistoryUtil.window(state, windowSize);
        double total = window.size();
        if (total == 0) return List.of();

        Map<Spot, Integer> counts = new EnumMap<>(Spot.class);
        for (Spot spot : window) {
            counts.merge(spot, 1, Integer::sum);
        }

        return Spot.getAvailableList(config.rouletteType())
                .stream()
                .map(spot -> SpotPrediction.of(spot, counts.getOrDefault(spot, 0) / total))
                .toList();
    }

    @Override
    public List<BetTypePrediction> predictType(State state, Config config) {
        List<Spot> window = HistoryUtil.window(state, windowSize);
        double total = window.size();
        if (total == 0) return List.of();

        Map<BetType, Integer> counts = new EnumMap<>(BetType.class);
        List<BetType> availableTypes = BetType.getAvailableList(config.rouletteType());

        for (Spot spot : window) {
            for (BetType type : availableTypes) {
                if (BetHelper.isWin(type, spot)) {
                    counts.merge(type, 1, Integer::sum);
                }
            }
        }

        return availableTypes.stream()
                .map(type -> BetTypePrediction.of(type, counts.getOrDefault(type, 0) / total))
                .toList();
    }

    @Override
    public ColorPrediction predictColor(State state, Config config) {
        List<Spot> window = HistoryUtil.window(state, windowSize);
        double total = window.size();
        if (total == 0) return ColorPrediction.of();

        double red = 0, black = 0, green = 0;
        for (Spot spot : window) {
            if (spot.isRed()) red++;
            else if (spot.isBlack()) black++;
            else if (spot.isGreen()) green++;
        }

        return ColorPrediction.of(red / total, black / total, green / total);
    }
}