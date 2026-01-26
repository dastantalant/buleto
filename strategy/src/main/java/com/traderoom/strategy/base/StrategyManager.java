package com.traderoom.strategy.base;

import com.traderoom.strategy.IStrategy;
import com.traderoom.strategy.enums.Tag;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.base.strategies.MeanReversionStrategy;
import com.traderoom.strategy.base.strategies.hybrid.HybridPredictorStrategy;
import com.traderoom.strategy.base.strategies.kelly.KellyCriterionStrategy;
import com.traderoom.strategy.base.strategies.volatility.AdaptiveVolatilityStrategy;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@AStrategy(tags = Tag.MANAGER)
public class StrategyManager extends BaseManager {

    private IStrategy currentChampion;
    private long roundsUntilReevaluation;

    private final Map<IStrategy, List<Bet>> pendingVirtualBets = new HashMap<>();

    public StrategyManager(Config config) {
        super(config);
        List<IStrategy> portfolio = List.of(new HybridPredictorStrategy(config),
                new MeanReversionStrategy(config),
                new KellyCriterionStrategy(config),
                new AdaptiveVolatilityStrategy(config));

        currentChampion = portfolio.getFirst();
        roundsUntilReevaluation = REEVALUATION_PERIOD;
        add(portfolio);
    }

    @Override
    public List<Bet> decide(State state) {
        if (currentChampion == null) return List.of();
        roundsUntilReevaluation--;
        if (roundsUntilReevaluation <= 0) {
            reevaluateChampion();
            roundsUntilReevaluation = REEVALUATION_PERIOD;
        }

        pendingVirtualBets.clear();
        for (IStrategy strategy : portfolio) {
            if (strategy instanceof AbstractStrategy bs) {
                bs.setBalance(this.getBalance());
            }
            pendingVirtualBets.put(strategy, ((AbstractStrategy) strategy).decide(state));
        }

        List<Bet> championBets = pendingVirtualBets.getOrDefault(currentChampion, List.of());
        setLastBets(championBets);
        return championBets;
    }

    @Override
    public void onRoundCustom(List<Bet> realBets, Spot spot, State state) {
        for (IStrategy strategy : portfolio) {
            List<Bet> virtualBets = pendingVirtualBets.getOrDefault(strategy, List.of());
            ((AbstractStrategy) strategy).onRoundEnd(virtualBets, spot, state);
        }
    }

    private void reevaluateChampion() {
        portfolio.stream()
                .max(Comparator.comparingLong(IStrategy::getBalance))
                .ifPresent(strategy -> {
                    if (strategy != currentChampion && strategy instanceof AbstractStrategy) {
                        currentChampion = strategy;
                    }
                });
    }
}