package com.traderoom.strategy.model;

import com.traderoom.strategy.enums.Spot;
import lombok.Builder;

@Builder
public record SpotPrediction(Spot spot, double probability) {
}