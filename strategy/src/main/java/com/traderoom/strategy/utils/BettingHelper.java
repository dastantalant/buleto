package com.traderoom.strategy.utils;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.predictor.PatternPredictor;
import com.traderoom.strategy.predictor.Predictor;
import lombok.experimental.UtilityClass;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;

@UtilityClass
public class BettingHelper {

    private static final Predictor ADVISOR_PREDICTOR = new PatternPredictor();
    private static final int NUMBER_OF_BETS_TO_PLACE = 5;

    public static List<Bet> createDiversifiedBets(long totalAmount, Context context) {
        if (totalAmount < context.getMin()) {
            return List.of();
        }

        List<SpotPrediction> predictions = ADVISOR_PREDICTOR.getNextSpotPredictionList(context);

        if (predictions.isEmpty()) {
            return List.of();
        }

        List<SpotPrediction> topCandidates = predictions.stream()
                .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
                .limit(NUMBER_OF_BETS_TO_PLACE)
                .toList();

        if (topCandidates.isEmpty()) {
            return List.of();
        }

        double totalProbability = topCandidates.stream().mapToDouble(SpotPrediction::probability).sum();
        if (totalProbability == 0) {
            return List.of();
        }

        return topCandidates.stream()
                .map(prediction -> {
                    long betValue = (long) (totalAmount * (prediction.probability() / totalProbability));
                    if (betValue >= 1L) {
                        return Bet.builder()
                                .type(BetHelper.getStraightUpBetType(prediction.spot()))
                                .value(betValue)
                                .build();
                    }
                    return null;
                })
                .filter(Objects::nonNull)
                .toList();
    }
}