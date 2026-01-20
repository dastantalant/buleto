package com.traderoom.monitoring.sandbox.socket.socket.model;

public class Cell {
    private final byte number;
    private double begin;
    private double target;
    private boolean victory;

    public Cell(byte number) {
        this.number = number;
    }

    public byte getNumber() {
        return number;
    }

    public double getBegin() {
        return begin;
    }

    public void setBegin(double begin) {
        this.begin = begin;
    }

    public double getTarget() {
        return target;
    }

    public void setTarget(double target) {
        this.target = target;
    }

    public boolean isVictory() {
        return victory;
    }

    public void setVictory(boolean victory) {
        this.victory = victory;
    }

    public String toString() {
        return "Cell{" +
               "number=" + number +
               ", begin=" + begin +
               ", target=" + target +
               ", victory=" + victory +
               '}';
    }
}
