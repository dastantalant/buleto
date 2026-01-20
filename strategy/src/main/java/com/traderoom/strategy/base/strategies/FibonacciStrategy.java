package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.base.AbstractStrategy;
import com.traderoom.strategy.utils.BettingHelper;

import java.util.List;

@AStrategy
public class FibonacciStrategy extends AbstractStrategy {

    private long prev;
    private long current;

    public FibonacciStrategy(Config config) {
        super(config);
        resetSequence();
    }

    @Override
    public List<Bet> decide(State state) {
        if (isLastBet()) {
            if (isLastBetWon(state)) {
                long newPrev = Math.max(0, prev - (current - prev));
                long newCurrent = prev;
                prev = newPrev;
                current = newCurrent;
                if (current <= 0) {
                    resetSequence();
                }
            } else {
                long newCurrent = prev + current;
                prev = current;
                current = newCurrent;
            }
        }

        long betMultiplier = current > 0 ? current : 1;
        long totalBetAmount = getConfig().minBet() * betMultiplier;
        long safeBetAmount = Math.min(totalBetAmount, getBalance());

        if (safeBetAmount < getConfig().minBet()) {
            return List.of();
        }
        return BettingHelper.createDiversifiedBets(safeBetAmount, state, getConfig());
    }

    private void resetSequence() {
        prev = 0;
        current = 1;
    }
}