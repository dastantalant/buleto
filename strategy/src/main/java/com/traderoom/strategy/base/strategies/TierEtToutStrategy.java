package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.base.AbstractStrategy;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;

import java.util.List;

@AStrategy
public class TierEtToutStrategy extends AbstractStrategy {
    private long bankroll;
    private boolean stageTwo;

    public TierEtToutStrategy(Config config) {
        super(config);
        this.bankroll = config.startBalance();
        this.stageTwo = false;
    }

    @Override
    public List<Bet> decide(State state) {
        if (isLastBet()) {
            if (isLastBetWon(state)) {
                bankroll = getBalance();
                stageTwo = false;
            } else {
                if (!stageTwo) {
                    stageTwo = true;
                } else {
                    bankroll = getBalance();
                    stageTwo = false;
                }
            }
        }

        long betValue;
        long part1 = (long) Math.floor(bankroll / 3.0);

        if (!stageTwo) {
            betValue = part1;
        } else {
            betValue = bankroll - part1;
        }

        if (betValue < getConfig().minBet()) return List.of();

        return Bet.list(BetType.BLACK, betValue);
    }
}