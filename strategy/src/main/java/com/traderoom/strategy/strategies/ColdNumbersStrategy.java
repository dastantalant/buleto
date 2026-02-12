package com.traderoom.strategy.strategies;

import com.traderoom.api.enums.Spot;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.AbstractStrategy;
import com.traderoom.api.utils.BetHelper;

import java.util.Comparator;
import java.util.List;
import java.util.Map;

@Strategy(tags = {Tag.STATISTICAL})
public class ColdNumbersStrategy extends AbstractStrategy {

    private final int numberOfColdSpots;

    public ColdNumbersStrategy(Config config) {
        super(config);
        numberOfColdSpots = 5;
    }

    @Override
    public List<Bet> decide() {
        if (getMarket().getHistory().isEmpty()) return List.of();

        Map<Spot, Integer> frequencies = getMarket().getFrequencies();

        List<Spot> spots = Spot.getAvailableList(getConfig().rouletteType()).stream()
                .sorted(Comparator.comparingInt(spot -> frequencies.getOrDefault(spot, 0)))
                .limit(numberOfColdSpots)
                .toList();

        long minBet = getMinBet();

        return spots.isEmpty() ? List.of() :
                spots.stream()
                        .map(spot -> Bet.of(BetHelper.getStraightUp(spot), minBet))
                        .toList();
    }
}