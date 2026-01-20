package com.traderoom.strategy.base;

import com.traderoom.strategy.api.IStrategy;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.base.strategies.HotNumbersStrategy;
import com.traderoom.strategy.base.strategies.MeanReversionStrategy;
import com.traderoom.strategy.base.strategies.ParoliStrategy;
import com.traderoom.strategy.base.strategies.hybrid.HybridPredictorStrategy;
import com.traderoom.strategy.base.strategies.kelly.KellyCriterionStrategy;
import com.traderoom.strategy.base.strategies.volatility.AdaptiveVolatilityStrategy;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Stream;

@AStrategy
public class AdvancedManager extends BaseManager {

    private IStrategy currentChampion;
    private long roundsUntilReevaluation;

    private final Map<IStrategy, LinkedList<Double>> returnHistories;

    private final Map<IStrategy, List<Bet>> pendingVirtualBets;

    public AdvancedManager(Config config) {
        super(config);
        List<IStrategy> portfolioList = Stream.of(
                        HybridPredictorStrategy.class,
                        MeanReversionStrategy.class,
                        KellyCriterionStrategy.class,
                        AdaptiveVolatilityStrategy.class,
                        HotNumbersStrategy.class,
                        ParoliStrategy.class)
                .map(clazz -> super.create(clazz, config))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();

        add(new ArrayList<>(portfolioList));

        currentChampion = portfolioList.isEmpty() ? null : portfolioList.getFirst();
        roundsUntilReevaluation = REEVALUATION_PERIOD;

        returnHistories = new HashMap<>();
        pendingVirtualBets = new HashMap<>();

        portfolioList.forEach(strategy -> returnHistories.put(strategy, new LinkedList<>()));
    }

    @Override
    public List<Bet> decide(State state) {
        if (currentChampion == null) {
            return List.of();
        }
        roundsUntilReevaluation--;
        if (roundsUntilReevaluation <= 0) {
            reevaluateChampionBySharpeRatio();
            roundsUntilReevaluation = REEVALUATION_PERIOD;
        }

        pendingVirtualBets.clear();
        for (IStrategy strategy : portfolio) {
            if (strategy == currentChampion) {
                ((AbstractStrategy) strategy).setBalance(this.getBalance());
            }
            List<Bet> bets = ((AbstractStrategy) strategy).decide(state);
            pendingVirtualBets.put(strategy, bets);
        }

        List<Bet> championBets = pendingVirtualBets.getOrDefault(currentChampion, List.of());
        setLastBets(championBets);
        return championBets;
    }

    @Override
    public void onRoundCustom(List<Bet> betList, Spot spot, State state) {
        for (IStrategy strategy : portfolio) {
            long balanceBefore = strategy.getBalance();
            List<Bet> virtualBets = pendingVirtualBets.getOrDefault(strategy, List.of());
            ((AbstractStrategy) strategy).onRoundEnd(virtualBets, spot, state);
            long balanceAfter = strategy.getBalance();
            double dailyReturn = (balanceBefore == 0) ? 0.0 : (double) (balanceAfter - balanceBefore) / balanceBefore;
            LinkedList<Double> history = returnHistories.get(strategy);
            if (history != null) {
                history.add(dailyReturn);
                if (history.size() > REEVALUATION_PERIOD) {
                    history.removeFirst();
                }
            }
        }
    }

    private void reevaluateChampionBySharpeRatio() {
        Optional<IStrategy> newChampionOpt = portfolio.stream()
                .max(Comparator.comparingDouble(this::calculateSharpeRatio));

        newChampionOpt.ifPresent(strategy -> {
            if (strategy != currentChampion) {
                currentChampion = strategy;
            }
        });
    }

    private double calculateSharpeRatio(IStrategy strategy) {
        LinkedList<Double> returns = returnHistories.get(strategy);
        if (returns == null || returns.size() < 2) {
            return -Double.MAX_VALUE;
        }
        double meanReturn = returns.stream().mapToDouble(d -> d).average().orElse(0.0);
        double standardDeviation = Math.sqrt(
                returns.stream()
                        .mapToDouble(r -> Math.pow(r - meanReturn, 2))
                        .average().orElse(0.0));
        if (standardDeviation == 0) {
            return (meanReturn > 0) ? Double.MAX_VALUE : 0;
        }
        return meanReturn / standardDeviation;
    }
}