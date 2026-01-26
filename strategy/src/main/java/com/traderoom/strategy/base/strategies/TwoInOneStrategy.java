package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.base.AbstractStrategy;

import java.util.LinkedList;
import java.util.List;

@AStrategy
public class TwoInOneStrategy extends AbstractStrategy {

    private final BetType type;
    private final LinkedList<Integer> numbers;

    public TwoInOneStrategy(Config config) {
        super(config);
        numbers = new LinkedList<>();
        type = BetType.RED;
    }

    @Override
    public List<Bet> decide(State state) {
        if (isLastBetWon(state)) {
            if (!numbers.isEmpty()) numbers.removeFirst();
            if (!numbers.isEmpty()) numbers.removeLast();
        } else if (isLastBet()) {
            numbers.addLast(numbers.size() <= 1 ? 1 : (numbers.getFirst() + numbers.getLast()));
        }
        long value = getConfig().minBet() * (numbers.size() <= 1 ? 1 : numbers.getFirst() + numbers.getLast());
        return Bet.list(type, value);
    }
}