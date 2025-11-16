package com.traderoom.monitoring.socket.model;

public interface Cell<T> {
    void update();

    boolean isVictory();

    short getNumber();

    T getPage();

    double getWave();

    void setWave(double wave);

    void setVictory(boolean victory);
}
