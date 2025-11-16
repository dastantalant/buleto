package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.Color;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.Bet;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class RepeatingColorPatternStrategy extends BaseStrategy {

    private static final int MIN_HISTORY_FOR_PATTERN = 5;
    private static final int PATTERN_LENGTH = 3;

    public RepeatingColorPatternStrategy(Context context) {
        super(context);
    }

    @Override
    public String getName() {
        return RepeatingColorPatternStrategy.class.getSimpleName();
    }

    @Override
    protected List<Bet> getNextInternal(Context context) {
        if (context.getSpotHistory().size() < MIN_HISTORY_FOR_PATTERN) {
            return Collections.emptyList();
        }

        List<Color> colorHistory = context.getSpotHistory().stream()
                .map(this::getSpotColor)
                .filter(Objects::nonNull)
                .toList();

        if (colorHistory.size() < MIN_HISTORY_FOR_PATTERN) {
            return Collections.emptyList();
        }

        BetType betTypeToBetOn = findRepeatingColorPattern(colorHistory);

        if (betTypeToBetOn == null) {
            return Collections.emptyList();
        }

        long betValue;
        if (!hasLastBet() || wasLastBetWon(context)) {
            betValue = context.getMin();
        } else {
            long lastBetValue = getLastTotalBetValue();
            betValue = lastBetValue + context.getMin();
        }

        return createBet(betTypeToBetOn, betValue, context);
    }

    private Color getSpotColor(Spot spot) {
        if (spot.isRed()) return Color.RED;
        if (spot.isBlack()) return Color.BLACK;
        if (spot.isGreen()) return Color.GREEN;
        return null;
    }

    private BetType findRepeatingColorPattern(List<Color> colorHistory) {
        if (colorHistory.size() < PATTERN_LENGTH * 2) {
            return null;
        }

        List<Color> lastPattern = colorHistory.subList(colorHistory.size() - PATTERN_LENGTH, colorHistory.size());

        if (colorHistory.size() >= PATTERN_LENGTH * 2) {
            List<Color> previousPattern = colorHistory.subList(colorHistory.size() - PATTERN_LENGTH * 2, colorHistory.size() - PATTERN_LENGTH);
            if (lastPattern.equals(previousPattern)) {
                if (colorHistory.size() > PATTERN_LENGTH * 2) {
                    Color predictedColor = colorHistory.get(colorHistory.size() - PATTERN_LENGTH * 2);
                    if (predictedColor == Color.RED) return BetType.RED;
                    if (predictedColor == Color.BLACK) return BetType.BLACK;
                }
            }
        }

        if (colorHistory.size() >= 2) {
            Color c1 = colorHistory.get(colorHistory.size() - 1);
            Color c2 = colorHistory.get(colorHistory.size() - 2);
            if (c1 != c2 && c1 != Color.GREEN && c2 != Color.GREEN) {
                if (c1 == Color.RED) return BetType.BLACK;
                if (c1 == Color.BLACK) return BetType.RED;
            } else if (c1 == c2 && c1 != Color.GREEN) {
                if (c1 == Color.RED) return BetType.BLACK;
                if (c1 == Color.BLACK) return BetType.RED;
            }
        }


        return null;
    }

    private List<Bet> createBet(BetType type, long value, Context context) {
        long safeValue = Math.min(value, curBalance);
        if (safeValue <= 0 && curBalance > 0) {
            safeValue = context.getMin();
        } else if (safeValue <= 0) {
            return Collections.emptyList();
        }
        if (type == BetType.ZERO || type == BetType.DOUBLE_ZERO) {
            return Collections.emptyList();
        }
        return Collections.singletonList(Bet.builder().type(type).value(safeValue).build());
    }
}