package com.traderoom.strategy.factory;

import com.traderoom.strategy.enums.Constants;
import com.traderoom.strategy.library.ClassScanner;

import lombok.experimental.UtilityClass;

import java.util.Collection;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@UtilityClass
public class GlobalContext {

    // =================================================================================================================
    private static class Holder {
        private static final Set<Class<?>> CLASSES =
                Set.copyOf(new ClassScanner().scan(Constants.PACKAGE));
        private static final Map<String, Class<?>> BY_NAME =
                CLASSES.stream().collect(Collectors.toUnmodifiableMap(Class::getName, c -> c));
    }

    // =================================================================================================================
    public static Map<String, Class<?>> map() {
        return Holder.BY_NAME;
    }

    public static Set<Class<?>> set() {
        return Holder.CLASSES;
    }

    public static boolean isKnown(Class<?> clazz) {
        return clazz != null && Holder.CLASSES.contains(clazz);
    }

    public static boolean isKnown(String name) {
        return valid(name) && Holder.BY_NAME.containsKey(name);
    }

    // =================================================================================================================
    public static Optional<Class<?>> find(String name) {
        return valid(name)
                ? Optional.ofNullable(Holder.BY_NAME.get(name))
                : Optional.empty();
    }

    public static Stream<Class<?>> findStream(String... names) {
        return findStream(Stream.of(names));
    }

    public static Stream<Class<?>> findStream(Collection<String> names) {
        return findStream(names.stream());
    }

    private static Stream<Class<?>> findStream(Stream<String> names) {
        return names
                .filter(GlobalContext::valid)
                .map(Holder.BY_NAME::get);
    }

    public static Set<Class<?>> findSet(String... names) {
        return findSet(Stream.of(names));
    }

    public static Set<Class<?>> findSet(Collection<String> names) {
        return findSet(names.stream());
    }

    private static Set<Class<?>> findSet(Stream<String> names) {
        return findStream(names)
                .collect(Collectors.toUnmodifiableSet());
    }

    // =================================================================================================================
    public static Stream<Class<?>> classesInPackageStream(String basePackage) {
        if (!valid(basePackage)) {
            return Stream.empty();
        }

        return Holder.CLASSES.stream()
                .filter(c -> c.getPackageName().startsWith(basePackage));
    }

    public static Stream<Class<?>> classesInPackagesStream(String... packages) {
        return classesInPackagesStream(Stream.of(packages));
    }

    public static Stream<Class<?>> classesInPackagesStream(Collection<String> packages) {
        return classesInPackagesStream(packages.stream());
    }

    private static Stream<Class<?>> classesInPackagesStream(Stream<String> packagePrefixes) {
        Set<String> prefixes = packagePrefixes
                .filter(GlobalContext::valid)
                .collect(Collectors.toUnmodifiableSet());

        if (prefixes.isEmpty()) {
            return Stream.empty();
        }

        Predicate<Class<?>> inAnyPackage =
                c -> prefixes.stream()
                        .anyMatch(p -> c.getPackageName().startsWith(p));

        return Holder.CLASSES.stream().filter(inAnyPackage);
    }

    public static Set<Class<?>> classesInPackagesSet(String... packages) {
        return classesInPackagesSet(Stream.of(packages));
    }

    public static Set<Class<?>> classesInPackagesSet(Collection<String> packages) {
        return classesInPackagesSet(packages.stream());
    }

    private static Set<Class<?>> classesInPackagesSet(Stream<String> packages) {
        return classesInPackagesStream(packages)
                .collect(Collectors.toUnmodifiableSet());
    }

    // =================================================================================================================
    private static boolean valid(String value) {
        return value != null && !value.isBlank();
    }
}
