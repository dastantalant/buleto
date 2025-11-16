package com.traderoom.monitoring.playwright.model;

public interface CanTimer<T> {
    byte getTime();
    TimerState getState();
}
