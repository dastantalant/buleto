package com.traderoom.strategy.model;

import com.traderoom.strategy.enums.BetType;
import lombok.Builder;

@Builder
public record Bet(BetType type, long value) {
}