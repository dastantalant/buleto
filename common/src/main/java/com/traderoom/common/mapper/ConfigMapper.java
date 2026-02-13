package com.traderoom.common.mapper;

import com.traderoom.api.model.config.RawConfig;
import com.traderoom.common.entity.ConfigEntity;
import com.traderoom.common.model.RawConfigModel;
import com.traderoom.common.model.request.ConfigRequest;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface ConfigMapper {

    ConfigMapper INSTANCE = Mappers.getMapper(ConfigMapper.class);

    default ConfigEntity toEntity(ConfigRequest request) {
        return ConfigEntity.builder()
                .name(request.getPayload().getName())
                .payload(request.getPayload())
                .strategies(request.getStrategies())
                .build();
    }

    @Named("toConfig")
    RawConfig toConfig(RawConfigModel model);

    @IterableMapping(qualifiedByName = "toConfig")
    List<RawConfig> toConfig(List<RawConfigModel> models);

    @Named("toModel")
    RawConfigModel toModel(RawConfig config);

    @IterableMapping(qualifiedByName = "toModel")
    List<RawConfigModel> toModel(List<RawConfig> configs);
}
