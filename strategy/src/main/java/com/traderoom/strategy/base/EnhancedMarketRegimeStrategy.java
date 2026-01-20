package com.traderoom.strategy.base;

import com.traderoom.strategy.api.IStrategy;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.base.strategies.MeanReversionStrategy;
import com.traderoom.strategy.base.strategies.ParoliStrategy;
import com.traderoom.strategy.base.strategies.regime.AbstractRegimeStrategy;
import com.traderoom.strategy.base.strategies.regime.DoubleTriple;
import com.traderoom.strategy.base.strategies.regime.RegimeContext;

import java.util.List;

@AStrategy
public class EnhancedMarketRegimeStrategy extends AbstractRegimeStrategy {

    private final IStrategy trendFollowingStrategy;
    private final IStrategy meanReversionStrategy;

    public EnhancedMarketRegimeStrategy(Config config) {
        super(config, RegimeContext.builder()
                .trendThreshold(0.65)
                .volatilityLowThreshold(6.0)
                .build());

        trendFollowingStrategy = new ParoliStrategy(config);
        meanReversionStrategy = new MeanReversionStrategy(config);
    }

    @Override
    public List<Bet> decide(State state) {
        var history = state.getMarketData().getHistory();
        int size = history.size();
        if (size < historyWindow) {
            return List.of();
        }
        DoubleTriple metrics = calculateMetrics(history.subList(size - historyWindow, size));
        double redRate = metrics.getFirst();
        boolean isTrendRegime = (redRate >= trendThreshold) || (redRate <= (1.0 - trendThreshold));
        IStrategy activeStrategy = isTrendRegime ? trendFollowingStrategy : meanReversionStrategy;
        if (activeStrategy instanceof AbstractStrategy bs) {
            bs.setBalance(this.getBalance());
        }
        return ((AbstractStrategy) activeStrategy).decide(state);
    }

    @Override
    protected void onRoundCustom(List<Bet> realBets, Spot outcome, State state) {
        updateSubStrategy(trendFollowingStrategy, realBets, outcome, state);
        updateSubStrategy(meanReversionStrategy, realBets, outcome, state);
    }

    private void updateSubStrategy(IStrategy strategy, List<Bet> bets, Spot outcome, State state) {
        if (strategy instanceof AbstractStrategy baseStrategy) {
            baseStrategy.setBalance(this.getBalance());
            baseStrategy.onRoundEnd(bets, outcome, state);
        }
    }
}