package com.traderoom.strategy.strategies;

import com.traderoom.api.AbstractStrategy;
import com.traderoom.api.enums.BetType;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.config.Config;

import java.util.List;

@Strategy
public class OneThreeTwoSixStrategy extends AbstractStrategy {
    private final BetType type = BetType.BLACK;
    private int level;

    public OneThreeTwoSixStrategy(Config config) {
        super(config);
        level = 0;
    }

    @Override
    public List<Bet> decide() {
        if (isLastBet()) {
            if (isLastBetWon()) {
                level++;
                if (level > 3) {
                    level = 0;
                }
            } else {
                level = 0;
            }
        }

        long base = getMinBet();
        long multiplier = switch (level) {
            case 1 -> 3;
            case 2 -> 2;
            case 3 -> 6;
            default -> 1;
        };

        long amount = base * multiplier;
        amount = Math.min(amount, getVirtualBalance());

        return (amount < base) ? List.of() : Bet.list(type, amount);
    }
}