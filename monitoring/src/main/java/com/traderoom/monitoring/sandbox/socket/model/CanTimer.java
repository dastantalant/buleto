package com.traderoom.monitoring.sandbox.socket.model;

public interface CanTimer<T> {
    byte getTime();
    TimerState getState();
}
