package com.traderoom.strategy.model;

import com.traderoom.strategy.enums.BetType;
import lombok.Builder;

@Builder
public record BetTypePrediction(BetType type, double probability) {
    public static BetTypePrediction of(BetType type, double probability) {
        return new BetTypePrediction(type, probability);
    }
}