package com.traderoom.monitoring.sandbox.socket.model;

import com.jsoniter.any.Any;
import java.util.HashMap;
import java.util.Map;

public class Timeline {

    private static final short CAP = 512;
    private static final double EPSILON = 0.00001d;
    private final Map<Short, Line> lines;
    private short number;
    private boolean bullet;

    public Timeline() {
        number = 0;
        bullet = false;
        lines = new HashMap<>(CAP);
        for (short i = 0; i < CAP; i++) {
            lines.put(i, new Line(i));
        }
    }

    public void reset() {
        number = 0;
        bullet = false;
        lines.forEach((k, v) -> v.reset());
    }

    public void set(Any deserialize) {
    }
    public void set(long line, double wave) {
        if (number == 0) {
            reset();
            getLast().setStart(line, wave);
            number++;
        } else {
            setOrAddLast(line, wave);
        }
    }

    private void setOrAddLast(long line, double wave) {
        if (equalsLast(wave)) {
            getLast().set(line, wave);
        } else {
            lines.get(number).set(line, wave);
            number++;
        }
    }

    public void bullet(long line, double wave) {
        bullet = true;
        short index = equalsLast(wave) ? number : getLastIndex();
        lines.get(index).setBullet(line, wave);
    }

    private boolean equalsLast(double wave) {
        return (Math.abs(getLast().getWave() - wave) < EPSILON);
    }

    private Line getLast() {
        return lines.get(getLastIndex());
    }

    private short getLastIndex() {
        return (short) Math.max(number - 1, 0);
    }

    public Map<Short, Line> getLines() {
        return lines;
    }
}
