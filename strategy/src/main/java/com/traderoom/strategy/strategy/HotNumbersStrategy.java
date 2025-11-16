package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.utils.BetHelper;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

public class HotNumbersStrategy extends BaseStrategy {

    private static final int NUMBER_OF_HOT_SPOTS_TO_BET_ON = 5;

    public HotNumbersStrategy(Context context) {
        super(context);
    }

    @Override
    public String getName() {
        return HotNumbersStrategy.class.getSimpleName();
    }

    @Override
    protected List<Bet> getNextInternal(Context context) {
        if (context.getSpotHistory().isEmpty()) {
            return Collections.emptyList();
        }

        Map<Spot, Integer> frequencies = context.getSpotFrequencies();
        List<Spot> availableSpots = Spot.getAvailableList(context.getRouletteType());

        List<Spot> hotSpots = availableSpots.stream()
                .sorted(Comparator.comparingInt(spot -> frequencies.getOrDefault(spot, 0)).reversed())
                .limit(NUMBER_OF_HOT_SPOTS_TO_BET_ON)
                .toList();

        if (hotSpots.isEmpty()) {
            return Collections.emptyList();
        }

        return hotSpots.stream()
                .map(spot -> {
                    BetType type = BetHelper.getStraightUpBetType(spot);
                    return Bet.builder().type(type).value(context.getMin()).build();
                })
                .toList();
    }
}