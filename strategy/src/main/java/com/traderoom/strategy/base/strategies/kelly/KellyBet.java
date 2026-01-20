package com.traderoom.strategy.base.strategies.kelly;

import com.traderoom.strategy.enums.BetType;

public record KellyBet(BetType type, double fraction) {
    public static KellyBet of(BetType type, double fraction) {
        return new KellyBet(type, fraction);
    }
}
