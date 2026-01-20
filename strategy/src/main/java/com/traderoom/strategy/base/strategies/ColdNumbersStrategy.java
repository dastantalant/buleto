package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.base.AbstractStrategy;
import com.traderoom.strategy.utils.BetHelper;

import java.util.Comparator;
import java.util.List;
import java.util.Map;

@AStrategy
public class ColdNumbersStrategy extends AbstractStrategy {

    private final int numberOfColdSpots;

    public ColdNumbersStrategy(Config config) {
        super(config);
        numberOfColdSpots = 5;
    }

    @Override
    public List<Bet> decide(State state) {
        if (state.getMarketData().getHistory().isEmpty()) return List.of();

        Map<Spot, Integer> frequencies = state.getMarketData().getFrequencies();

        List<Spot> spots = Spot.getAvailableList(getConfig().rouletteType()).stream()
                .sorted(Comparator.comparingInt(spot -> frequencies.getOrDefault(spot, 0)))
                .limit(numberOfColdSpots)
                .toList();

        long minBet = getConfig().minBet();

        return spots.isEmpty() ? List.of() :
                spots.stream()
                        .map(spot -> Bet.of(BetHelper.getStraightUp(spot), minBet))
                        .toList();
    }
}