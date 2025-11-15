package com.traderoom.analyze;

import java.util.NavigableMap;
import java.util.TreeMap;

import static com.traderoom.analyze.Cell.COUNT;


public class CountMax {

    private final NavigableMap<Integer, Cell> cellNavigableMap;
    private int count;
    private int max;
    private boolean fin;

    public CountMax() {
        this(0, 0);
    }

    public CountMax(int count, int max) {
        cellNavigableMap = new TreeMap<>();
        init(cellNavigableMap, count, max);
    }

    private void init(NavigableMap<Integer, Cell> cellNavigableMap, int count, int max) {
        for (int i = 0; i <= COUNT; i++) {
            cellNavigableMap.put(i, Cell.of(i));
        }
        setParameter(count, max);
        fin = false;
    }

    public boolean victory(int cell) {
        if (isFinal()) return fin = false;
        cell = cell == 37 ? 0 : cell;
        if (cellNavigableMap.containsKey(cell)) {
            int increment = cellNavigableMap.get(cell).increment();
            return true;
        }
        return false;
    }

    public void setParameter(int count, int max) {
        this.count = Math.min(Math.max(count, 0), COUNT);
        this.max = Math.max(max, 0);
    }

    public boolean isFinal() {
        if (max == 0 && count == 0) return fin = false;
        int count = 0;
        for (int i = 0; i <= COUNT; i++) {
            Cell cell = cellNavigableMap.get(i);
            if (cell.getCount() >= max) {
                cell.setReach(true);
                count++;
            }
        }
        fin = this.count <= count;
        return fin;
    }

    public void reset() {
        cellNavigableMap.forEach((cell, round) -> round.reset());
    }

    public String getState() {
        StringBuilder sbTrue = new StringBuilder();
        StringBuilder sbFalse = new StringBuilder();
        for (int i = 0; i <= COUNT; i++) {
            if (cellNavigableMap.containsKey(i)) {
                Cell cell = cellNavigableMap.get(i);
                if(cell.isReach()) {
                    sbTrue.append(cell.getCell()).append(' ');
                } else {
                    sbFalse.append(cell.getCell()).append(' ');
                }
            }
        }
        sbTrue.append('\n').append(sbFalse);
        return sbTrue.toString();
    }

    @Override
    public String toString() {
        return "Grid{" +
                "count=" + count +
                ", max=" + max +
                ", fin=" + fin +
                '}' + getString();
    }

    public String getString() {
        StringBuilder sb = new StringBuilder().append('\n');
        cellNavigableMap.forEach((k, v) -> sb.append(v).append('\n'));
        return sb.toString();
    }
}
