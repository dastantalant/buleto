package com.traderoom.strategy.model.context;

import com.traderoom.strategy.enums.RouletteType;
import com.traderoom.strategy.stop.StopCondition;
import com.traderoom.strategy.stop.StopConditionConfig;

import lombok.Builder;

import java.util.List;

@Builder
public record Config(
        String name,
        RouletteType rouletteType,
        Long minBet,
        Long maxBet,
        Long startBalance,
        Long tableLimit,
        StopConditionConfig stopConfig,
        List<StopCondition> stopConditions
) {
}