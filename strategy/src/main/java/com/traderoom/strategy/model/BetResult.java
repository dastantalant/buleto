package com.traderoom.strategy.model;

import lombok.Builder;

import java.util.List;

@Builder
public record BetResult(List<Bet> bets, SimulatorLog log) {
}
