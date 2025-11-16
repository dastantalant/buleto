package com.traderoom.strategy.predictor;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.RouletteType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.BetTypePrediction;
import com.traderoom.strategy.model.ColorPrediction;
import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.utils.BetHelper;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

public class ImprovedMarkovPredictor implements Predictor {

    private static final int MIN_HISTORY_SIZE = 2;

    private final Map<Spot, Map<Spot, Long>> spotTransitions;
    private final Map<BetType, Map<BetType, Long>> typeTransitions;

    public ImprovedMarkovPredictor() {
        spotTransitions = new ConcurrentHashMap<>();
        typeTransitions = new ConcurrentHashMap<>();
    }

    public void updateModel(Spot[] lastTransition, RouletteType rouletteType) {
        if (lastTransition == null || lastTransition.length < 2) {
            return;
        }
        Spot spot1 = lastTransition[0];
        Spot spot2 = lastTransition[1];

        spotTransitions.computeIfAbsent(spot1, k -> new ConcurrentHashMap<>())
                .merge(spot2, 1L, Long::sum);

        List<BetType> winningTypes1 = findWinningTypes(spot1, rouletteType);
        List<BetType> winningTypes2 = findWinningTypes(spot2, rouletteType);

        for (BetType type1 : winningTypes1) {
            Map<BetType, Long> nextStates = typeTransitions.computeIfAbsent(type1, k -> new ConcurrentHashMap<>());
            for (BetType type2 : winningTypes2) {
                nextStates.merge(type2, 1L, Long::sum);
            }
        }
    }

    @Override
    public List<BetTypePrediction> getNextBetTypePredictionList(Context context) {
        validateContext(context);
        if (context.getSpotHistory().size() < MIN_HISTORY_SIZE) {
            return List.of();
        }

        List<Spot> history = context.getSpotHistory();
        updateModel(new Spot[]{history.get(history.size() - 2), history.getLast()}, context.getRouletteType());

        List<BetType> lastWinningTypes = findWinningTypes(context.getLastSpot(), context.getRouletteType());

        Map<BetType, Long> nextTypeCounts = lastWinningTypes.stream()
                .flatMap(lastType -> {
                    Map<BetType, Long> transitions = typeTransitions.getOrDefault(lastType, Map.of());
                    return transitions.entrySet().stream();
                })
                .collect(Collectors.groupingBy(Map.Entry::getKey, Collectors.summingLong(Map.Entry::getValue)));

        if (nextTypeCounts.isEmpty()) {
            return List.of();
        }

        final double totalTransitions = nextTypeCounts.values().stream().mapToDouble(Long::doubleValue).sum();
        if (totalTransitions == 0) {
            return List.of();
        }

        return nextTypeCounts.entrySet().stream()
                .map(entry -> BetTypePrediction.builder()
                        .type(entry.getKey())
                        .probability(entry.getValue() / totalTransitions)
                        .build())
                .filter(p -> p.probability() > 0)
                .sorted((p1, p2) -> Double.compare(p2.probability(), p1.probability())) // Сортируем для удобства
                .toList();
    }

    @Override
    public List<SpotPrediction> getNextSpotPredictionList(Context context) {
        validateContext(context);
        if (context.getSpotHistory().size() < MIN_HISTORY_SIZE) {
            return List.of();
        }

        List<Spot> history = context.getSpotHistory();
        updateModel(new Spot[]{history.get(history.size() - 2), history.getLast()}, context.getRouletteType());

        Map<Spot, Long> nextSpotCounts = spotTransitions.getOrDefault(context.getLastSpot(), Map.of());

        if(nextSpotCounts.isEmpty()){
            return List.of();
        }

        final double totalTransitions = nextSpotCounts.values().stream().mapToDouble(Long::doubleValue).sum();
        if(totalTransitions == 0){
            return List.of();
        }

        return nextSpotCounts.entrySet().stream()
                .map(entry -> SpotPrediction.builder()
                        .spot(entry.getKey())
                        .probability(entry.getValue() / totalTransitions)
                        .build())
                .sorted((p1, p2) -> Double.compare(p2.probability(), p1.probability()))
                .toList();
    }


    @Override
    public ColorPrediction getNextColorPrediction(Context context) {
        List<SpotPrediction> spotPredictions = getNextSpotPredictionList(context);

        if (spotPredictions.isEmpty()) {
            return ColorPrediction.builder().red(0).black(0).green(0).build();
        }

        double redProb = spotPredictions.stream().filter(p -> p.spot().isRed()).mapToDouble(SpotPrediction::probability).sum();
        double blackProb = spotPredictions.stream().filter(p -> p.spot().isBlack()).mapToDouble(SpotPrediction::probability).sum();
        double greenProb = spotPredictions.stream().filter(p -> p.spot().isGreen()).mapToDouble(SpotPrediction::probability).sum();

        return ColorPrediction.builder()
                .red(redProb)
                .black(blackProb)
                .green(greenProb)
                .build();
    }

    private List<BetType> findWinningTypes(Spot spot, RouletteType rouletteType) {
        return BetType.getAvailableList(rouletteType).stream()
                .filter(type -> BetHelper.isWin(type, spot))
                .toList();
    }

    private void validateContext(Context context) {
        Objects.requireNonNull(context, "Context must not be null");
        Objects.requireNonNull(context.getSpotHistory(), "Spot history must not be null");
    }
}
