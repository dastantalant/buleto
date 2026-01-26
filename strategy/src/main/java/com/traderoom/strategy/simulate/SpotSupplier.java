package com.traderoom.strategy.simulate;

import com.traderoom.strategy.enums.RouletteType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.enums.SpotGenerateType;

import java.io.Serializable;
import java.util.function.Consumer;

public interface SpotSupplier  extends Serializable {

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
