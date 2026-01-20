package com.traderoom.strategy.simulation.buleto;

import com.traderoom.strategy.api.IStrategy;
import com.traderoom.strategy.model.context.Snapshot;
import com.traderoom.strategy.simulation.BetSimulator;
import com.traderoom.strategy.simulation.Simulator;
import com.traderoom.strategy.simulation.generator.ConfigurableSpotSupplier;

import java.util.Queue;

import static com.traderoom.strategy.enums.RouletteType.AMERICAN;
import static com.traderoom.strategy.enums.SpotGenerateType.RANDOM;

public class BuletoSimulator implements Simulator {
    private final Simulator simulator;

    public BuletoSimulator(IStrategy strategy, long max) {
        this(BetSimulator.of(strategy, ConfigurableSpotSupplier.of(AMERICAN, RANDOM, max)));
    }

    public BuletoSimulator(IStrategy strategy, Queue<Integer> data) {
        this(BetSimulator.of(strategy, BuletoSpotSupplier.of(data)));
    }

    public BuletoSimulator(Simulator simulator) {
        this.simulator = simulator;
    }

    public static Simulator of(IStrategy strategy, Queue<Integer> data) {
        return new BuletoSimulator(strategy, data);
    }

    public static Simulator of(IStrategy strategy, long max) {
        return new BuletoSimulator(strategy, max);
    }

    @Override
    public Snapshot run() {
        return simulator.run();
    }
}
