package com.traderoom.strategy.base.strategies.regime;

import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;

import java.util.List;
import java.util.Optional;

@AStrategy
public class GameRegimeStrategy extends AbstractRegimeStrategy {

    public GameRegimeStrategy(Config config) {
        RegimeContext build = RegimeContext.builder()
                .trendStreak(3)
                .alternatingStreak(4)
                .build();
        super(config, build);
    }

    @Override
    public List<Bet> decide(State state) {
        if (state.getMarketData().getHistory().size() < alternatingStreak) {
            return List.of();
        }
        Regime currentRegime = detectRegime(state);
        return switch (currentRegime) {
            case TREND -> handleTrendRegime(state);
            case ALTERNATING -> handleAlternatingRegime(state);
            default -> List.of();
        };
    }

    private Regime detectRegime(State state) {
        List<Spot> history = state.getMarketData().getHistory();
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

    private List<Bet> handleTrendRegime(State state) {
        if (state.getMarketData().getLastSpot() == null) return List.of();
        BetType betType = state.getMarketData().getLastSpot().isRed() ? BetType.RED : BetType.BLACK;
        long betValue = isLastBetWon(state) ? getLastBet() + getConfig().minBet() : getConfig().minBet();
        return create(betType, betValue, state);
    }

    private List<Bet> handleAlternatingRegime(State state) {
        if (state.getMarketData().getLastSpot() == null) return List.of();
        BetType betType = state.getMarketData().getLastSpot().isRed() ? BetType.BLACK : BetType.RED;
        return create(betType, getConfig().minBet(), state);
    }

    private List<Bet> create(BetType type, long value, State state) {
        long safeValue = Math.min(value, getBalance());
        safeValue = Math.min(safeValue, getConfig().maxBet());
        if (safeValue < getConfig().minBet()) return List.of();
        return Bet.list(type, safeValue);
    }
}