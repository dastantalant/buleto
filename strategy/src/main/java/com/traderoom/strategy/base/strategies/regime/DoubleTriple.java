package com.traderoom.strategy.base.strategies.regime;

import lombok.Getter;

@Getter
public class DoubleTriple {
    private final double first;
    private final double second;
    private final double third;

    public DoubleTriple(double first, double second, double third) {
        this.first = first;
        this.second = second;
        this.third = third;
    }

    public static DoubleTriple of(double first, double second, double third) {
        return new DoubleTriple(first, second, third);
    }

    public static DoubleTriple of() {
        return new DoubleTriple(0.0, 0.0, 0.0);
    }
}
