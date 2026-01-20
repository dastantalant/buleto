package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.base.AbstractStrategy;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;

import java.util.LinkedList;
import java.util.List;

@AStrategy
public class LabouchereStrategy extends AbstractStrategy {
    private final BetType type = BetType.RED;
    private final LinkedList<Long> sequence = new LinkedList<>();
    private final long unit;

    public LabouchereStrategy(Config config) {
        super(config);
        this.unit = Math.max(1, config.minBet());
        resetSequence();
    }

    private void resetSequence() {
        sequence.clear();
        sequence.add(unit);
        sequence.add(unit * 2);
        sequence.add(unit * 3);
        sequence.add(unit * 4);
    }

    @Override
    public List<Bet> decide(State state) {
        if (isLastBet()) {
            if (isLastBetWon(state)) {
                if (!sequence.isEmpty()) sequence.removeFirst();
                if (!sequence.isEmpty()) sequence.removeLast();
            } else {
                long lostValue = getLastBet();
                sequence.addLast(lostValue);
            }
        }

        if (sequence.isEmpty()) {
            resetSequence();
        }

        long betValue;
        if (sequence.size() == 1) {
            betValue = sequence.getFirst();
        } else {
            betValue = sequence.getFirst() + sequence.getLast();
        }

        betValue = Math.min(betValue, getConfig().maxBet());
        betValue = Math.min(betValue, getBalance());

        return (betValue < getConfig().minBet()) ? List.of() : Bet.list(type, betValue);
    }
}