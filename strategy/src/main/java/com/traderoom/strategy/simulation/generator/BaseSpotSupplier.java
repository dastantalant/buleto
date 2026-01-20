package com.traderoom.strategy.simulation.generator;

import com.traderoom.strategy.enums.RouletteType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.enums.SpotGenerateType;

import lombok.Getter;

import java.util.function.Consumer;

public abstract class BaseSpotSupplier implements SpotSupplier {
    @Getter
    private final SpotGenerateType generateType;
    @Getter
    private final RouletteType rouletteType;
    @Getter
    private final long max;
    private long counter;

    protected BaseSpotSupplier(RouletteType rouletteType, SpotGenerateType generateType, long max) {
        if (max <= 0) {
            throw new IllegalArgumentException("max must be > 0");
        }
        this.generateType = generateType;
        this.rouletteType = rouletteType;
        this.max = max;
    }

    @Override
    public Spot get() {
        if (!hasNext()) {
            throw new IllegalStateException("The generation limit has been reached: " + getCount() + " / " + getMax());
        }
        incrementCounter();
        return getInternal();
    }

    protected abstract Spot getInternal();

    @Override
    public boolean apply(Consumer<Spot> consumer) {
        if (!hasNext()) {
            return false;
        }
        Spot spot = get();
        consumer.accept(spot);
        return true;
    }

    public boolean hasNext() {
        return counter < max;
    }

    public long getRemaining() {
        return Math.max(0, max - counter);
    }

    public long getCount() {
        return counter;
    }

    public void setCount(long count) {
        this.counter = count;
    }

    protected void incrementCounter() {
        counter++;
    }

    public void reset() {
        counter = 0;
    }
}
