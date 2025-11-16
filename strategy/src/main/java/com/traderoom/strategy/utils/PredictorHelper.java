package com.traderoom.strategy.utils;

import com.traderoom.strategy.predictor.Predictor;
import lombok.experimental.UtilityClass;

import java.lang.reflect.InvocationTargetException;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;

@UtilityClass
public class PredictorHelper {

    private static final Map<Class<? extends Predictor>, Predictor> PREDICTOR_CACHE = new ConcurrentHashMap<>();

    public static Predictor getInstance(Class<? extends Predictor> clazz) {
        Objects.requireNonNull(clazz, "Predictor class must not be null");

        return PREDICTOR_CACHE.computeIfAbsent(clazz, key -> {
            try {
                return key.getDeclaredConstructor().newInstance();
            } catch (InstantiationException | IllegalAccessException | NoSuchMethodException |
                     InvocationTargetException e) {
                throw new IllegalArgumentException("Failed to create instance of " + key.getName(), e);
            }
        });
    }
}