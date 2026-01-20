package com.traderoom.strategy.predictor;

import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.BetTypePrediction;
import com.traderoom.strategy.model.ColorPrediction;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.utils.BetHelper;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class MarkovPredictor implements Predictor {

    private final int min;
    private final double probability;
    private final Map<Spot, Map<Spot, Long>> spotMap;
    private final Map<BetType, Map<BetType, Long>> typeMap;
    private long transitionCount;

    public MarkovPredictor() {
        spotMap = new ConcurrentHashMap<>();
        typeMap = new ConcurrentHashMap<>();
        min = 2;
        probability = 0.0;
        transitionCount = 0;
    }

    @Override
    public List<SpotPrediction> getNextSpot(State state, Config config) {
        if (state.getMarketData().getHistory().size() < min) {
            return List.of();
        }
        updateParameters(state, config);
        Map<Spot, Long> transitions = spotMap.getOrDefault(state.getMarketData().getLastSpot(), Collections.emptyMap());

        List<Spot> list = Spot.getAvailableList(config.rouletteType());
        if (list.isEmpty()) {
            return List.of();
        }

        List<SpotPrediction> predictions = new ArrayList<>(list.size());
        for (Spot spot : list) {
            double prob = calculate(transitions.getOrDefault(spot, 0L));
            if (prob > 0) {
                predictions.add(SpotPrediction.of(spot, prob));
            }
        }
        return List.copyOf(predictions);
    }

    @Override
    public List<BetTypePrediction> getNextType(State state, Config config) {
        if (state.getMarketData().getHistory().size() < min) {
            return List.of();
        }
        updateParameters(state, config);
        List<BetType> types = BetType.getAvailableList(config.rouletteType());
        List<BetType> lasts = new ArrayList<>();
        for (BetType type : types) {
            if (BetHelper.isWin(type, state.getMarketData().getLastSpot())) {
                lasts.add(type);
            }
        }

        if (types.isEmpty()) {
            return List.of();
        }

        List<BetTypePrediction> predictions = new ArrayList<>();
        for (BetType lastType : lasts) {
            Map<BetType, Long> transitions = typeMap.getOrDefault(lastType, Collections.emptyMap());
            for (BetType nextType : types) {
                double prob = calculate(transitions.getOrDefault(nextType, 0L));
                if (prob > 0) {
                    predictions.add(BetTypePrediction.of(nextType, prob));
                }
            }
        }
        return List.copyOf(predictions);
    }

    @Override
    public ColorPrediction getNextColor(State state, Config config) {
        if (state.getMarketData().getHistory().size() < min) {
            return ColorPrediction.of(probability, probability, probability);
        }

        Map<Spot, Long> transitions = spotMap.getOrDefault(state.getMarketData().getLastSpot(), Collections.emptyMap());

        double red = 0;
        double black = 0;
        double green = 0;
        for (Map.Entry<Spot, Long> entry : transitions.entrySet()) {
            Spot spot = entry.getKey();
            long count = entry.getValue();
            if (spot.isRed()) {
                red += count;
            } else if (spot.isBlack()) {
                black += count;
            } else if (spot.isGreen()) {
                green += count;
            }
        }

        double total = red + black + green;
        return ColorPrediction.of(total == 0 ? probability : red / total,
                total == 0 ? probability : black / total,
                total == 0 ? probability : green / total);
    }

    private void updateParameters(State state, Config config) {
        if (state.getMarketData().getHistory().size() < min) {
            return;
        }

        List<Spot> history = state.getMarketData().getHistory();
        Spot spot1 = history.get(history.size() - 2);
        Spot spot2 = state.getMarketData().getLastSpot();

        spotMap.computeIfAbsent(spot1, _ -> new ConcurrentHashMap<>())
                .merge(spot2, 1L, Long::sum);

        List<BetType> list1 = new ArrayList<>();
        List<BetType> list2 = new ArrayList<>();
        for (BetType type : BetType.getAvailableList(config.rouletteType())) {
            if (BetHelper.isWin(type, spot1)) {
                list1.add(type);
            }
            if (BetHelper.isWin(type, spot2)) {
                list2.add(type);
            }
        }

        for (BetType type1 : list1) {
            Map<BetType, Long> transitions = typeMap.computeIfAbsent(type1, _ -> new ConcurrentHashMap<>());
            for (BetType type2 : list2) {
                transitions.merge(type2, 1L, Long::sum);
            }
        }
        transitionCount++;
    }

    private double calculate(long occurrences) {
        return transitionCount == 0 ? probability : (double) occurrences / transitionCount;
    }

    public void reset() {
        spotMap.clear();
        typeMap.clear();
        transitionCount = 0;
    }
}