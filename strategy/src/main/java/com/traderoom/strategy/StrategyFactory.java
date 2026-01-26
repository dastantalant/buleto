package com.traderoom.strategy;

import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.config.StrategyContext;
import com.traderoom.strategy.model.context.Config;

import java.lang.reflect.Modifier;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import static com.traderoom.strategy.enums.Constants.PACKAGE;

public final class StrategyFactory {

    private static class Holder {
        private static final StrategyFactory INSTANCE = new StrategyFactory(PACKAGE);
    }

    public static StrategyFactory getInstance() {
        return Holder.INSTANCE;
    }

    public static Set<Class<IStrategy>> classes() {
        return Holder.INSTANCE.map.keySet();
    }

    private final Map<Class<IStrategy>, Definition> map;

    @SuppressWarnings("unchecked")
    private StrategyFactory(Package aPackage) {
        Map<Class<IStrategy>, Definition> temp = new HashMap<>();
        Set<Class<?>> classes = StrategyContext.getInstance().classesInPackage(aPackage);
        classes.stream()
                .filter(clazz -> clazz.isAnnotationPresent(AStrategy.class))
                .map(clazz -> (Class<IStrategy>) clazz)
                .forEach(clazz -> put(clazz, temp));
        map = Collections.unmodifiableMap(temp);
    }

    public List<IStrategy> create(Config config) {
        return map.values()
                .stream()
                .map(definition -> definition.instance(config))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();
    }

    public IStrategy create(Class<? extends IStrategy> clazz, Config config) {
        Definition def = map.get(clazz);
        if (def == null) return null;
        return def.instance(config).orElse(null);
    }

    private void put(Class<IStrategy> clazz, Map<Class<IStrategy>, Definition> map) {
        if (!IStrategy.class.isAssignableFrom(clazz) || Modifier.isAbstract(clazz.getModifiers())) {
            return;
        }
        var component = clazz.getAnnotation(AStrategy.class);
        if (component == null) {
            return;
        }
        var trimmed = component.name().trim();
        var name = trimmed.isEmpty() ? clazz.getSimpleName() : trimmed;
        map.put(clazz, Definition.of(name, clazz));
    }
    private  record Definition(String name, Class<IStrategy> clazz) {

        public static Definition of(String name, Class<IStrategy> clazz) {
            return new Definition(name, clazz);
        }

        public Optional<IStrategy> instance(Config config) {
            try {
                return Optional.of(clazz.getConstructor(Config.class).newInstance(config));
            } catch (Exception _) {
                return Optional.empty();
            }
        }
    }
}