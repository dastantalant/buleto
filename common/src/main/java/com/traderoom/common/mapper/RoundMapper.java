package com.traderoom.common.mapper;

import com.traderoom.common.entity.RoundEntity;
import com.traderoom.common.model.RoundModel;

import java.util.List;

public final class RoundMapper {
    private RoundMapper() {
    }

    public static RoundModel toModel(RoundEntity entity) {
        return RoundModel.builder()
                .roundId(entity.id())
                .cell(entity.cell())
                .startTime(entity.startTime())
                .victoryTime(entity.victoryTime())
                .factor(entity.factor())
                .beginValue(entity.beginValue())
                .targetValue(entity.targetValue())
                .startValue(entity.startValue())
                .endTime(entity.endTime())
                .closedTime(entity.closedTime())
                .targetTime(entity.targetTime())
                .build();
    }

    public static List<RoundModel> toModel(List<RoundEntity> list) {
        return list.stream().map(RoundMapper::toModel).toList();
    }

    public static RoundEntity toEntity(RoundModel model) {
        return RoundEntity.builder()
                .id(model.roundId())
                .cell(model.cell())
                .startTime(model.startTime())
                .victoryTime(model.victoryTime())
                .factor(model.factor())
                .beginValue(model.beginValue())
                .targetValue(model.targetValue())
                .startValue(model.startValue())
                .endTime(model.endTime())
                .closedTime(model.closedTime())
                .targetTime(model.targetTime())
                .build();
    }

    public static List<RoundEntity> toEntity(List<RoundModel> list) {
        return list.stream().map(RoundMapper::toEntity).toList();
    }
}
