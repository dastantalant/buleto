package com.traderoom.monitoring.socket.model;

public interface CanTimer<T> {
    byte getTime();
    TimerState getState();
}
