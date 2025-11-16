package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.RouletteType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.utils.BetHelper;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class NeighborAnalysisStrategy extends BaseStrategy {

    private static final int NEIGHBOR_DISTANCE_THRESHOLD = 3;
    private static final int HISTORY_FOR_TREND_ANALYSIS = 10;

    public NeighborAnalysisStrategy(Context context) {
        super(context);
    }

    @Override
    public String getName() {
        return NeighborAnalysisStrategy.class.getSimpleName();
    }

    @Override
    protected List<Bet> getNextInternal(Context context) {
        if (context.getSpotHistory().size() < 2) {
            return Collections.emptyList();
        }

        List<Spot> history = context.getSpotHistory();
        Spot lastSpot = history.getLast();
        Spot secondLastSpot = history.get(history.size() - 2);

        long neighborHits = 0;
        int analysisWindow = Math.min(history.size() - 1, HISTORY_FOR_TREND_ANALYSIS);

        for (int i = 0; i < analysisWindow; i++) {
            Spot current = history.get(history.size() - 1 - i);
            Spot previous = history.get(history.size() - 2 - i);
            try {
                if (current.getPhysicalDistance(previous, context.getRouletteType()) <= NEIGHBOR_DISTANCE_THRESHOLD) {
                    neighborHits++;
                }
            } catch (IllegalArgumentException e) {
            }
        }

        double neighborTrend = (double) neighborHits / analysisWindow;

        if (neighborTrend > 0.5) {
            List<Bet> bets = new ArrayList<>();
            RouletteType rouletteType = context.getRouletteType();
            Spot[] wheelLayout = Spot.WHEEL_LAYOUTS.get(rouletteType);
            if (wheelLayout == null) {
                return Collections.emptyList();
            }

            int lastSpotPosition = lastSpot.getWheelPosition(rouletteType);
            if (lastSpotPosition == -1) {
                return Collections.emptyList();
            }

            bets.add(Bet.builder()
                    .type(BetHelper.getStraightUpBetType(lastSpot))
                    .value(context.getMin())
                    .build());
            for (int i = 1; i <= NEIGHBOR_DISTANCE_THRESHOLD; i++) {
                Spot leftNeighbor = wheelLayout[(lastSpotPosition - i + wheelLayout.length) % wheelLayout.length];
                Spot rightNeighbor = wheelLayout[(lastSpotPosition + i) % wheelLayout.length];

                if (leftNeighbor.getWheelPosition(rouletteType) != -1) {
                    bets.add(Bet.builder()
                            .type(BetHelper.getStraightUpBetType(leftNeighbor))
                            .value(context.getMin())
                            .build());
                }
                if (rightNeighbor.getWheelPosition(rouletteType) != -1 && !leftNeighbor.equals(rightNeighbor)) {
                    bets.add(Bet.builder()
                            .type(BetHelper.getStraightUpBetType(rightNeighbor))
                            .value(context.getMin())
                            .build());
                }
            }
            return bets;
        }
        return Collections.emptyList();
    }
}