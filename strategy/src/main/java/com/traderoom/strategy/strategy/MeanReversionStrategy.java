package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

/**
 * Стратегия, основанная на принципе возвращения к среднему.
 * Она ищет статистические аномалии (например, длинные серии одного цвета)
 * и ставит на то, что серия прервется.
 */
public class MeanReversionStrategy extends BaseStrategy {

    /** После скольких выпадений одного цвета подряд мы начинаем ставить против него. */
    private static final int COLOR_STREAK_THRESHOLD = 4;

    /** Порог "перегрева" для доли одного цвета в недавней истории. */
    private static final double COLOR_RATE_THRESHOLD = 0.70;

    /** Количество последних спинов для анализа доли цвета. */
    private static final int RECENT_HISTORY_WINDOW = 20;

    private long currentBetMultiplier = 1;

    public MeanReversionStrategy(Context context) {
        super(context);
    }

    @Override
    public String getName() {
        return MeanReversionStrategy.class.getSimpleName();
    }

    @Override
    protected List<Bet> getNextInternal(Context context) {
        if (context.getSpotHistory().size() < COLOR_STREAK_THRESHOLD) {
            return Collections.emptyList();
        }

        if (hasLastBet()) {
            if (wasLastBetWon(context)) {
                currentBetMultiplier = Math.max(1, currentBetMultiplier - 1);
            } else {
                currentBetMultiplier++;
            }
        } else {
            currentBetMultiplier = 1;
        }
        BetType betTypeToPlace = null;

        List<BetType> lastColors = context.getSpotHistory().stream()
                .map(s -> s.isRed() ? BetType.RED : (s.isBlack() ? BetType.BLACK : null))
                .filter(Objects::nonNull)
                .toList();

        if (lastColors.size() >= COLOR_STREAK_THRESHOLD) {
            BetType firstColorInStreak = lastColors.get(lastColors.size() - COLOR_STREAK_THRESHOLD);
            boolean isStreak = true;
            for (int i = 1; i < COLOR_STREAK_THRESHOLD; i++) {
                if (lastColors.get(lastColors.size() - i) != firstColorInStreak) {
                    isStreak = false;
                    break;
                }
            }

            if (isStreak) {
                betTypeToPlace = (firstColorInStreak == BetType.RED) ? BetType.BLACK : BetType.RED;
            }
        }

        if (betTypeToPlace == null && context.getSpotHistory().size() >= RECENT_HISTORY_WINDOW) {
            double recentRedRate = context.getRedRate();
            double recentBlackRate = context.getBlackRate();

            if (recentRedRate > COLOR_RATE_THRESHOLD) {
                betTypeToPlace = BetType.BLACK;
            } else if (recentBlackRate > COLOR_RATE_THRESHOLD) {
                betTypeToPlace = BetType.RED;
            }
        }

        if (betTypeToPlace == null) {
            currentBetMultiplier = 1;
            return Collections.emptyList();
        }

        long betValue = context.getMin() * currentBetMultiplier;
        return createBet(betTypeToPlace, betValue, context);
    }

    private List<Bet> createBet(BetType type, long value, Context context) {
        long safeValue = Math.min(value, curBalance);
        safeValue = Math.min(safeValue, context.getMax());
        if (safeValue < context.getMin()) {
            return Collections.emptyList();
        }
        return Collections.singletonList(Bet.builder().type(type).value(safeValue).build());
    }
}