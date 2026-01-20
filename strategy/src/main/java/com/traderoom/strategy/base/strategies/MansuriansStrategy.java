package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.base.AbstractStrategy;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AStrategy
public class MansuriansStrategy extends AbstractStrategy {

    private final List<BetType> corners;
    private final List<BetType> activeCorners;
    private int lossStreak;

    public MansuriansStrategy(Config config) {
        super(config);
        activeCorners = new ArrayList<>();
        corners = List.of(BetType.CORNER_1_2_4_5, BetType.CORNER_32_33_35_36, BetType.CORNER_0_1_2_3);
    }

    @Override
    public List<Bet> decide(State state) {
        if (isLastBetWon(state) || !isLastBet()) {
            lossStreak = 0;
            activeCorners.clear();
        } else {
            lossStreak++;
        }

        int cornersToBetCount = Math.min(lossStreak + 1, 5);

        long value = getConfig().minBet() * 5;
        if (lossStreak < 3) {
            value = getConfig().minBet();
        } else if (lossStreak == 3) {
            value = getConfig().minBet() * 2;
        } else if (lossStreak == 4) {
            value = getConfig().minBet() * 3;
        }

        while (activeCorners.size() < cornersToBetCount) {
            findNextAvailableCorner()
                    .ifPresent(activeCorners::add);
        }

        List<Bet> bets = new ArrayList<>(activeCorners.size());
        for (BetType type : activeCorners) {
            bets.add(Bet.of(type, value));
        }
        return bets;
    }

    private Optional<BetType> findNextAvailableCorner() {
        for (BetType corner : corners) {
            if (!activeCorners.contains(corner)) {
                return Optional.of(corner);
            }
        }
        return Optional.empty();
    }
}