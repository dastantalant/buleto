package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class MansuriansStrategy extends BaseStrategy {

    private static final List<BetType> CORNER_BETS = Arrays.stream(BetType.values())
            .filter(type -> type.name().startsWith("CORNER_"))
            .toList();

    private int lossStreak;
    private final List<BetType> activeCorners;

    public MansuriansStrategy(Context context) {
        super(context);
        this.lossStreak = 0;
        this.activeCorners = new ArrayList<>();
    }

    @Override
    public String getName() {
        return MansuriansStrategy.class.getSimpleName();
    }

    @Override
    public List<Bet> getNextInternal(Context context) {
        if (wasLastBetWon(context) || !hasLastBet()) {
            lossStreak = 0;
            activeCorners.clear();
        } else {
            lossStreak++;
        }

        int cornersToBetCount = Math.min(lossStreak + 1, 5);

        long multiplier;
        if (lossStreak < 3) {
            multiplier = 1;
        } else if (lossStreak == 3) {
            multiplier = 2;
        } else if (lossStreak == 4) {
            multiplier = 3;
        } else {
            multiplier = 5;
        }

        long betValue = context.getMin() * multiplier;

        while (activeCorners.size() < cornersToBetCount) {
            BetType nextCorner = findNextAvailableCorner();
            if (nextCorner != null) {
                activeCorners.add(nextCorner);
            } else {
                break;
            }
        }

        return activeCorners.stream()
                .map(cornerType -> Bet.builder()
                        .type(cornerType)
                        .value(betValue)
                        .build())
                .toList();
    }

    private BetType findNextAvailableCorner() {
        for (BetType corner : CORNER_BETS) {
            if (!activeCorners.contains(corner)) {
                return corner;
            }
        }
        return null;
    }
}