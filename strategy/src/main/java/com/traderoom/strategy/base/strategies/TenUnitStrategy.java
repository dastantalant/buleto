package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.base.AbstractStrategy;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.List;

@AStrategy
public class TenUnitStrategy extends AbstractStrategy {

    private final BetType type;
    private final int count;
    private final double fraction;
    private final int multiplayer;

    private final Deque<Integer> numbers;
    private long setStartBalance;
    private long limitValue;
    private boolean useLastBetLeftNumber;
    private boolean useLastBetAllLimit;
    private int lastBetMultiplier;
    private int lastRemainingLimitMultiplier;

    public TenUnitStrategy(Config config) {
        super(config);
        type = BetType.RED;
        count = 10;
        fraction = 0.1;
        multiplayer = 1;
        numbers = new ArrayDeque<>(count);
        setStartBalance = Math.max(getBalance(), config.startBalance());
        limitValue = (long) (setStartBalance * fraction);
    }

    @Override
    public List<Bet> decide(State state) {
        if (getRemainingLimit() <= 0) {
            initializeSet(state);
        }

        if (isLastBetWon(state)) {
            if (!useLastBetLeftNumber && !useLastBetAllLimit) {
                if (!numbers.isEmpty()) numbers.removeFirst();
                if (!numbers.isEmpty()) numbers.removeLast();
            } else if (useLastBetAllLimit) {
                if (!numbers.isEmpty()) numbers.removeFirst();
                numbers.addFirst(lastBetMultiplier);
            }
        } else if (isLastBet()) {
            if (useLastBetAllLimit) {
                numbers.clear();
            } else if (useLastBetLeftNumber) {
                if (!numbers.isEmpty()) numbers.removeFirst();
                numbers.addFirst(lastRemainingLimitMultiplier);
            } else {
                numbers.addLast(lastBetMultiplier);
            }
        }

        if (numbers.isEmpty()) {
            for (int i = 0; i < count; i++) {
                numbers.addLast(multiplayer);
            }
            initializeSet(state);
        }

        int multi = numbers.getFirst() + numbers.getLast();
        lastRemainingLimitMultiplier = (int) (getRemainingLimit() / getConfig().minBet());
        if (getRemainingLimit() < getConfig().minBet() * multi) {
            if (getConfig().minBet() * numbers.getFirst() < getRemainingLimit()) {
                multi = numbers.getFirst();
                useLastBetLeftNumber = true;
            } else {
                multi = lastRemainingLimitMultiplier;
                useLastBetAllLimit = true;
            }
        }

        lastBetMultiplier = Math.max(multi, 1);
        return Bet.list(type, getConfig().minBet() * lastBetMultiplier);
    }

    private void initializeSet(State state) {
        setStartBalance = Math.max(getBalance(), getConfig().startBalance());
        limitValue = (long) (setStartBalance * fraction);
    }

    private long getRemainingLimit() {
        return limitValue - (setStartBalance - getBalance());
    }
}