package com.traderoom.strategy.base.strategies.martingale;

import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;

import java.util.List;

@AStrategy
public class CappedMartingaleStrategy extends AbstractMartingaleStrategy {

    private final int maxLossStreak;
    private int lossStreak;

    public CappedMartingaleStrategy(Config config) {
        maxLossStreak = 5;
        lossStreak = 0;
        super(config);
    }

    @Override
    public List<Bet> decide(State state) {
        if (isLastBet()) {
            lossStreak = isLastBetWon(state) ? 0 : lossStreak + 1;
        }
        if (lossStreak >= maxLossStreak || !isLastBet() || isLastBetWon(state)) {
            lossStreak = (lossStreak >= maxLossStreak) ? 0 : lossStreak;
        }
        return create(state);
    }
}