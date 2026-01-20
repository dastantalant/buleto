package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.base.AbstractStrategy;

import java.util.LinkedList;
import java.util.List;

@AStrategy
public class MonteCarloStrategy extends AbstractStrategy {

    private final BetType type;
    private final LinkedList<Integer> numbers;

    public MonteCarloStrategy(Config config) {
        super(config);
        numbers = new LinkedList<>();
        type = BetType.FIRST_DOZEN;
    }

    @Override
    public List<Bet> decide(State state) {
        if (numbers.isEmpty()) {
            numbers.addLast(1);
            numbers.addLast(2);
            numbers.addLast(3);
        }
        int multiplier = numbers.getFirst() + numbers.getLast();
        if (isLastBetWon(state)) {
            for (int i = 0; i < 2; i++) {
                if (!numbers.isEmpty()) {
                    numbers.removeFirst();
                }
            }
            for (int i = 0; i < 2; i++) {
                if (!numbers.isEmpty()) {
                    numbers.removeLast();
                }
            }
        } else if (isLastBet()) {
            numbers.addLast(multiplier);
        }

        if (numbers.size() <= 1) {
            numbers.clear();
            numbers.addLast(1);
            numbers.addLast(2);
            numbers.addLast(3);
        }
        return Bet.list(type, getConfig().minBet() * multiplier);
    }
}