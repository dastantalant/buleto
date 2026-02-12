package com.traderoom.analyzer;

import com.traderoom.api.AbstractStrategy;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.enums.RouletteType;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.utils.BetHelper;

import java.util.ArrayList;
import java.util.List;

@Strategy(tags = {Tag.PHYSICAL})
public class CustomNeighborAnalysisStrategy extends AbstractStrategy {

    private final int neighborDistanceThreshold;
    private final int historyForTrendAnalysis;

    public CustomNeighborAnalysisStrategy(Config config) {
        this(config, 3, 10);
    }

    public CustomNeighborAnalysisStrategy(Config config, int neighborDistanceThreshold, int historyForTrendAnalysis) {
        super(config);
        this.neighborDistanceThreshold = neighborDistanceThreshold;
        this.historyForTrendAnalysis = historyForTrendAnalysis;
    }

    @Override
    public List<Bet> decide() {
        List<Spot> history = getMarket().getHistory();
        if (history.size() < 2) {
            return List.of();
        }

        if (neighbor(history) > 0.5) {
            return nextInternal(history.getLast());
        }
        return List.of();
    }

    private double neighbor(List<Spot> history) {
        long neighborHits = 0;
        int window = Math.min(history.size() - 1, historyForTrendAnalysis);
        for (int i = 0; i < window; i++) {
            Spot cur = history.get(history.size() - 1 - i);
            Spot prev = history.get(history.size() - 2 - i);

            try {
                if (cur.getPhysicalDistance(prev, getConfig().rouletteType()) <= neighborDistanceThreshold) {
                    neighborHits++;
                }
            } catch (IllegalArgumentException e) {
                continue;
            }
        }
        return (double) neighborHits / window;
    }

    private List<Bet> nextInternal(Spot last) {
        List<Bet> bets = new ArrayList<>();
        RouletteType rType = getConfig().rouletteType();
        Spot[] spots = Spot.getWheelLayouts().get(rType);
        if (spots == null) {
            return List.of();
        }

        int position = last.getWheelPosition(rType);
        if (position == -1) {
            return List.of();
        }

        bets.add(BetHelper.betting(last, getMinBet()));
        for (int i = 1; i <= neighborDistanceThreshold; i++) {
            Spot left = spots[(position - i + spots.length) % spots.length];
            if (left.getWheelPosition(rType) != -1) {
                bets.add(BetHelper.betting(left, getMinBet()));
            }
            Spot right = spots[(position + i) % spots.length];
            if (right.getWheelPosition(rType) != -1 && !left.equals(right)) {
                bets.add(BetHelper.betting(right, getMinBet()));
            }
        }
        return bets;
    }
}
