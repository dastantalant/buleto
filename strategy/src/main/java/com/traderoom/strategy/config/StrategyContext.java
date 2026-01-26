package com.traderoom.strategy.config;

import com.traderoom.core.ApplicationContext;

import java.util.Collections;
import java.util.Set;

import static com.traderoom.strategy.enums.Constants.PACKAGE;

public class StrategyContext {
    private static class Holder {
        private static final StrategyContext INSTANCE = new StrategyContext(PACKAGE);
    }

    private final ApplicationContext context;

    private StrategyContext(Package pkg) {
        context = new ApplicationContext(pkg);
    }

    public static StrategyContext getInstance() {
        return Holder.INSTANCE;
    }

    public Set<Class<?>> classesInPackage(Package aPackage) {
        if (aPackage == null) return Collections.emptySet();
        return context.classesInPackage(aPackage);
    }
}
