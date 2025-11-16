package com.traderoom.strategy.model;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.RouletteType;
import com.traderoom.strategy.enums.SpotGenerateType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record ContextModel(
        @NotNull(message = "Roulette type must not be null")
        RouletteType rouletteType,

        @NotNull(message = "Spot generate type must not be null")
        SpotGenerateType spotGenerateType,

        @Min(value = 1000, message = "Start must be at least 1000")
        long start,

        @Min(value = 1, message = "Min must be at least 1")
        long min,

        @Min(value = 1, message = "Max must be at least 1")
        long max,

        @Min(value = 1, message = "Total round bet limit must be at least 1")
        long totalRoundBetLimit,

        @Min(value = 0, message = "Stop loss percentage must be at least 0")
        @Max(value = 100, message = "Stop loss percentage must be at most 100")
        int stopLossPercentage,

        @Min(value = 0, message = "Trailing stop percentage must be at least 0")
        @Max(value = 100, message = "Trailing stop percentage must be at most 100")
        int trailingStopPercentage,

        @Min(value = 0, message = "Take profit percentage must be at least 0")
        int takeProfitPercentage
) {
    public Context toContext() {
        return Context.builder()
                .rouletteType(rouletteType)
                .spotGenerateType(spotGenerateType)
                .start(start)
                .min(min)
                .max(max)
                .totalRoundBetLimit(totalRoundBetLimit)
                .stopLossPercentage(stopLossPercentage)
                .trailingStopPercentage(trailingStopPercentage)
                .takeProfitPercentage(takeProfitPercentage)
                .build();
    }
}
