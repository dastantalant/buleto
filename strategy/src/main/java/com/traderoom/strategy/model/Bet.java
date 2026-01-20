package com.traderoom.strategy.model;

import com.traderoom.strategy.enums.BetType;

import lombok.Builder;

import java.util.List;

@Builder
public record Bet(BetType type, long value) {

    public static List<Bet> list(BetType type, long value) {
        return List.of(Bet.builder().type(type).value(value).build());
    }

    public static Bet of(BetType type, long value) {
        return Bet.builder().type(type).value(value).build();
    }
}