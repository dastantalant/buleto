package com.traderoom.monitoring.model;

public record Round(
        long roundId,
        int cell,
        long startTime,
        long victoryTime,
        int factor
) {
    public static final int SCALE_MULTIPLIER = 100_000;

    public boolean isComplete() {
        return roundId > 0 && cell >= 0 && victoryTime > 0;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private long roundId;
        private int cell;
        private long startTime;
        private long victoryTime;
        private int factor;

        public Builder roundId(long value) {
            roundId = value;
            return this;
        }

        public Builder cell(int value) {
            cell = value;
            return this;
        }

        public Builder startTime(long value) {
            startTime = value;
            return this;
        }

        public Builder victoryTime(long value) {
            victoryTime = value;
            return this;
        }

        public Builder factor(int value) {
            factor = value;
            return this;
        }

        public Round build() {
            return new Round(roundId, cell, startTime, victoryTime, factor);
        }
    }
}