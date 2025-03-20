package com.traderoom.bet.buleto.model.round;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import lombok.Getter;

@Getter
public class Timeline {

    private static final byte CAP = 100;
    private static final double EPSILON = 0.00001d;
    private final Map<Byte, Line> lines;
    private byte number;
    private boolean bullet;

    public Timeline() {
        number = 0;
        bullet = false;
        lines = new HashMap<>(CAP);
        for (byte i = 0; i < CAP; i++) {
            lines.put(i, new Line(i));
        }
    }

    public void reset() {
        number = 0;
        bullet = false;
        lines.forEach((k, v) -> v.reset());
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
        byte index = equalsLast(wave) ? number : getLastIndex();
        lines.get(index).setBullet(line, wave);
    }

    private boolean equalsLast(double wave) {
        return (Math.abs(getLast().getWave() - wave) < EPSILON);
    }

    private Line getLast() {
        return Objects.requireNonNull(lines.get(getLastIndex()));
    }

    private byte getLastIndex() {
        return (byte) Math.max(number - 1, 0);
    }
}
