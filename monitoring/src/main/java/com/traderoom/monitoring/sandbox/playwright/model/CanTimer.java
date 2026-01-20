package com.traderoom.monitoring.sandbox.playwright.model;

public interface CanTimer<T> {
    byte getTime();
    TimerState getState();
}
