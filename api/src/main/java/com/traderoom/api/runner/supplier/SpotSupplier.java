package com.traderoom.api.runner.supplier;

import com.traderoom.api.enums.RouletteType;
import com.traderoom.api.enums.Spot;

import java.util.function.Consumer;

public interface SpotSupplier {

    Spot get();

    RouletteType getRouletteType();

    boolean hasNext();

    boolean apply(Consumer<Spot> consumer);

    long getRemaining();

    long getCount();

    long getMax();

    void reset();
}
