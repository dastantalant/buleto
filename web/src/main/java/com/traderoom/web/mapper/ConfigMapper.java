package com.traderoom.web.mapper;

import com.traderoom.web.entity.ConfigEntity;
import com.traderoom.web.model.RawConfigModel;
import com.traderoom.web.model.request.ConfigRequest;
import com.traderoom.api.model.config.RawConfig;

import java.util.LinkedList;

public class ConfigMapper {

    public static ConfigEntity map(ConfigRequest request) {
        return ConfigEntity.builder()
                .name(request.getPayload().getName())
                .payload(request.getPayload())
                .strategies(request.getStrategies())
                .build();
    }

    public static RawConfig toRaw(RawConfigModel payload) {
        return RawConfig.builder()
                .name(payload.getName())
                .tableLimit(payload.getTableLimit())
                .type(payload.getType())
                .startBalance(payload.getStartBalance())
                .realBalance(payload.getRealBalance())
                .minBet(payload.getMinBet())
                .maxBet(payload.getMaxBet())
                .tableLimit(payload.getTableLimit())

                .stopLossPercentageStop(payload.getStopLossPercentageStop())
                .takeProfitPercentageStop(payload.getTakeProfitPercentageStop())
                .trailingStopPercentageStop(payload.getTrailingStopPercentageStop())
                .maxDrawdownPercentageStop(payload.getMaxDrawdownPercentageStop())
                .maxWinStreakStop(payload.getMaxWinStreakStop())
                .maxLossStreakStop(payload.getMaxLossStreakStop())

                .initialHistory(new LinkedList<>())

                .maxRoundsStop(payload.getMaxRoundsStop())
                .stagnationWindowStop(payload.getStagnationWindowStop())
                .minWinRateThresholdStop(payload.getMinWinRateThresholdStop())
                .minRoundsForWinRateStop(payload.getMinRoundsForWinRateStop())

                .dangerZoneThresholdRisk(payload.getDangerZoneThresholdRisk())
                .profitZoneThresholdRisk(payload.getProfitZoneThresholdRisk())
                .normalZoneBetCapRisk(payload.getNormalZoneBetCapRisk())
                .penaltyBoxDurationRisk(payload.getPenaltyBoxDurationRisk())

                .maxBetBalancePercentageLimit(payload.getMaxBetBalancePercentageLimit())
                .peakProtectDrawdownStepLimit(payload.getPeakProtectDrawdownStepLimit())
                .peakProtectReductionFactorLimit(payload.getPeakProtectReductionFactorLimit())
                .minWinRateThresholdLimit(payload.getMinWinRateThresholdLimit())
                .minWinRateRoundsLimit(payload.getMinWinRateRoundsLimit())
                .floatingMinBetPercentLimit(payload.getFloatingMinBetPercentLimit())
                .build();
    }
}
