package com.traderoom.strategy.strategies.manager;

import com.traderoom.api.IStrategy;
import com.traderoom.api.AbstractStrategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.model.Bet;
import com.traderoom.api.utils.HistoryUtil;
import com.traderoom.strategy.strategies.MeanReversionStrategy;
import com.traderoom.strategy.strategies.ParoliStrategy;
import com.traderoom.strategy.strategies.regime.AbstractRegimeStrategy;
import com.traderoom.strategy.strategies.regime.DoubleTriple;
import com.traderoom.strategy.strategies.regime.RegimeContext;

import java.util.List;

@Strategy(tags = {Tag.PATTERN, Tag.HYBRID})
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
    public List<Bet> decide() {
        var history = getState().getMarket().getHistory();
        int size = history.size();
        if (size < historyWindow) {
            return List.of();
        }
        DoubleTriple metrics = calculateMetrics(HistoryUtil.window(history, historyWindow));
        double redRate = metrics.getFirst();
        boolean isTrendRegime = (redRate >= trendThreshold) || (redRate <= (1.0 - trendThreshold));
        IStrategy activeStrategy = isTrendRegime ? trendFollowingStrategy : meanReversionStrategy;
        if (activeStrategy instanceof AbstractStrategy bs) {
            bs.setVirtualBalance(this.getVirtualBalance());
        }
        return activeStrategy.decide();
    }

    @Override
    protected void onRoundCustom(Spot outcome, List<Bet> realBets) {
        updateSubStrategy(trendFollowingStrategy, realBets, outcome);
        updateSubStrategy(meanReversionStrategy, realBets, outcome);
    }

    private void updateSubStrategy(IStrategy strategy, List<Bet> bets, Spot outcome) {
        if (strategy instanceof AbstractStrategy baseStrategy) {
            baseStrategy.setVirtualBalance(this.getVirtualBalance());
            baseStrategy.commitResult( outcome,bets);
        }
    }
}