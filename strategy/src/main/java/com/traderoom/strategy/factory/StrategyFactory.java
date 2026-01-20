package com.traderoom.strategy.factory;

import com.traderoom.strategy.api.IStrategy;
import com.traderoom.strategy.model.context.Config;

import java.lang.reflect.Modifier;
import java.util.Collections;
import java.util.List;
import java.util.NavigableMap;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.TreeMap;
import java.util.function.Predicate;
import java.util.stream.Stream;

public class StrategyFactory {

    public static StrategyFactory getFactory(String basePackage, String... more) {
        return new StrategyFactory(basePackage, more);
    }

    private final NavigableMap<String, StrategyDefinition> definitions = Collections.synchronizedNavigableMap(new TreeMap<>());

    private StrategyFactory(String basePackage, String... more) {
        List<String> packages = Stream.concat(Stream.of(basePackage), Stream.of(more))
                .filter(Objects::nonNull)
                .filter(Predicate.not(String::isBlank))
                .toList();

        if (packages.isEmpty()) {
            throw new IllegalArgumentException("At least one valid base package is required");
        }

        var classes = GlobalContext.classesInPackagesSet(packages);
        classes.stream()
                .filter(c -> c.isAnnotationPresent(AStrategy.class))
                .forEach(this::registerStrategyClass);
    }

    public Set<String> getAllName() {
        return definitions.keySet();
    }

    public List<IStrategy> create(Config config) {
        return definitions.values()
                .stream()
                .map(definition -> definition.instance(config))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();
    }

    public Optional<IStrategy> create(String name, Config config) {
        var definition = definitions.get(name);
        return (definition == null) ? Optional.empty() : definition.instance(config);
    }

    public Optional<IStrategy> create(Class<? extends IStrategy> clazz, Config config) {
        return definitions.values()
                .stream()
                .filter(definition -> clazz.isAssignableFrom(definition.clazz()))
                .map(definition -> definition.instance(config))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .findFirst();
    }

    private void registerStrategyClass(Class<?> clazz) {
        if (!IStrategy.class.isAssignableFrom(clazz) || Modifier.isAbstract(clazz.getModifiers())) {
            return;
        }

        var component = clazz.getAnnotation(AStrategy.class);
        if (component == null) {
            return;
        }
        var trimmed = component.name().trim();
        var name = trimmed.isEmpty() ? clazz.getSimpleName() : trimmed;

        @SuppressWarnings("unchecked")
        var cast = (Class<IStrategy>) clazz;
        definitions.put(name, StrategyDefinition.of(name, cast));
    }
}