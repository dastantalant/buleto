package com.traderoom.monitoring.socket.model;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public abstract class GridFactory {

    public static <T> Grid<T> create(BuletoFunction<Short, T, Cell<T>> extractCell, T page) {
        return new SimpleGrid<>(extractCell, page);
    }

    private static final class SimpleGrid<T> implements Grid<T> {
        private final Map<Short, Cell<T>> cells = new HashMap<>(SIZE);
        private Cell<T> victoryCell;

        private SimpleGrid(BuletoFunction<Short, T, Cell<T>> extractCell, T page) {
            for (short index = 0; index < SIZE; index++) {
                cells.put(index, extractCell.apply(index, page));
            }
        }

        public void update() {
            victoryCell = null;
            cells.values().forEach(Cell::update);
        }

        public Map<Short, Cell<T>> getCells() {
            return cells;
        }

        public Cell<T> getVictoryCell() {
            if (victoryCell != null) {
                return victoryCell;
            }
            for (Cell<T> cell : cells.values()) {
                if (cell.isVictory()) {
                    victoryCell = cell;
                }
            }
            return victoryCell;
        }
    }
}
