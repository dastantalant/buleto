package com.traderoom.strategy.utils;

import com.google.common.reflect.ClassPath;
import com.traderoom.strategy.Constant;
import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.strategy.Strategy;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Modifier;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@UtilityClass
public class StrategyHelper {

    private static final String STRATEGY_PACKAGE = "com.traderoom.strategy.strategy";


    public static void saveEnableStrategyClassSet(Set<Class<? extends Strategy>> strategyClassSet) {
        Objects.requireNonNull(strategyClassSet, "Strategy class set must not be null");
        Path destPath = getSettingFilePath();
        try {
            List<String> classNames = strategyClassSet.stream()
                    .map(Class::getName)
                    .toList();
            Files.write(destPath, classNames, StandardCharsets.UTF_8, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
        } catch (IOException e) {
            log.error("Failed to save strategy class set to {}: {}", destPath, e.getMessage());
        }
    }

    public static Set<Class<? extends Strategy>> findAllEnabledStrategyClasses() {
        Path srcPath = getSettingFilePath();
        if (!Files.exists(srcPath) || !Files.isReadable(srcPath)) {
            return Collections.emptySet();
        }

        Set<Class<? extends Strategy>> strategyClassSet = new HashSet<>();
        try {
            for (String line : Files.readAllLines(srcPath, StandardCharsets.UTF_8)) {
                loadClass(line).ifPresent(strategyClassSet::add);
            }
        } catch (IOException e) {
            log.error("Failed to read strategy class set from {}: {}", srcPath, e.getMessage());
        }
        return strategyClassSet;
    }

    private static Optional<Class<? extends Strategy>> loadClass(String className) {
        String trimmedLine = className.trim();
        if (trimmedLine.isEmpty()) {
            return Optional.empty();
        }
        try {
            Class<?> clazz = Class.forName(trimmedLine);
            if (Strategy.class.isAssignableFrom(clazz) && !Modifier.isAbstract(clazz.getModifiers()) && !clazz.isInterface()) {
                return Optional.of((Class<? extends Strategy>) clazz);
            }
        } catch (ClassNotFoundException e) {
            log.warn("Strategy class not found, it may have been removed or renamed: {}", className);
        }
        return Optional.empty();
    }

    public static Map<String, Class<? extends Strategy>> findAllStrategyClassesMap() {
        return findAllStrategyClassesMap(STRATEGY_PACKAGE);
    }

    public static Map<String, Class<? extends Strategy>> findAllStrategyClassesMap(String packageName) {
        return findAllStrategyClassesSet(packageName).stream()
                .collect(Collectors.toUnmodifiableMap(Class::getSimpleName, clazz -> clazz));
    }

    public static Set<Class<? extends Strategy>> findAllStrategyClassesSet() {
        return findAllStrategyClassesSet(STRATEGY_PACKAGE);
    }

    public static Set<Class<? extends Strategy>> findAllStrategyClassesSet(String packageName) {
        try {
            ClassLoader loader = Thread.currentThread().getContextClassLoader();
            return ClassPath.from(loader)
                    .getTopLevelClassesRecursive(packageName)
                    .stream()
                    .map(ClassPath.ClassInfo::load)
                    .filter(Strategy.class::isAssignableFrom)
                    .filter(clazz -> !clazz.isInterface() && !Modifier.isAbstract(clazz.getModifiers()))
                    .map(clazz -> (Class<? extends Strategy>) clazz)
                    .collect(Collectors.toUnmodifiableSet());
        } catch (IOException e) {
            log.error("Failed to scan for strategy classes in package '{}': {}", packageName, e.getMessage());
            return Collections.emptySet();
        }
    }

    public static List<Strategy> loadStrategies(Context context) {
        return loadAllStrategies(STRATEGY_PACKAGE, context);
    }

    public static List<Strategy> loadAllStrategies(Context context) {
        return loadAllStrategies(STRATEGY_PACKAGE, context);
    }

    public static List<Strategy> loadAllStrategies(String packageName, Context context) {
        return findAllStrategyClassesSet(packageName).stream()
                .map(item -> instantiateStrategy(item, context))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();
    }

    public static Optional<Strategy> instantiateStrategy(Class<? extends Strategy> clazz, Context context) {
        try {
            Constructor<? extends Strategy> constructor = clazz.getConstructor(Context.class);
            return Optional.of(constructor.newInstance(context));
        } catch (NoSuchMethodException e) {
            log.error("Failed to instantiate strategy '{}': Missing a public constructor with a Context parameter.", clazz.getName(), e);
        } catch (InstantiationException | IllegalAccessException | InvocationTargetException e) {
            log.error("Failed to instantiate strategy '{}': Constructor threw an exception.", clazz.getName(), e);
        }
        return Optional.empty();
    }

    private static Path getSettingFilePath() {
        Objects.requireNonNull(Constant.ENABLE_STRATEGY_TXT, "Strategy file name must not be null");
        Path path = FileHelper.getSettingFile(Constant.ENABLE_STRATEGY_TXT).toPath();
        Objects.requireNonNull(path, "Setting file path must not be null");
        return path;
    }
}