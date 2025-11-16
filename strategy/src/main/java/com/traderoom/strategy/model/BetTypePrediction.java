package com.traderoom.strategy.model;

import com.traderoom.strategy.enums.BetType;
import lombok.Builder;

@Builder
public record BetTypePrediction(BetType type, double probability) {
}