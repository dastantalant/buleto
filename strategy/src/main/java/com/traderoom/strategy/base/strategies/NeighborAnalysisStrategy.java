package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.enums.RouletteType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.base.AbstractStrategy;
import com.traderoom.strategy.utils.BetHelper;

import java.util.ArrayList;
import java.util.List;

@AStrategy
public class NeighborAnalysisStrategy extends AbstractStrategy {

    private final int neighborDistanceThreshold;
    private final int historyForTrendAnalysis;

    public NeighborAnalysisStrategy(Config config) {
        super(config);
        neighborDistanceThreshold = 3;
        historyForTrendAnalysis = 10;
    }

    @Override
    public List<Bet> decide(State state) {
        List<Spot> history = state.getMarketData().getHistory();
        if (history.size() < 2) {
            return List.of();
        }

        if (neighbor(state, history) > 0.5) {
            return nextInternal(state, history.getLast());
        }
        return List.of();
    }

    private double neighbor(State state, List<Spot> history) {
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

    private List<Bet> nextInternal(State state, Spot last) {
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

        bets.add(Bet.of(BetHelper.getStraightUp(last), getConfig().minBet()));
        for (int i = 1; i <= neighborDistanceThreshold; i++) {
            Spot left = spots[(position - i + spots.length) % spots.length];
            if (left.getWheelPosition(rType) != -1) {
                bets.add(Bet.of(BetHelper.getStraightUp(left), getConfig().minBet()));
            }
            Spot right = spots[(position + i) % spots.length];
            if (right.getWheelPosition(rType) != -1 && !left.equals(right)) {
                bets.add(Bet.of(BetHelper.getStraightUp(right), getConfig().minBet()));
            }
        }
        return bets;
    }
}