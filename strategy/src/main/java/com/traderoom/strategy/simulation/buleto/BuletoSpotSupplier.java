package com.traderoom.strategy.simulation.buleto;

import com.traderoom.strategy.simulation.generator.QueueSpotSupplier;
import com.traderoom.strategy.simulation.generator.SpotSupplier;

import java.util.Queue;

import static com.traderoom.strategy.enums.RouletteType.AMERICAN;
import static com.traderoom.strategy.enums.SpotGenerateType.RANDOM;

public class BuletoSpotSupplier extends QueueSpotSupplier {

    public BuletoSpotSupplier(Queue<Integer> data) {
        super(AMERICAN, RANDOM, data);
    }

    public static SpotSupplier of(Queue<Integer> data) {
        return new BuletoSpotSupplier(data);
    }
}