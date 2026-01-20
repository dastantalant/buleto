package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.base.AbstractStrategy;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AStrategy
public class MeanReversionStrategy extends AbstractStrategy {

    private final int colorStreakThreshold;
    private final double colorRateThreshold;
    private final int recentHistoryWindow;
    private long multiplayer;

    public MeanReversionStrategy(Config config) {
        super(config);
        multiplayer = 1;
        colorStreakThreshold = 4;
        colorRateThreshold = 0.70;
        recentHistoryWindow = 20;
    }

    @Override
    public List<Bet> decide(State state) {
        List<Spot> history = state.getMarketData().getHistory();
        if (history.size() < colorStreakThreshold) {
            return List.of();
        }

        var opt = processStreak(history);

        if (opt.isEmpty() && history.size() >= recentHistoryWindow) {
            opt = recent(state);
            if (opt.isEmpty()) {
                multiplayer = 1;
                return List.of();
            }
        }
        if (opt.isEmpty()) return List.of();

        multiplayer = calculate(state);
        return create(state, opt.get(), multiplayer);
    }

    private Optional<BetType> recent(State state) {

        if (state.getMarketData().getRedRate() > colorRateThreshold) {
            return Optional.of(BetType.BLACK);
        } else if (state.getMarketData().getBlackRate() > colorRateThreshold) {
            return Optional.of(BetType.RED);
        }
        return Optional.empty();
    }

    private Optional<BetType> processStreak(List<Spot> history) {
        List<BetType> colors = extractLastColors(history);
        Optional<BetType> opt = Optional.empty();
        if (colors.size() >= colorStreakThreshold) {
            BetType first = colors.get(colors.size() - colorStreakThreshold);
            boolean isStreak = true;
            for (int i = 1; i < colorStreakThreshold; i++) {
                if (colors.get(colors.size() - i) != first) {
                    isStreak = false;
                    break;
                }
            }
            if (isStreak) {
                opt = Optional.of((first == BetType.RED) ? BetType.BLACK : BetType.RED);
            }
        }
        return opt;
    }

    private List<BetType> extractLastColors(List<Spot> history) {
        List<BetType> types = new ArrayList<>(history.size());
        for (Spot spot : history) {
            if (spot.isRed()) {
                types.add(BetType.RED);
            }
            if (spot.isBlack()) {
                types.add(BetType.BLACK);
            }
        }
        return types;
    }

    private long calculate(State state) {
        long temp = isLastBetWon(state) ? Math.max(1, multiplayer - 1) : multiplayer + 1;
        multiplayer = !isLastBet() ? 1 : temp;
        return multiplayer;
    }

    private List<Bet> create(State state, BetType type, long multiplayer) {
        long value = getConfig().minBet() * multiplayer;
        value = Math.min(value, getBalance());
        value = Math.min(value, getConfig().maxBet());
        return (value < getConfig().minBet()) ? List.of() : Bet.list(type, value);
    }
}