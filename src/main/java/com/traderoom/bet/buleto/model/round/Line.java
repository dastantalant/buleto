package com.traderoom.bet.buleto.model.round;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@RequiredArgsConstructor
@ToString
public class Line {
    private final byte number;
    private long line;
    private double wave;
    private boolean start;
    private boolean bullet;

    public void reset() {
        wave = Double.NaN;
        line = -1;
        start = false;
        bullet = false;
    }

    public void set(long timeline, double wave) {
        this.line = timeline;
        this.wave = wave;
    }

    public void setStart(long timeline, double wave) {
        start = true;
        this.line = timeline;
        this.wave = wave;
    }

    public void setBullet(long timeline, double wave) {
        bullet = true;
        this.line = timeline;
        this.wave = wave;
    }
}
