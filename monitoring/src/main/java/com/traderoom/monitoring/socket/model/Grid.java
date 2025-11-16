package com.traderoom.monitoring.socket.model;

import java.util.Map;
import java.util.Optional;

public interface Grid<T> {
    byte SIZE = 37;

    void update();

    Map<Short, Cell<T>> getCells();

    Cell<T> getVictoryCell();
}
