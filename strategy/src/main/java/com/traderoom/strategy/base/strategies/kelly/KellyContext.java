package com.traderoom.strategy.base.strategies.kelly;

import com.traderoom.strategy.predictor.Predictor;
import com.traderoom.strategy.predictor.MultiOrderMarkovPredictor;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class KellyContext {
    @Builder.Default
    private final double kelly = 0.3;
    @Builder.Default
    private final double maxBetPercentageCap = 0.05;
    @Builder.Default
    private final double minProbabilityThreshold = 0.028;
    @Builder.Default
    private final Predictor predictor = new MultiOrderMarkovPredictor();

    public static KellyContext of() {
        return KellyContext.builder().build();
    }
}
