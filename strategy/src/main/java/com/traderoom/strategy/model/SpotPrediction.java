package com.traderoom.strategy.model;

import com.traderoom.strategy.enums.Spot;

import lombok.Builder;

import java.util.List;

@Builder
public record SpotPrediction(Spot spot, double probability) {
    public static SpotPrediction of(Spot spot, double probability) {
        return new SpotPrediction(spot, probability);
    }

    public static List<SpotPrediction> of(Spot spot1, double probability1, Spot spot2, double probability2) {
        return List.of(new SpotPrediction(spot1, probability1), new SpotPrediction(spot2, probability2));
    }
}