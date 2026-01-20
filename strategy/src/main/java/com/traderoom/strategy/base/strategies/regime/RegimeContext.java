package com.traderoom.strategy.base.strategies.regime;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RegimeContext {
    @Builder.Default
    private final int historyWindow = 15;
    @Builder.Default
    private final double trendThreshold = 0.70;
    @Builder.Default
    private final double volatilityLowThreshold = 6.0;
    @Builder.Default
    private final int trendStreak = 3;
    @Builder.Default
    private final int alternatingStreak = 4;

    public static RegimeContext of() {
        return RegimeContext.builder().build();
    }
}