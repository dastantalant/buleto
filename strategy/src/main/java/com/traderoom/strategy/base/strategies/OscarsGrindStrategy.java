package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.base.AbstractStrategy;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;

import java.util.List;

@AStrategy
public class OscarsGrindStrategy extends AbstractStrategy {
    private final BetType type = BetType.RED;
    private long currentUnit;
    private long cycleTargetBalance;

    public OscarsGrindStrategy(Config config) {
        super(config);
        resetCycle(config.startBalance());
    }

    private void resetCycle(long currentBalance) {
        currentUnit = getConfig().minBet();
        cycleTargetBalance = currentBalance + currentUnit;
    }

    @Override
    public List<Bet> decide(State state) {
        long balance = getBalance();

        if (isLastBet()) {
            if (balance >= cycleTargetBalance) {
                resetCycle(balance);
            } else {
                if (isLastBetWon(state)) {
                    long debt = cycleTargetBalance - balance;
                    currentUnit = Math.min(getLastBet() + getConfig().minBet(), debt + getConfig().minBet());
                    long nextPotential = getLastBet() + getConfig().minBet();
                    long neededToClose = cycleTargetBalance - balance;
                    currentUnit = Math.min(nextPotential, neededToClose);
                } else {
                    currentUnit = getLastBet();
                }
            }
        } else {
            resetCycle(balance);
        }
        currentUnit = Math.clamp(currentUnit, getConfig().minBet(), getConfig().maxBet());
        currentUnit = Math.min(currentUnit, balance);

        return (currentUnit < getConfig().minBet()) ? List.of() : Bet.list(type, currentUnit);
    }
}
