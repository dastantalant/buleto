package com.traderoom.api.model;

import com.traderoom.api.enums.BetType;

public record BetTypePrediction(BetType type, double probability) {
    public static BetTypePrediction of(BetType type, double probability) {
        return new BetTypePrediction(type, probability);
    }
}