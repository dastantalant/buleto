package com.traderoom.analyzer.predictor.test;

import com.traderoom.api.enums.BetType;
import com.traderoom.api.enums.RouletteType;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.SpotPrediction;
import com.traderoom.api.utils.BetHelper;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Deprecated
public class ImprovedMarkovTest implements PredictorTest {

    private final Map<Spot, Map<Spot, Long>> spots = new ConcurrentHashMap<>();
    private final Map<BetType, Map<BetType, Long>> types = new ConcurrentHashMap<>();

    @Override
    public List<SpotPrediction> predict(List<Spot> history, RouletteType rouletteType, int windowSize) {
        List<Spot> window = split(history, windowSize);
        if(window.size() < 2) return List.of();
        updateModel(new Spot[]{window.get(window.size() - 2), window.getLast()}, rouletteType);
        Map<Spot, Long> map = spots.getOrDefault(history.getLast(), Map.of());
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

    private List<BetType> findTypes(Spot spot, RouletteType rouletteType) {
        return BetType.getAvailableList(rouletteType).stream()
                .filter(type -> BetHelper.isWin(type, spot))
                .toList();
    }
}
