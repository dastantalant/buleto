package com.traderoom.strategy.predictor;

import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.RouletteType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.BetTypePrediction;
import com.traderoom.strategy.model.ColorPrediction;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.utils.BetHelper;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

public class ImprovedMarkovPredictor implements Predictor {

    private final int size;
    private final Map<Spot, Map<Spot, Long>> spots;
    private final Map<BetType, Map<BetType, Long>> types;

    public ImprovedMarkovPredictor() {
        spots = new ConcurrentHashMap<>();
        types = new ConcurrentHashMap<>();
        size = 2;
    }

    public void updateModel(Spot[] lasts, RouletteType type) {
        if (lasts == null || lasts.length < 2) {
            return;
        }
        Spot spot1 = lasts[0];
        Spot spot2 = lasts[1];

        spots.computeIfAbsent(spot1, k -> new ConcurrentHashMap<>())
                .merge(spot2, 1L, Long::sum);

        List<BetType> types1 = findTypes(spot1, type);
        List<BetType> types2 = findTypes(spot2, type);

        for (BetType type1 : types1) {
            Map<BetType, Long> map = types.computeIfAbsent(type1, _ -> new ConcurrentHashMap<>());
            for (BetType type2 : types2) {
                map.merge(type2, 1L, Long::sum);
            }
        }
    }

    @Override
    public List<BetTypePrediction> getNextType(State state, Config config) {
        if (state.getMarketData().getHistory().size() < size) {
            return List.of();
        }

        List<Spot> history = state.getMarketData().getHistory();
        updateModel(new Spot[]{history.get(history.size() - 2), history.getLast()}, config.rouletteType());

        List<BetType> betTypes = findTypes(state.getMarketData().getLastSpot(), config.rouletteType());

        Map<BetType, Long> collect = betTypes.stream()
                .flatMap(lastType -> types.getOrDefault(lastType, Map.of()).entrySet().stream())
                .collect(Collectors.groupingBy(Map.Entry::getKey, Collectors.summingLong(Map.Entry::getValue)));
        if (collect.isEmpty()) {
            return List.of();
        }

        final double sum = collect.values()
                .stream()
                .mapToDouble(Long::doubleValue)
                .sum();
        return (sum == 0) ? List.of()
                : collect.entrySet().stream()
                .map(entry -> BetTypePrediction.of(entry.getKey(), entry.getValue() / sum))
                .filter(item -> item.probability() > 0)
                .sorted((p1, p2) -> Double.compare(p2.probability(), p1.probability()))
                .toList();
    }

    @Override
    public List<SpotPrediction> getNextSpot(State state, Config config) {
        if (state.getMarketData().getHistory().size() < size) {
            return List.of();
        }

        List<Spot> history = state.getMarketData().getHistory();
        updateModel(new Spot[]{history.get(history.size() - 2), history.getLast()}, config.rouletteType());

        Map<Spot, Long> map = spots.getOrDefault(state.getMarketData().getLastSpot(), Map.of());

        if (map.isEmpty()) {
            return List.of();
        }

        final double sum = map.values()
                .stream()
                .mapToDouble(Long::doubleValue)
                .sum();
        return (sum == 0) ? List.of()
                : map.entrySet().stream()
                .map(entry -> SpotPrediction.of(entry.getKey(), entry.getValue() / sum))
                .sorted((p1, p2) -> Double.compare(p2.probability(), p1.probability()))
                .toList();
    }


    @Override
    public ColorPrediction getNextColor(State state, Config config) {
        List<SpotPrediction> list = getNextSpot(state, config);

        if (list.isEmpty()) {
            return ColorPrediction.of();
        }

        double red = list.stream()
                .filter(item -> item.spot().isRed())
                .mapToDouble(SpotPrediction::probability)
                .sum();
        double black = list.stream()
                .filter(item -> item.spot().isBlack())
                .mapToDouble(SpotPrediction::probability)
                .sum();
        double green = list.stream()
                .filter(item -> item.spot().isGreen())
                .mapToDouble(SpotPrediction::probability)
                .sum();

        return ColorPrediction.of(red, black, green);
    }

    private List<BetType> findTypes(Spot spot, RouletteType rouletteType) {
        return BetType.getAvailableList(rouletteType).stream()
                .filter(type -> BetHelper.isWin(type, spot))
                .toList();
    }
}
