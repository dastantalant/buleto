package com.traderoom.strategy.base.strategies.hybrid;

import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.model.SpotPrediction;

import java.util.List;

@AStrategy
public class HybridPredictorStrategy extends AbstractHybridPredictorStrategy {

    private int consecutiveLosses;

    public HybridPredictorStrategy(Config config) {
        super(config);
    }

    @Override
    public void onRoundCustom(List<Bet> betList, Spot spot, State state) {
        consecutiveLosses = isLastBet() && isLastBetWon(state) ? 0 : consecutiveLosses + 1;
    }

    @Override
    public List<Bet> decide(State state) {
        List<SpotPrediction> top = getTop(state);
        if (top.isEmpty()) return List.of();
        double budget = (consecutiveLosses >= consecutive) ? cautious : fraction;
        return process(state, top, (long) (getBalance() * budget));
    }
}