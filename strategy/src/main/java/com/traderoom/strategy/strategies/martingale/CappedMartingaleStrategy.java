package com.traderoom.strategy.strategies.martingale;

import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.config.Config;

import java.util.List;

@Strategy(tags = {Tag.PROGRESSIVE})
public class CappedMartingaleStrategy extends AbstractMartingaleStrategy {

    private final int maxLossStreak;
    private int lossStreak;

    public CappedMartingaleStrategy(Config config) {
        maxLossStreak = 5;
        lossStreak = 0;
        super(config);
    }

    @Override
    public List<Bet> decide() {
        if (isLastBet()) {
            lossStreak = isLastBetWon() ? 0 : lossStreak + 1;
        }
        if (lossStreak >= maxLossStreak || !isLastBet() || isLastBetWon()) {
            lossStreak = (lossStreak >= maxLossStreak) ? 0 : lossStreak;
        }
        return create();
    }
}