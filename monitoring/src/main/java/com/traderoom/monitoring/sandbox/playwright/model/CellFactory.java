package com.traderoom.monitoring.sandbox.playwright.model;

import java.util.Objects;


public abstract class CellFactory {

    public static <T> Cell<T> create(byte number, T cell, BuletoFunction<Byte, T, Double> extractFactor, BuletoFunction<Byte, T, Boolean>extractVictory) {
        return new SimpleCell<>(number, cell, extractFactor, extractVictory);
    }

    private static final class SimpleCell<T> implements Cell<T> {
        private final byte number;
        private final T page;
        private double wave;
        private boolean victory;
        private final BuletoFunction<Byte, T, Double> extractFactor;
        private final BuletoFunction<Byte, T, Boolean> extractVictory;

        private SimpleCell(byte number, T page, BuletoFunction<Byte, T, Double> extractFactor, BuletoFunction<Byte, T, Boolean> extractVictory) {
            this.number = number;
            this.page = page;
            this.extractFactor = extractFactor;
            this.extractVictory = extractVictory;
            wave = 0;
            victory = false;
        }

        public void update() {
            victory = false;
            wave = extractFactor.apply(number, page);
        }

        public boolean isVictory() {
             victory = extractVictory.apply(number, page);
             return victory;
        }

        public byte getNumber() {
            return number;
        }

        public T getPage() {
            return page;
        }

        public double getWave() {
            return wave;
        }

        public void setWave(double wave) {
            this.wave = wave;
        }

        public void setVictory(boolean victory) {
            this.victory = victory;
        }

        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            SimpleCell<?> that = (SimpleCell<?>) o;
            return number == that.number && Math.abs(that.wave - wave) < 0.00001 && victory == that.victory;
        }

        public int hashCode() {
            return Objects.hash(number, page);
        }

        public String toString() {
            return "SimpleCell{" +
                   "number=" + number +
                   ", wave=" + wave +
                   ", victory=" + victory +
                   '}';
        }
    }
}
