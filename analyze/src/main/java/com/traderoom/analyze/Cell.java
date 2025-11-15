package com.traderoom.analyze;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Cell {
    public static final int COUNT = 36;
    private static final String FORMAT = "Cell(cell=%02d, count=%d, reach=%d)";
    private final int cell;
    private int count;
    private boolean reach;

    private Cell(int cell) {
        this.cell = cell;
        count = 0;
    }

    public static Cell of(int cell) {
        return new Cell(cell);
    }

    public void reset() {
        count = 0;
    }

    public int increment() {
        return ++count;
    }

    @Override
    public String toString() {
        return String.format(FORMAT, cell, count, reach ? 1 : 0);
    }
}
