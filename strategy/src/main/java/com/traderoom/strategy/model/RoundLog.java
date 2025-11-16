package com.traderoom.strategy.model;

import lombok.Builder;

import java.util.Map;

@Builder
public record RoundLog(
        int victory,
        boolean isWin,
        long balance,
        long allBetAmount,
        long winAmount,
        long lossAmount,
        Map<Integer, Long> bets
) {
}