package com.traderoom.monitoring.sandbox.playwright.model;

import java.util.Map;

public interface Grid<T> {
    byte SIZE = 37;

    void update();

    Map<Byte, Cell<T>> getCells();

    Cell<T> getVictoryCell();
}
