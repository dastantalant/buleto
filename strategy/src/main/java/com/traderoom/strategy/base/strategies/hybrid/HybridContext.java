package com.traderoom.strategy.base.strategies.hybrid;

import com.traderoom.strategy.predictor.Predictor;
import com.traderoom.strategy.predictor.EfficientCountPredictor;
import com.traderoom.strategy.predictor.MultiOrderMarkovPredictor;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class HybridContext {
    @Builder.Default
    private final Predictor predictorMarkov = new MultiOrderMarkovPredictor();
    @Builder.Default
    private final Predictor predictorCount = new EfficientCountPredictor();
    @Builder.Default
    private final double markov = 0.3;
    @Builder.Default
    private final double count = 0.2;
    @Builder.Default
    private final int limit = 4;
    @Builder.Default
    private final double confidence = 0.08;
    @Builder.Default
    private final double fraction = 0.05;
    @Builder.Default
    private final int window = 50;
    @Builder.Default
    private final double lowWinRate = 0.45;
    @Builder.Default
    private final double highWinRate = 0.60;
    @Builder.Default
    private final int consecutive = 3;
    @Builder.Default
    private final double cautious = 0.025;

    public static HybridContext of() {
        return HybridContext.builder().build();
    }
}
