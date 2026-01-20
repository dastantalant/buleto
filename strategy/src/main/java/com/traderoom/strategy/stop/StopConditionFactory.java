package com.traderoom.strategy.stop;

import lombok.experimental.UtilityClass;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@UtilityClass
public class StopConditionFactory {
    public static List<StopCondition> from(StopConditionConfig config, Long balance) {
        return Stream.of(ZeroBalanceStopCondition.createIfEnabled(balance, config),
                        EquityCurveCondition.createIfEnabled(balance, config),
                        InitialStopLossCondition.createIfEnabled(balance, config),
                        TakeProfitCondition.createIfEnabled(balance, config),
                        TrailingStopLossCondition.createIfEnabled(balance, config),
                        MaxDrawdownStopCondition.createIfEnabled(balance, config),
                        StreakStopCondition.createIfEnabled(balance, config),
                        MaxRoundsCondition.createIfEnabled(balance, config),
                        StagnationCondition.createIfEnabled(balance, config),
                        HighRiskBetCondition.createIfEnabled(balance, config),
                        LowWinRateCondition.createIfEnabled(balance, config))
                .flatMap(Optional::stream)
                .toList();
    }
}