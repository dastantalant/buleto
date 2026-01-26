package com.traderoom.strategy.model.context;

import com.traderoom.strategy.IStrategy;
import com.traderoom.strategy.simulate.SpotSupplier;

public record MetaConfig(
        Config config,
        Class<? extends IStrategy> clazz,
        SpotSupplier supplier
) {
}
