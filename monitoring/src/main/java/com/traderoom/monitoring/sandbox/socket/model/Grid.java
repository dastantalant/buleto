package com.traderoom.monitoring.sandbox.socket.model;

import java.util.Map;

public interface Grid<T> {
    byte SIZE = 37;

    void update();

    Map<Short, Cell<T>> getCells();

    Cell<T> getVictoryCell();
}
