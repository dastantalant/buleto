package com.traderoom.strategy.simulate;

public record SimulateResult(
        String config,
        String strategy,
        Simulator.Result result
) {
}
