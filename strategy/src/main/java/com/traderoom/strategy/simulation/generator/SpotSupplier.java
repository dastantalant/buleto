package com.traderoom.strategy.simulation.generator;

import com.traderoom.strategy.enums.RouletteType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.enums.SpotGenerateType;

import java.util.function.Consumer;

public interface SpotSupplier {

    Spot get();

    RouletteType getRouletteType();

    SpotGenerateType getGenerateType();

    boolean hasNext();

    boolean apply(Consumer<Spot> consumer);

    long getRemaining();

    long getCount();

    long getMax();

    void reset();
}
