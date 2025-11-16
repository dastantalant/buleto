package com.traderoom.strategy.model;

import lombok.Builder;

import java.util.Map;

@Builder
public record SimulatorLog(
        String strategy,
        ContextModel context,
        Map<Integer, RoundLog> spots
) {
}
