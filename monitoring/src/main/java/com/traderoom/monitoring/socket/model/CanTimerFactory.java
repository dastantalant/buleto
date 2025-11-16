package com.traderoom.monitoring.socket.model;

import java.util.function.Function;

public class CanTimerFactory {

    public static <T> CanTimer<T> create(T page, Function<T, Byte> extractTimer, Function<T, TimerState> extractStatus) {
        return new SimpleCanTimer<>(page, extractTimer, extractStatus);
    }

    private static class SimpleCanTimer<T> implements CanTimer<T> {
        private final T page;
        private final Function<T, Byte> extractTimer;
        private final Function<T, TimerState> extractStatus;

        public SimpleCanTimer(T page, Function<T, Byte> extractTimer, Function<T, TimerState> extractStatus) {
            this.page = page;
            this.extractTimer = extractTimer;
            this.extractStatus = extractStatus;
        }

        public byte getTime() {
            return extractTimer.apply(page);
        }

        public TimerState getState() {
            return extractStatus.apply(page);
        }
    }
}
