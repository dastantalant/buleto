package com.traderoom.monitoring.socket.model;

@FunctionalInterface
public interface BuletoFunction<I, C, R> {
    R apply(I number, C cell);
}
