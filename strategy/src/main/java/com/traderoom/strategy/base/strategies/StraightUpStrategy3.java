package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.base.AbstractStrategy;
import com.traderoom.strategy.utils.BetHelper;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@AStrategy
public class StraightUpStrategy3 extends AbstractStrategy {

    private int count;

    public StraightUpStrategy3(Config config) {
        super(config);
    }

    @Override
    public List<Bet> decide(State state) {
        count = isLastBetWon(state) ? count + 1 : 0;

        List<Spot> history = state.getMarketData().getHistory();
        int size = history.size();
        Set<Spot> excluded = new HashSet<>(history.subList(Math.max(0, size - count), size));

        return Spot.getAvailableList(getConfig().rouletteType())
                .stream()
                .filter(spot -> !excluded.contains(spot))
                .map(spot -> Bet.of(BetHelper.getStraightUp(spot), getConfig().minBet()))
                .toList();
    }
}