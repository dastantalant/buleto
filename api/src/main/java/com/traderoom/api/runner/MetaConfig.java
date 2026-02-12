package com.traderoom.api.runner;

import com.traderoom.api.IStrategy;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.runner.supplier.SpotSupplier;

public record MetaConfig(Config config, Class<? extends IStrategy> clazz, SpotSupplier supplier) {
}
