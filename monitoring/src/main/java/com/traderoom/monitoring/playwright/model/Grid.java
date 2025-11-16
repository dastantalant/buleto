package com.traderoom.monitoring.playwright.model;

import java.util.Map;
import java.util.Optional;

public interface Grid<T> {
    byte SIZE = 37;

    void update();

    Map<Byte, Cell<T>> getCells();

    Cell<T> getVictoryCell();
}
