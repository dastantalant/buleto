package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.Bet;

import java.util.Collections;
import java.util.List;

/**
 * Стратегия, которая определяет текущий "режим" игры (тренд, чередование, хаос)
 * и применяет соответствующую тактику.
 */
public class GameRegimeStrategy extends BaseStrategy {

    private enum Regime { TREND, ALTERNATING, SLEEPING, CHAOS }

    private static final int TREND_STREAK = 3;
    private static final int ALTERNATING_STREAK = 4;

    private long progressionBetValue = 0;

    public GameRegimeStrategy(Context context) {
        super(context);
    }

    @Override
    public String getName() {
        return GameRegimeStrategy.class.getSimpleName();
    }

    @Override
    protected List<Bet> getNextInternal(Context context) {
        if (context.getSpotHistory().size() < ALTERNATING_STREAK) {
            return Collections.emptyList();
        }

        Regime currentRegime = detectRegime(context);

        if(currentRegime != Regime.SLEEPING) {
            progressionBetValue = 0;
        }

        return switch (currentRegime) {
            case TREND -> handleTrendRegime(context);
            case ALTERNATING -> handleAlternatingRegime(context);
            default -> handleChaosRegime(context);
        };
    }

    private Regime detectRegime(Context context) {
        List<Spot> history = context.getSpotHistory();

        if (history.size() >= TREND_STREAK) {
            Spot last = history.getLast();
            boolean isTrend = true;
            for (int i = 1; i < TREND_STREAK; i++) {
                if (history.get(history.size() - 1 - i).isRed() != last.isRed() ||
                        history.get(history.size() - 1 - i).isBlack() != last.isBlack()) {
                    isTrend = false;
                    break;
                }
            }
            if (isTrend && !last.isGreen()) return Regime.TREND;
        }

        if (history.size() >= ALTERNATING_STREAK) {
            boolean isAlternating = true;
            for (int i = 0; i < ALTERNATING_STREAK - 1; i++) {
                Spot s1 = history.get(history.size() - 1 - i);
                Spot s2 = history.get(history.size() - 2 - i);
                if (s1.isGreen() || s2.isGreen() || (s1.isRed() == s2.isRed())) {
                    isAlternating = false;
                    break;
                }
            }
            if (isAlternating) return Regime.ALTERNATING;
        }

        return Regime.CHAOS;
    }

    private List<Bet> handleTrendRegime(Context context) {
        BetType betType = context.getLastSpot().isRed() ? BetType.RED : BetType.BLACK;
        long betValue = wasLastBetWon(context) ? getLastTotalBetValue() + context.getMin() : context.getMin();
        return createBet(betType, betValue, context);
    }

    private List<Bet> handleAlternatingRegime(Context context) {
        BetType betType = context.getLastSpot().isRed() ? BetType.BLACK : BetType.RED;
        return createBet(betType, context.getMin(), context);
    }

    private List<Bet> handleChaosRegime(Context context) {
        return Collections.emptyList();
    }

    private List<Bet> createBet(BetType type, long value, Context context) {
        long safeValue = Math.min(value, curBalance);
        safeValue = Math.min(safeValue, context.getMax());
        if (safeValue < context.getMin()) return Collections.emptyList();
        return List.of(Bet.builder().type(type).value(safeValue).build());
    }
}