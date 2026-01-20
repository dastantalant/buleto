package com.traderoom.strategy.base.strategies.regime;

import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;

import java.util.List;

@AStrategy
public class MarketRegimeStrategy extends AbstractRegimeStrategy {

    public MarketRegimeStrategy(Config config) {
        RegimeContext build = RegimeContext.builder()
                .trendThreshold(0.70)
                .volatilityLowThreshold(6.0)
                .build();
        super(config, build);
    }

    @Override
    public List<Bet> decide(State state) {
        int size = state.getMarketData().getHistory().size();
        if (size < historyWindow) {
            return List.of();
        }

        DoubleTriple triple = calculateMetrics(state.getMarketData().getHistory().subList(size - historyWindow, size));
        Regime regime = determineRegime(triple.getFirst(), triple.getSecond());
        return applyTactic(regime, state);
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

    private List<Bet> applyTactic(Regime regime, State state) {
        return switch (regime) {
            case RED_TREND -> create(BetType.RED, state);
            case BLACK_TREND -> create(BetType.BLACK, state);
            case LOW_VOLATILITY -> {
                Spot last = state.getMarketData().getLastSpot();
                assert last != null;
                if (last.isFirstDozen()) yield create(BetType.FIRST_DOZEN, state);
                if (last.isSecondDozen()) yield create(BetType.SECOND_DOZEN, state);
                yield create(BetType.THIRD_DOZEN, state);
            }
            case CHAOS, TREND, ALTERNATING, SLEEPING -> List.of();
        };
    }

    private List<Bet> create(BetType type, State state) {
        long value = getConfig().minBet();
        if (isLastBet() && !isLastBetWon(state)) {
            value = getLastBet() * 2;
        }
        long safeValue  = Math.min(Math.min(value, getBalance()), getConfig().maxBet());
        return (safeValue < getConfig().minBet()) ? List.of() : Bet.list(type, safeValue);
    }
}