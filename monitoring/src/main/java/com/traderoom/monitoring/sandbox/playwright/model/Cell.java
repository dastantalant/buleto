package com.traderoom.monitoring.sandbox.playwright.model;

public interface Cell<T> {
    void update();

    boolean isVictory();

    byte getNumber();

    T getPage();

    double getWave();

    void setWave(double wave);

    void setVictory(boolean victory);
}
