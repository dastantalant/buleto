package com.traderoom.strategy.predictor;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.BetTypePrediction;
import com.traderoom.strategy.model.ColorPrediction;
import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.utils.BetHelper;
import com.traderoom.strategy.utils.LogHelper;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;

public class MarkovPredictor implements Predictor {

    private static final int MIN_HISTORY_SIZE = 2;
    private static final double DEFAULT_PROBABILITY = 0.0;

    private final Map<Spot, Map<Spot, Long>> spotMap;
    private final Map<BetType, Map<BetType, Long>> typeMap;
    private long transitionCount;

    public MarkovPredictor() {
        spotMap = new ConcurrentHashMap<>();
        typeMap = new ConcurrentHashMap<>();
        transitionCount = 0;
    }

    @Override
    public List<SpotPrediction> getNextSpotPredictionList(Context context) {
        validateContext(context);
        if (context.getSpotHistory().size() < MIN_HISTORY_SIZE) {
            return Collections.emptyList();
        }

        updateParameters(context);
        Map<Spot, Long> transitions = spotMap.getOrDefault(context.getLastSpot(), Collections.emptyMap());

        List<Spot> availableSpots = Spot.getAvailableList(context.getRouletteType());
        if (availableSpots.isEmpty()) {
            return Collections.emptyList();
        }

        List<SpotPrediction> predictions = new ArrayList<>();
        for (Spot spot : availableSpots) {
            double probability = calculateProbability(transitions.getOrDefault(spot, 0L));
            if (probability > 0) {
                predictions.add(SpotPrediction.builder()
                        .spot(spot)
                        .probability(probability)
                        .build());
            }
        }
        return Collections.unmodifiableList(predictions);
    }

    @Override
    public List<BetTypePrediction> getNextBetTypePredictionList(Context context) {
        validateContext(context);
        if (context.getSpotHistory().size() < MIN_HISTORY_SIZE) {
            return Collections.emptyList();
        }

        updateParameters(context);
        List<BetType> lastSpotBetTypes = new ArrayList<>();
        for (BetType type : BetType.getAvailableList(context.getRouletteType())) {
            if (BetHelper.isWin(type, context.getLastSpot())) {
                lastSpotBetTypes.add(type);
            }
        }

        List<BetType> availableTypes = BetType.getAvailableList(context.getRouletteType());
        if (availableTypes.isEmpty()) {
            return Collections.emptyList();
        }

        List<BetTypePrediction> predictions = new ArrayList<>();
        for (BetType lastType : lastSpotBetTypes) {
            Map<BetType, Long> transitions = typeMap.getOrDefault(lastType, Collections.emptyMap());
            for (BetType nextType : availableTypes) {
                double probability = calculateProbability(transitions.getOrDefault(nextType, 0L));
                if (probability > 0) {
                    predictions.add(BetTypePrediction.builder()
                            .type(nextType)
                            .probability(probability)
                            .build());
                }
            }
        }
        return Collections.unmodifiableList(predictions);
    }

    @Override
    public ColorPrediction getNextColorPrediction(Context context) {
        validateContext(context);
        if (context.getSpotHistory().size() < MIN_HISTORY_SIZE) {
            return ColorPrediction.builder()
                    .red(DEFAULT_PROBABILITY)
                    .black(DEFAULT_PROBABILITY)
                    .green(DEFAULT_PROBABILITY)
                    .build();
        }

        Map<Spot, Long> transitions = spotMap.getOrDefault(context.getLastSpot(), Collections.emptyMap());

        double redCount = 0, blackCount = 0, greenCount = 0;
        for (Map.Entry<Spot, Long> entry : transitions.entrySet()) {
            Spot spot = entry.getKey();
            long count = entry.getValue();
            if (spot.isRed()) {
                redCount += count;
            } else if (spot.isBlack()) {
                blackCount += count;
            } else if (spot.isGreen()) {
                greenCount += count;
            }
        }

        double total = redCount + blackCount + greenCount;
        return ColorPrediction.builder()
                .red(total == 0 ? DEFAULT_PROBABILITY : redCount / total)
                .black(total == 0 ? DEFAULT_PROBABILITY : blackCount / total)
                .green(total == 0 ? DEFAULT_PROBABILITY : greenCount / total)
                .build();
    }

    private void updateParameters(Context context) {
        if (context.getSpotHistory().size() < MIN_HISTORY_SIZE) {
            return;
        }

        List<Spot> history = context.getSpotHistory();
        Spot spot1 = history.get(history.size() - 2);
        Spot spot2 = context.getLastSpot();

        spotMap.computeIfAbsent(spot1, k -> new ConcurrentHashMap<>())
                .merge(spot2, 1L, Long::sum);

        List<BetType> betTypeList1 = new ArrayList<>();
        List<BetType> betTypeList2 = new ArrayList<>();
        for (BetType type : BetType.getAvailableList(context.getRouletteType())) {
            if (BetHelper.isWin(type, spot1)) {
                betTypeList1.add(type);
            }
            if (BetHelper.isWin(type, spot2)) {
                betTypeList2.add(type);
            }
        }

        for (BetType betType1 : betTypeList1) {
            Map<BetType, Long> transitions = typeMap.computeIfAbsent(betType1, k -> new ConcurrentHashMap<>());
            for (BetType betType2 : betTypeList2) {
                transitions.merge(betType2, 1L, Long::sum);
            }
        }
        transitionCount++;
    }

    private void validateContext(Context context) {
        Objects.requireNonNull(context, "Context не должен быть null");
        Objects.requireNonNull(context.getSpotHistory(), "Spot history не должен быть null");
        Objects.requireNonNull(context.getRouletteType(), "Roulette type не должен быть null");
    }

    private double calculateProbability(long occurrences) {
        return transitionCount == 0 ? DEFAULT_PROBABILITY : (double) occurrences / transitionCount;
    }

    private void dumpMarkovMap() {
        LogHelper.debug("--- spotMarkovMap start ---");
        for (Map.Entry<Spot, Map<Spot, Long>> entry1 : spotMap.entrySet()) {
            for (Map.Entry<Spot, Long> entry2 : entry1.getValue().entrySet()) {
                LogHelper.debug(entry1.getKey().name() + "-" + entry2.getKey().name() + ": " + entry2.getValue());
            }
        }
        LogHelper.debug("--- spotMarkovMap end ---");

        LogHelper.debug("--- typeMarkovMap start ---");
        for (Map.Entry<BetType, Map<BetType, Long>> entry1 : typeMap.entrySet()) {
            for (Map.Entry<BetType, Long> entry2 : entry1.getValue().entrySet()) {
                LogHelper.debug(entry1.getKey().name() + "-" + entry2.getKey().name() + ": " + entry2.getValue());
            }
        }
        LogHelper.debug("--- typeMarkovMap end ---");
    }

    public void reset() {
        spotMap.clear();
        typeMap.clear();
        transitionCount = 0;
    }
}