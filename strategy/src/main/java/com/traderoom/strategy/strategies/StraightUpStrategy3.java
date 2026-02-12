package com.traderoom.strategy.strategies;

import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.Bet;
import com.traderoom.api.AbstractStrategy;
import com.traderoom.api.utils.BetHelper;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Strategy
public class StraightUpStrategy3 extends AbstractStrategy {

    private int count;

    public StraightUpStrategy3(Config config) {
        super(config);
    }

    @Override
    public List<Bet> decide() {
        count = isLastBetWon() ? count + 1 : 0;

        List<Spot> history = getMarket().getHistory();
        int size = history.size();
        Set<Spot> excluded = new HashSet<>(history.subList(Math.max(0, size - count), size));

        return Spot.getAvailableList(getConfig().rouletteType())
                .stream()
                .filter(spot -> !excluded.contains(spot))
                .map(spot -> Bet.of(BetHelper.getStraightUp(spot), getMinBet()))
                .toList();
    }
}