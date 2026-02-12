package com.traderoom.strategy.strategies.regime;

import com.traderoom.api.enums.BetType;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.config.Config;

import java.util.List;

@Strategy(tags = {Tag.PATTERN, Tag.STATISTICAL})
public class MarketRegimeStrategy extends AbstractRegimeStrategy {

    public MarketRegimeStrategy(Config config) {
        RegimeContext build = RegimeContext.builder()
                .trendThreshold(0.70)
                .volatilityLowThreshold(6.0)
                .build();
        super(config, build);
    }

    @Override
    public List<Bet> decide() {
        int size = getMarket().getHistory().size();
        if (size < historyWindow) {
            return List.of();
        }

        DoubleTriple triple = calculateMetrics(getMarket().getHistory().subList(size - historyWindow, size));
        Regime regime = determineRegime(triple.getFirst(), triple.getSecond());
        return applyTactic(regime);
    }

    private Regime determineRegime(double redRate, double volatility) {
        if (redRate >= trendThreshold) {
            return Regime.RED_TREND;
        }
        if (redRate <= (1.0 - trendThreshold)) {
            return Regime.BLACK_TREND;
        }
        if (volatility < volatilityLowThreshold) {
            return Regime.LOW_VOLATILITY;
        }
        return Regime.CHAOS;
    }

    private List<Bet> applyTactic(Regime regime) {
        return switch (regime) {
            case RED_TREND -> create(BetType.RED);
            case BLACK_TREND -> create(BetType.BLACK);
            case LOW_VOLATILITY -> {
                Spot last = getMarket().getLastSpot();
                assert last != null;
                if (last.isFirstDozen()) yield create(BetType.FIRST_DOZEN);
                if (last.isSecondDozen()) yield create(BetType.SECOND_DOZEN);
                yield create(BetType.THIRD_DOZEN);
            }
            case CHAOS, TREND, ALTERNATING, SLEEPING -> List.of();
        };
    }

    private List<Bet> create(BetType type) {
        long value = getMinBet();
        if (isLastBet() && !isLastBetWon()) {
            value = getLastBet() * 2;
        }
        long safeValue  = Math.min(Math.min(value, getVirtualBalance()), getMaxBet());
        return (safeValue < getMinBet()) ? List.of() : Bet.list(type, safeValue);
    }
}