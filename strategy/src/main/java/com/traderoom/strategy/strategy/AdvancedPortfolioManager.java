package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.application.ModelProvider;
import com.traderoom.strategy.application.StrategyFactory;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.Bet;

import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class AdvancedPortfolioManager extends BaseStrategy {

    private static final int REEVALUATION_PERIOD = 25;

    private final List<Strategy> portfolio;
    private Strategy currentChampion;
    private long roundsUntilReevaluation;

    private final Map<Strategy, LinkedList<Double>> returnHistories;

    public AdvancedPortfolioManager(Context context, ModelProvider modelProvider) {
        super(context);
        this.portfolio = initializePortfolio(context, modelProvider);
        this.currentChampion = portfolio.isEmpty() ? null : portfolio.getFirst();
        this.roundsUntilReevaluation = REEVALUATION_PERIOD;

        this.returnHistories = new HashMap<>();
        for (Strategy s : portfolio) {
            returnHistories.put(s, new LinkedList<>());
        }
    }

    @Override
    public String getName() {
        return AdvancedPortfolioManager.class.getSimpleName();
    }

    private List<Strategy> initializePortfolio(Context context, ModelProvider modelProvider) {
        List<String> portfolioStrategyNames = List.of(
                "HybridPredictorStrategy",
                "MeanReversionStrategy",
                "KellyCriterionStrategy",
                "AdaptiveVolatilityStrategy",
                "HotNumbersStrategy",
                "ParoliStrategy"
        );

        return portfolioStrategyNames.stream()
                .map(name -> StrategyFactory.load(name, context, modelProvider))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();
    }

    @Override
    public void updateStrategyParameter(List<Bet> betList, Spot spot, Context context) {
        super.updateStrategyParameter(betList, spot, context);

        for (Strategy strategy : portfolio) {
            long balanceBefore = strategy.getCurBalance();

            List<Bet> virtualBets = (strategy == currentChampion)
                    ? betList
                    : ((BaseStrategy) strategy).getNextInternal(context);

            strategy.updateStrategyParameter(virtualBets, spot, context);

            long balanceAfter = strategy.getCurBalance();

            double dailyReturn = (balanceBefore == 0) ? 0.0 : (double) (balanceAfter - balanceBefore) / balanceBefore;
            LinkedList<Double> history = returnHistories.get(strategy);
            history.add(dailyReturn);
            if (history.size() > REEVALUATION_PERIOD) {
                history.removeFirst();
            }
        }
    }


    @Override
    protected List<Bet> getNextInternal(Context context) {
        if (currentChampion == null) {
            return List.of();
        }
        roundsUntilReevaluation--;
        if (roundsUntilReevaluation <= 0) {
            reevaluateChampionBySharpeRatio();
            roundsUntilReevaluation = REEVALUATION_PERIOD;
        }
        ((BaseStrategy) currentChampion).setCurBalance(getCurBalance());
        List<Bet> bets = ((BaseStrategy) currentChampion).getNextInternal(context);
        lastBets = bets;
        return bets;
    }

    private void reevaluateChampionBySharpeRatio() {
        Optional<Strategy> newChampionOpt = portfolio.stream()
                .max(Comparator.comparingDouble(this::calculateSharpeRatio));

        newChampionOpt.ifPresent(newChampion -> {
            if (newChampion != currentChampion) {
                this.currentChampion = newChampion;
            }
        });
    }

    private double calculateSharpeRatio(Strategy strategy) {
        LinkedList<Double> returns = returnHistories.get(strategy);
        if (returns == null || returns.size() < 2) {
            return -Double.MAX_VALUE;
        }
        double meanReturn = returns.stream().mapToDouble(d -> d).average().orElse(0.0);
        double standardDeviation = Math.sqrt(
                returns.stream()
                        .mapToDouble(r -> Math.pow(r - meanReturn, 2))
                        .average().orElse(0.0)
        );
        if (standardDeviation == 0) {
            return (meanReturn > 0) ? Double.MAX_VALUE : 0;
        }
        return meanReturn / standardDeviation;
    }
}