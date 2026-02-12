package com.traderoom.api.model;

import com.traderoom.api.enums.BetType;

import java.util.List;

public record Bet(BetType type, long value) {

    public static List<Bet> list(BetType type, long value) {
        return List.of(new Bet(type, value));
    }

    public static Bet of(BetType type, long value) {
        return new Bet(type, value);
    }
}