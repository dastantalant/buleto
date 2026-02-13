package com.traderoom.common.mapper;

import com.traderoom.common.entity.RoundEntity;
import com.traderoom.common.model.RoundModel;

import java.util.List;

public class RoundMapper {

    public static RoundModel toModel(RoundEntity entity) {
        return new RoundModel(entity.getId(),
                entity.getCell(),
                entity.getStartTime(),
                entity.getVictoryTime(),
                entity.getFactor());
    }

    public static List<RoundModel> toModel(List<RoundEntity> list) {
        return list.stream().map(RoundMapper::toModel).toList();
    }

    public static RoundEntity toEntity(RoundModel model) {
        return new RoundEntity(model.getRoundId(),
                model.getCell(),
                model.getStartTime(),
                model.getVictoryTime(),
                model.getFactor());
    }

    public static List<RoundEntity> toEntity(List<RoundModel> list) {
        return list.stream().map(RoundMapper::toEntity).toList();
    }
}
