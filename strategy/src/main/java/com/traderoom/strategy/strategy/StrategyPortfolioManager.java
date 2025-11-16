package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.application.ModelProvider;
import com.traderoom.strategy.application.StrategyFactory;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.Bet;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Мета-стратегия, управляющая портфелем других стратегий.
 * Теперь она использует ModelProvider для корректной инициализации дочерних ИИ-стратегий.
 */
public class StrategyPortfolioManager extends BaseStrategy {

    private static final int REEVALUATION_PERIOD = 25;

    private final List<Strategy> portfolio;
    private Strategy currentChampion;
    private long roundsUntilReevaluation;

    public StrategyPortfolioManager(Context context, ModelProvider modelProvider) {
        super(context);
        this.portfolio = initializePortfolio(context, modelProvider);
        this.currentChampion = portfolio.isEmpty() ? null : portfolio.getFirst();
        this.roundsUntilReevaluation = REEVALUATION_PERIOD;
    }

    @Override
    public String getName() {
        return "StrategyPortfolioManager";
    }

    private List<Strategy> initializePortfolio(Context context, ModelProvider modelProvider) {
        List<String> portfolioStrategyNames = List.of(
                "HybridPredictorStrategy",
                "MeanReversionStrategy",
                "KellyCriterionStrategy",
                "AdaptiveVolatilityStrategy"
        );

        return portfolioStrategyNames.stream()
                .map(name -> StrategyFactory.load(name, context, modelProvider))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();
    }

    @Override
    public void updateStrategyParameter(List<Bet> betList, Spot spot, Context context) {
        long realBalanceBeforeUpdate = getCurBalance();

        super.updateStrategyParameter(betList, spot, context);
        long realBalanceAfterUpdate = getCurBalance();

        if (currentChampion != null) {
            ((BaseStrategy) currentChampion).setCurBalance(getCurBalance());
        }

        for (Strategy strategy : portfolio) {
            if (strategy == currentChampion) {
                continue;
            }

            List<Bet> virtualBets = ((BaseStrategy) strategy).getNextInternal(context);
            strategy.updateStrategyParameter(virtualBets, spot, context);
        }
    }


    @Override
    protected List<Bet> getNextInternal(Context context) {
        if (currentChampion == null) {
            return List.of();
        }

        roundsUntilReevaluation--;
        if (roundsUntilReevaluation <= 0) {
            reevaluateChampion();
            roundsUntilReevaluation = REEVALUATION_PERIOD;
        }

        ((BaseStrategy) currentChampion).setCurBalance(this.getCurBalance());
        List<Bet> bets = ((BaseStrategy) currentChampion).getNextInternal(context);

        this.lastBets = bets;

        return bets;
    }

    private void reevaluateChampion() {
        Optional<Strategy> newChampionOpt = portfolio.stream()
                .max(Comparator.comparingLong(Strategy::getCurBalance));

        newChampionOpt.ifPresent(newChampion -> {
            if (newChampion != currentChampion) {
                this.currentChampion = newChampion;
                ((BaseStrategy) this.currentChampion).setCurBalance(this.getCurBalance());
            }
        });
    }
}