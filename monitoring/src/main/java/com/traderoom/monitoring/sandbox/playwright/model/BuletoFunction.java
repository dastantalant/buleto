package com.traderoom.monitoring.sandbox.playwright.model;

@FunctionalInterface
public interface BuletoFunction<I, C, R> {
    R apply(I number, C cell);
}
