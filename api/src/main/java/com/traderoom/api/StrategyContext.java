package com.traderoom.api;

import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.model.config.Config;
import com.traderoom.core.ApplicationContext;
import com.traderoom.core.util.StringUtil;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.exception.StrategyException;
import com.traderoom.api.utils.TagUtil;

import java.lang.reflect.Modifier;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.traderoom.api.enums.Constants.PACKAGE;

public final class StrategyContext {

    private final Map<Class<IStrategy>, Definition> map;
    private final Map<String, String> nameMap;

    private StrategyContext(Package aPackage) {
        ApplicationContext context = new ApplicationContext(aPackage);
        var hashMap = new HashMap<Class<IStrategy>, Definition>();
        var classes = context.classesInPackage(aPackage);
        classes.forEach(clazz -> put(clazz, hashMap));
        map = Collections.unmodifiableMap(hashMap);
        nameMap = mapping(hashMap.keySet());
    }

    private static class Holder {
        private static final StrategyContext INSTANCE = new StrategyContext(PACKAGE);
    }

    public static StrategyContext instance() {
        return Holder.INSTANCE;
    }

    private static Map<Class<IStrategy>, Definition> map() {
        return instance().map;
    }

    private static Set<Class<IStrategy>> set() {
        return map().keySet();
    }

    private static Map<String, String> mapping(Set<Class<IStrategy>> set) {
        var map = new HashMap<String, String>();
        for (Class<IStrategy> clazz : set) {
            String simpleName = clazz.getSimpleName();
            Strategy annotation = clazz.getAnnotation(Strategy.class);
            if (annotation != null) {
                String name = annotation.name().trim();
                if (!StringUtil.isEmpty(name)) {
                    map.put(name, simpleName);
                }
            } else {
                map.put(simpleName, simpleName);
            }
        }
        return Collections.unmodifiableMap(map);
    }

    public static Map<String, String> getAllMap() {
        return instance().nameMap;
    }

    public static Set<Class<IStrategy>> getAll() {
        return Set.copyOf(set());
    }

    public static Set<Class<IStrategy>> getAllByClassName(List<String> names) {
        var set = new HashSet<>(names);
        return set()
                .stream()
                .filter(item -> set.contains(item.getSimpleName()))
                .collect(Collectors.toSet());
    }

    public static Optional<Class<IStrategy>> findByClassName(String name) {
        for (Class<IStrategy> item : set()) {
            if (item.getSimpleName().equals(name)) {
                return Optional.of(item);
            }
        }
        return Optional.empty();
    }

    public static Set<Class<IStrategy>> getAllByExcluded(Set<Class<? extends IStrategy>> exclude) {
        return set()
                .stream()
                .filter(clazz -> !exclude.contains(clazz))
                .collect(Collectors.toSet());
    }

    public static List<IStrategy> create(Config config) {
        return create(map().values().stream(), config);
    }

    public static List<IStrategy> create(Tag tag, Config config) {
        Stream<Definition> stream = map().values()
                .stream()
                .filter(definition -> TagUtil.isMarked(definition.clazz(), tag));
        return create(stream, config);
    }

    private static List<IStrategy> create(Stream<Definition> stream, Config config) {
        return stream
                .map(definition -> definition.instance(config))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();
    }

    public static IStrategy create(Class<? extends IStrategy> clazz, Config config) {
        Definition def = map().get(clazz);
        if (def == null)
            throw new StrategyException("Class " + clazz.getSimpleName() + " has no definition");
        return def.instance(config)
                .orElseThrow(() -> new StrategyException("Class " + clazz.getSimpleName() + " has no definition"));
    }

    public static List<IStrategy> create(List<Class<? extends IStrategy>> classes, Config config) {
        return classes.stream()
                .map(item -> map().get(item))
                .filter(Objects::nonNull)
                .map(definition -> definition.instance(config))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();
    }

    private static void put(Class<?> clazz, Map<Class<IStrategy>, Definition> map) {
        if (!IStrategy.class.isAssignableFrom(clazz) || Modifier.isAbstract(clazz.getModifiers())) {
            return;
        }
        var component = clazz.getAnnotation(Strategy.class);
        if (component == null) {
            return;
        }
        var trimmed = component.name().trim();
        var name = trimmed.isEmpty() ? clazz.getSimpleName() : trimmed;
        @SuppressWarnings("unchecked")
        Class<IStrategy> cast = (Class<IStrategy>) clazz;
        map.put(cast, Definition.of(name, cast));
    }

    private record Definition(String name, Class<IStrategy> clazz) {
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