package com.traderoom.monitoring.sandbox.socket.model;

public class Line {
    private final short number;
    private long line;
    private double wave;
    private boolean start;
    private boolean bullet;

    public Line(short number) {
        this.number = number;
    }

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

    public short getNumber() {
        return number;
    }

    public long getLine() {
        return line;
    }

    public double getWave() {
        return wave;
    }

    public boolean isStart() {
        return start;
    }

    public boolean isBullet() {
        return bullet;
    }
}
