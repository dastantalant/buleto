package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.Color;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.base.AbstractStrategy;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AStrategy
public class RepeatingColorPatternStrategy extends AbstractStrategy {

    private static final int MIN_HISTORY_FOR_PATTERN = 5;
    private static final int PATTERN_LENGTH = 3;

    public RepeatingColorPatternStrategy(Config config) {
        super(config);
    }

    @Override
    public List<Bet> decide(State state) {
        if (state.getMarketData().getHistory().size() < MIN_HISTORY_FOR_PATTERN) {
            return List.of();
        }

        List<Color> colorHistory = new ArrayList<>(state.getMarketData().getHistory().size());
        for (Spot spot : state.getMarketData().getHistory()) {
            if (spot.isRed()) colorHistory.add(Color.RED);
            if (spot.isBlack()) colorHistory.add(Color.BLACK);
            if (spot.isGreen()) colorHistory.add(Color.GREEN);
        }

        if (colorHistory.size() < MIN_HISTORY_FOR_PATTERN) {
            return List.of();
        }

        return findColorPattern(colorHistory).map(betType -> createBet(betType, state))
                .orElseGet(List::of);
    }

    public Optional<BetType> findColorPattern(List<Color> colorHistory) {
        Optional<BetType> repeatingPatternBet = checkForRepeatingPattern(colorHistory);
        if (repeatingPatternBet.isPresent()) {
            return repeatingPatternBet;
        }
        if (colorHistory.size() >= 2) {
            Color lastColor = colorHistory.getLast();
            Color secondToLastColor = colorHistory.get(colorHistory.size() - 2);
            if (lastColor != Color.GREEN && secondToLastColor != Color.GREEN) {
                return getOppositeColorBet(lastColor);
            }
        }

        return Optional.empty();
    }

    private Optional<BetType> checkForRepeatingPattern(List<Color> history) {
        int requiredSize = PATTERN_LENGTH * 2 + 1;
        if (history.size() < requiredSize) {
            return Optional.empty();
        }

        int size = history.size();
        int previousPatternStart = size - (PATTERN_LENGTH * 2);
        int lastPatternStart = size - PATTERN_LENGTH;

        List<Color> lastPattern = history.subList(lastPatternStart, size);
        List<Color> previousPattern = history.subList(previousPatternStart, lastPatternStart);

        if (lastPattern.equals(previousPattern)) {
            Color predictedColor = history.get(previousPatternStart - 1);
            return mapColorToBetType(predictedColor);
        }

        return Optional.empty();
    }

    private Optional<BetType> getOppositeColorBet(Color color) {
        return switch (color) {
            case RED -> Optional.of(BetType.BLACK);
            case BLACK -> Optional.of(BetType.RED);
            default -> Optional.empty();
        };
    }

    private Optional<BetType> mapColorToBetType(Color color) {
        return switch (color) {
            case RED -> Optional.of(BetType.RED);
            case BLACK -> Optional.of(BetType.BLACK);
            default -> Optional.empty();
        };
    }

    private List<Bet> createBet(BetType type, State state) {
        if (type == BetType.ZERO || type == BetType.DOUBLE_ZERO) {
            return List.of();
        }
        long next = (!isLastBet() || isLastBetWon(state))
                ? getConfig().minBet()
                : getLastBet() + getConfig().minBet();
        long balance = getBalance();
        long value = Math.min(next, balance);

        if (value <= 0 && balance > 0) {
            value = getConfig().minBet();
        } else if (value <= 0) {
            return List.of();
        }

        return Bet.list(type, value);
    }
}