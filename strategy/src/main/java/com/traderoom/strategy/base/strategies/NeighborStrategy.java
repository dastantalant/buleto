package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.base.AbstractStrategy;
import com.traderoom.strategy.enums.RouletteType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.predictor.MultiOrderMarkovPredictor;
import com.traderoom.strategy.predictor.Predictor;
import com.traderoom.strategy.utils.BetHelper;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import static com.traderoom.strategy.enums.Spot.*;

@AStrategy
public class NeighborStrategy extends AbstractStrategy {

    private final double minProbabilityThreshold;
    private final Map<Integer, Set<Spot>> groups;
    private final Predictor predictor;

    public NeighborStrategy(Config config) {
        super(config);
        minProbabilityThreshold = 0.1;
        predictor = new MultiOrderMarkovPredictor();
        groups = Map.of(1, EnumSet.of(SPOT_32, SPOT_15, SPOT_19, SPOT_04, SPOT_21, SPOT_02, SPOT_25, SPOT_17, SPOT_34),
                2, EnumSet.of(SPOT_06, SPOT_27, SPOT_13, SPOT_36, SPOT_11, SPOT_30, SPOT_08, SPOT_23, SPOT_10),
                3, EnumSet.of(SPOT_05, SPOT_24, SPOT_16, SPOT_33, SPOT_01, SPOT_20, SPOT_14, SPOT_31, SPOT_09),
                4, EnumSet.of(SPOT_22, SPOT_18, SPOT_29, SPOT_07, SPOT_28, SPOT_12, SPOT_35, SPOT_03, SPOT_26, SPOT_0));
    }

    @Override
    public List<Bet> decide(State state) {
        if (getConfig().rouletteType() != RouletteType.EUROPEAN) {
            return List.of();
        }

        Map<Integer, Double> group = HashMap.newHashMap(10);
        group.put(1, 0.0);
        group.put(2, 0.0);
        group.put(3, 0.0);
        group.put(4, 0.0);

        for (SpotPrediction prediction : predictor.getNextSpot(state, getConfig())) {
            for (Map.Entry<Integer, Set<Spot>> entry : groups.entrySet()) {
                if (entry.getValue().contains(prediction.spot())) {
                    group.merge(entry.getKey(), prediction.probability(), Double::sum);
                    break;
                }
            }
        }

        Map.Entry<Integer, Double> maxEntry = group.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .orElseThrow(() -> new IllegalStateException("No probabilities calculated"));

        if (maxEntry.getValue() < minProbabilityThreshold) {
            return List.of();
        }

        return groups.get(maxEntry.getKey()).stream()
                .map(spot -> Bet.of(BetHelper.getStraightUp(spot), getConfig().minBet()))
                .toList();
    }
}