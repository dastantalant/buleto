package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.utils.BetHelper;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class StraightUpStrategy3 extends BaseStrategy {

    private int count = 0;

    public StraightUpStrategy3(Context context) {
        super(context);
    }

    @Override
    public String getName() {
        return StraightUpStrategy3.class.getSimpleName();
    }


    @Override
    public List<Bet> getNextInternal(Context context) {
        count = wasLastBetWon(context) ? count + 1 : 0;

        List<Spot> spotHistory = context.getSpotHistory();
        Set<Spot> excludedSpots = new HashSet<>(spotHistory.subList(
                Math.max(0, spotHistory.size() - count),
                spotHistory.size()
        ));

        List<Spot> availableSpots = Spot.getAvailableList(context.getRouletteType());

        return availableSpots.stream()
                .filter(spot -> !excludedSpots.contains(spot))
                .map(spot -> {
                    BetType type = BetHelper.getStraightUpBetType(spot);
                    return Bet.builder()
                            .type(type)
                            .value(context.getMin())
                            .build();
                })
                .toList();
    }
}