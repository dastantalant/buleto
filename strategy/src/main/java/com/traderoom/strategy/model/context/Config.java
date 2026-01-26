package com.traderoom.strategy.model.context;

import com.traderoom.strategy.enums.RouletteType;
import com.traderoom.strategy.stop.StopCondition;
import com.traderoom.strategy.stop.StopConditionConfig;
import com.traderoom.strategy.stop.StopConditionFactory;

import lombok.Builder;

import java.util.Collections;
import java.util.List;

// TODO validate in pipeline
@Builder
public record Config(
        String name,
        RouletteType rouletteType,
        Long minBet,
        Long maxBet,
        Long startBalance,
        Long tableLimit,
        StopConditionConfig stopConfig,
        List<Integer> initialHistory
) {
    public List<StopCondition> createConditions(){
        return StopConditionFactory.from(stopConfig, startBalance);
    }public List<Integer> initialHistory() {
        return initialHistory == null ? Collections.emptyList() : initialHistory;
    }
}