package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.predictor.Predictor;
import com.traderoom.strategy.enums.RouletteType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.predictor.MultiOrderMarkovPredictor;
import com.traderoom.strategy.base.AbstractStrategy;
import com.traderoom.strategy.utils.BetHelper;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@AStrategy
public class WheelSectorStrategy extends AbstractStrategy {

    private final Predictor predictor;
    private final int size;
    private final double probability;

    public WheelSectorStrategy(Config config) {
        super(config);
        predictor = new MultiOrderMarkovPredictor();
        size = 5;
        probability = 0.2;
    }

    @Override
    public List<Bet> decide(State state) {
        if (getConfig().rouletteType() == RouletteType.ONE_TO_36) {
            return List.of();
        }
        List<SpotPrediction> predictions = predictor.getNextSpot(state, getConfig());
        if (predictions.isEmpty()) {
            return List.of();
        }

        SpotPrediction prediction = predictions.stream()
                .filter(p -> p.probability() >= probability)
                .max(Comparator.comparingDouble(SpotPrediction::probability))
                .orElse(null);

        if (prediction == null) {
            return List.of();
        }

        Set<Spot> sector = getSpotsInSector(prediction.spot(), size, getConfig().rouletteType());
        List<Bet> bets = new ArrayList<>(sector.size());
        long value = getConfig().minBet();
        for (Spot spot : sector) {
            long sum = getBalance() - bets.stream()
                    .mapToLong(Bet::value)
                    .sum();
            if (sum < value) {
                break;
            }
            bets.add(Bet.of(BetHelper.getStraightUp(spot), value));
        }

        return bets;
    }

    private Set<Spot> getSpotsInSector(Spot centerSpot, int radius, RouletteType rouletteType) {
        Map<Spot, Integer> wheelPositions = Spot.WHEEL_POSITIONS_CACHE.get(rouletteType);
        Spot[] wheelLayout = Spot.getWheelLayouts().get(rouletteType);

        if (wheelPositions == null || wheelLayout == null) {
            return Set.of();
        }

        int centerPos = wheelPositions.getOrDefault(centerSpot, -1);
        if (centerPos == -1) {
            return Set.of();
        }

        Set<Spot> sector = HashSet.newHashSet(radius * 2);
        int wheelSize = wheelLayout.length;

        for (int i = -radius; i <= radius; i++) {
            int currentPos = (centerPos + i + wheelSize) % wheelSize;
            sector.add(wheelLayout[currentPos]);
        }

        return sector;
    }
}