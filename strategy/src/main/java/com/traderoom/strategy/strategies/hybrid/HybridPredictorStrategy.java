package com.traderoom.strategy.strategies.hybrid;

import com.traderoom.api.enums.Spot;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.model.SpotPrediction;

import java.util.List;

@Strategy(tags = {Tag.HYBRID})
public class HybridPredictorStrategy extends AbstractHybridPredictorStrategy {

    private int consecutiveLosses;

    public HybridPredictorStrategy(Config config) {
        super(config);
    }

    @Override
    public void onRoundCustom(Spot spot, List<Bet> betList) {
        consecutiveLosses = isLastBet() && isLastBetWon() ? 0 : consecutiveLosses + 1;
    }

    @Override
    public List<Bet> decide() {
        List<SpotPrediction> top = getTop();
        if (top.isEmpty()) return List.of();
        double budget = (consecutiveLosses >= consecutive) ? cautious : fraction;
        return process( top, (long) (getVirtualBalance() * budget));
    }
}