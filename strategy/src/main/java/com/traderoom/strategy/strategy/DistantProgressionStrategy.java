package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

public class DistantProgressionStrategy extends BaseStrategy {

    private static final List<BetType> DOZEN_BET_TYPES = List.of(
            BetType.FIRST_DOZEN, BetType.SECOND_DOZEN, BetType.THIRD_DOZEN
    );
    private static final List<BetType> COLUMN_BET_TYPES = List.of(
            BetType.FIRST_COLUMN, BetType.SECOND_COLUMN, BetType.THIRD_COLUMN
    );

    private final List<BetType> targetBetTypes;

    public DistantProgressionStrategy(Context context) {
        super(context);
        targetBetTypes = DOZEN_BET_TYPES;
    }

    @Override
    public String getName() {
        return DistantProgressionStrategy.class.getSimpleName();
    }

    @Override
    protected List<Bet> getNextInternal(Context context) {
        if (context.getSpotHistory().isEmpty()) {
            return createBet(targetBetTypes.getFirst(), context.getMin(), context);
        }

        Optional<BetType> betTypeToBetOn = findMostDistantBetType(context);

        if (betTypeToBetOn.isEmpty()) {
            return createBet(targetBetTypes.getFirst(), context.getMin(), context);
        }

        long betValue;
        if (!hasLastBet() || wasLastBetWon(context)) {
            betValue = context.getMin();
        } else {
            long lastBetValue = getLastTotalBetValue();
            betValue = lastBetValue * 2;
        }

        return createBet(betTypeToBetOn.get(), betValue, context);
    }

    private Optional<BetType> findMostDistantBetType(Context context) {
        Map<BetType, Long> typeFrequencies = targetBetTypes.stream()
                .collect(Collectors.toMap(
                        type -> type,
                        type -> context.getSpotHistory().stream()
                                .filter(spot -> type.getWinningSpots().contains(spot))
                                .count()
                ));

        return typeFrequencies.entrySet().stream()
                .min(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey);
    }

    private List<Bet> createBet(BetType type, long value, Context context) {
        long safeValue = Math.min(value, curBalance);
        if (safeValue <= 0 && curBalance > 0) {
            safeValue = context.getMin();
        } else if (safeValue <= 0) {
            return Collections.emptyList();
        }
        return Collections.singletonList(Bet.builder().type(type).value(safeValue).build());
    }
}