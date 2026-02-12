package com.traderoom.strategy.strategies;

import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.enums.BetType;
import com.traderoom.api.model.Bet;
import com.traderoom.api.AbstractStrategy;

import java.util.Deque;
import java.util.LinkedList;
import java.util.List;

@Strategy(tags = {Tag.PROGRESSIVE})
public class TwoInOneStrategy extends AbstractStrategy {

    private final BetType type;
    private final Deque<Integer> numbers;

    public TwoInOneStrategy(Config config) {
        super(config);
        numbers = new LinkedList<>();
        type = BetType.RED;
    }

    @Override
    public List<Bet> decide() {
        if (isLastBetWon()) {
            if (!numbers.isEmpty()) numbers.removeFirst();
            if (!numbers.isEmpty()) numbers.removeLast();
        } else if (isLastBet()) {
            numbers.addLast(numbers.size() <= 1 ? 1 : (numbers.getFirst() + numbers.getLast()));
        }
        long value = getMinBet() * (numbers.size() <= 1 ? 1 : numbers.getFirst() + numbers.getLast());
        return Bet.list(type, value);
    }
}