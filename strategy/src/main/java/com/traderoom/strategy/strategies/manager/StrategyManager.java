package com.traderoom.strategy.strategies.manager;

import com.traderoom.api.IStrategy;
import com.traderoom.api.AbstractStrategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.model.Bet;
import com.traderoom.strategy.strategies.MeanReversionStrategy;
import com.traderoom.strategy.strategies.hybrid.HybridPredictorStrategy;
import com.traderoom.strategy.strategies.kelly.KellyCriterionStrategy;
import com.traderoom.strategy.strategies.volatility.AdaptiveVolatilityStrategy;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Strategy(tags = Tag.MANAGER)
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
    public List<Bet> decide() {
        if (currentChampion == null) return List.of();
        roundsUntilReevaluation--;
        if (roundsUntilReevaluation <= 0) {
            reevaluateChampion();
            roundsUntilReevaluation = REEVALUATION_PERIOD;
        }

        pendingVirtualBets.clear();
        for (IStrategy strategy : portfolio) {
            if (strategy instanceof AbstractStrategy bs) {
                bs.setVirtualBalance(this.getVirtualBalance());
            }
            pendingVirtualBets.put(strategy, strategy.decide());
        }

        List<Bet> championBets = pendingVirtualBets.getOrDefault(currentChampion, List.of());
        setLastBets(championBets);
        return championBets;
    }

    @Override
    public void onRoundCustom(Spot spot, List<Bet> realBets) {
        for (IStrategy strategy : portfolio) {
            List<Bet> virtualBets = pendingVirtualBets.getOrDefault(strategy, List.of());
            strategy.commitResult(spot, virtualBets);
        }
    }

    private void reevaluateChampion() {
        portfolio.stream()
                .max(Comparator.comparingLong(IStrategy::getVirtualBalance))
                .ifPresent(strategy -> {
                    if (strategy != currentChampion && strategy instanceof AbstractStrategy) {
                        currentChampion = strategy;
                    }
                });
    }
}