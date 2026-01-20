package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.base.AbstractStrategy;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;

import java.util.List;

@AStrategy
public class OneThreeTwoSixStrategy extends AbstractStrategy {
    private final BetType type = BetType.BLACK;
    private int level;

    public OneThreeTwoSixStrategy(Config config) {
        super(config);
        level = 0;
    }

    @Override
    public List<Bet> decide(State state) {
        if (isLastBet()) {
            if (isLastBetWon(state)) {
                level++;
                if (level > 3) {
                    level = 0;
                }
            } else {
                level = 0;
            }
        }

        long base = getConfig().minBet();
        long multiplier = switch (level) {
            case 1 -> 3;
            case 2 -> 2;
            case 3 -> 6;
            default -> 1;
        };

        long amount = base * multiplier;
        amount = Math.min(amount, getBalance());

        return (amount < base) ? List.of() : Bet.list(type, amount);
    }
}