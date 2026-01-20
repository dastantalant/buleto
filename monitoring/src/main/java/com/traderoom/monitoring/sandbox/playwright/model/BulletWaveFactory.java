package com.traderoom.monitoring.sandbox.playwright.model;

import java.util.function.Function;

public abstract class BulletWaveFactory {


    public static <T> BulletWave<T> create(Function<T, Double> function, T page) {
        return new DefaultBulletWave<>(function, page);
    }

    private static class DefaultBulletWave<T> implements BulletWave<T> {
        private final T page;
        private final Function<T, Double> function;

        private DefaultBulletWave(Function<T, Double> function, T page) {
            this.function = function;
            this.page = page;
        }

        public double getWave() {
            return function.apply(page);
        }
    }
}
