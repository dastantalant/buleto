package com.traderoom.strategy.strategies.kelly;

import com.traderoom.api.enums.BetType;

public record KellyBet(BetType type, double fraction) {
    public static KellyBet of(BetType type, double fraction) {
        return new KellyBet(type, fraction);
    }
}
