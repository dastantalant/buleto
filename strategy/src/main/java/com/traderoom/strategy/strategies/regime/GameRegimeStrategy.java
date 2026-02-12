package com.traderoom.strategy.strategies.regime;

import com.traderoom.api.enums.BetType;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.config.Config;

import java.util.List;
import java.util.Optional;

@Strategy(tags = {Tag.PATTERN, Tag.STATISTICAL})
public class GameRegimeStrategy extends AbstractRegimeStrategy {

    public GameRegimeStrategy(Config config) {
        RegimeContext build = RegimeContext.builder()
                .trendStreak(3)
                .alternatingStreak(4)
                .build();
        super(config, build);
    }

    @Override
    public List<Bet> decide() {
        if (getState().getMarket().getHistory().size() < alternatingStreak) {
            return List.of();
        }
        Regime currentRegime = detectRegime();
        return switch (currentRegime) {
            case TREND -> handleTrendRegime();
            case ALTERNATING -> handleAlternatingRegime();
            default -> List.of();
        };
    }

    private Regime detectRegime() {
        List<Spot> history = getState().getMarket().getHistory();
        int size = history.size();
        Optional<Regime> optional = detectTrend(history, size);
        if (optional.isPresent()) return optional.get();
        optional = detectAlternating(history, size);
        return optional.orElse(Regime.CHAOS);
    }

    private Optional<Regime> detectTrend(List<Spot> history, int size) {
        if (size >= trendStreak) {
            Spot last = history.getLast();
            boolean isTrend = true;
            for (int i = 1; i < trendStreak; i++) {
                if (history.get(size - 1 - i).isRed() != last.isRed()
                        || history.get(size - 1 - i).isBlack() != last.isBlack()) {
                    isTrend = false;
                    break;
                }
            }
            if (isTrend && !last.isGreen()) {
                return Optional.of(Regime.TREND);
            }
        }
        return Optional.empty();
    }

    private Optional<Regime> detectAlternating(List<Spot> history, int size) {
        if (size >= alternatingStreak) {
            boolean isAlternating = true;
            for (int i = 0; i < alternatingStreak - 1; i++) {
                Spot s1 = history.get(size - 1 - i);
                Spot s2 = history.get(size - 2 - i);
                if (s1.isGreen() || s2.isGreen() || (s1.isRed() == s2.isRed())) {
                    isAlternating = false;
                    break;
                }
            }
            if (isAlternating) {
                return Optional.of(Regime.ALTERNATING);
            }
        }
        return Optional.empty();
    }

    private List<Bet> handleTrendRegime() {
        if (getMarket().getLastSpot() == null) return List.of();
        BetType betType = getMarket().getLastSpot().isRed() ? BetType.RED : BetType.BLACK;
        long betValue = isLastBetWon() ? getLastBet() + getMinBet() : getMinBet();
        return create(betType, betValue);
    }

    private List<Bet> handleAlternatingRegime() {
        if (getMarket().getLastSpot() == null) return List.of();
        BetType betType = getMarket().getLastSpot().isRed() ? BetType.BLACK : BetType.RED;
        return create(betType, getMinBet());
    }

    private List<Bet> create(BetType type, long value) {
        long safeValue = Math.min(value, getVirtualBalance());
        safeValue = Math.min(safeValue, getMaxBet());
        if (safeValue < getMinBet()) return List.of();
        return Bet.list(type, safeValue);
    }
}