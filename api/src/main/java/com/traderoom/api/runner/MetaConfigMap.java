package com.traderoom.api.runner;

import com.traderoom.api.IStrategy;
import com.traderoom.api.model.config.Config;

public record MetaConfigMap(Config config, Class<? extends IStrategy> clazz) {
}
