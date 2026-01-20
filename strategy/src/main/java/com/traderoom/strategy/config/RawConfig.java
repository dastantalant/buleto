package com.traderoom.strategy.config;

import com.traderoom.strategy.enums.RouletteType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RawConfig {

    private String name;
    private RouletteType type;

    private Long balance;
    private Long minBet;
    private Long maxBet;
    private Long limit;

    private Integer stopLossPercentage;
    private Integer takeProfitPercentage;
    private Integer trailingStopPercentage;
    private Integer maxDrawdownPercentage;
    private Integer maxWinStreak;
    private Integer maxLossStreak;

    private Long maxRounds;
    private Double maxBetBalancePercentage;
    private Integer stagnationWindow;
    private Double minWinRateThreshold;
    private Long minRoundsForWinRate;
}

