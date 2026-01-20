package com.traderoom.strategy.utils;

import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.predictor.Predictor;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.predictor.PatternPredictor;

import lombok.experimental.UtilityClass;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@UtilityClass
public class BettingHelper {

    private static final Predictor ADVISOR_PREDICTOR = new PatternPredictor();
    private static final int NUMBER_OF_BETS_TO_PLACE = 5;

    public static List<Bet> createDiversifiedBets(long total, State state, Config config) {
        long minBet = config.minBet();

        if (total < minBet) {
            return List.of();
        }

        List<SpotPrediction> predictions = ADVISOR_PREDICTOR.getNextSpot(state, config);

        if (predictions.isEmpty()) {
            return List.of();
        }

        List<SpotPrediction> top = predictions.stream()
                .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
                .limit(NUMBER_OF_BETS_TO_PLACE)
                .toList();

        if (top.isEmpty()) {
            return List.of();
        }

        double sum = top.stream()
                .mapToDouble(SpotPrediction::probability)
                .sum();

        if (sum == 0) {
            return List.of();
        }

        List<Bet> bets = new ArrayList<>(NUMBER_OF_BETS_TO_PLACE);
        for (SpotPrediction item : top) {
            long betValue = (long) (total * (item.probability() / sum));

            if (betValue >= 1L) {
                bets.add(Bet.of(BetHelper.getStraightUp(item.spot()), betValue));
            }
        }
        return bets;
    }
}