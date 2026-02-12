package com.traderoom.strategy.strategies;

import com.traderoom.api.enums.BetType;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.AbstractStrategy;

import java.util.LinkedList;
import java.util.List;

@Strategy
public class MonteCarloStrategy extends AbstractStrategy {

    private final BetType type;
    private final LinkedList<Integer> numbers;

    public MonteCarloStrategy(Config config) {
        super(config);
        numbers = new LinkedList<>();
        type = BetType.FIRST_DOZEN;
    }

    @Override
    public List<Bet> decide() {
        if (numbers.isEmpty()) {
            numbers.addLast(1);
            numbers.addLast(2);
            numbers.addLast(3);
        }
        int multiplier = numbers.getFirst() + numbers.getLast();
        if (isLastBetWon()) {
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
        return Bet.list(type, getMinBet() * multiplier);
    }
}