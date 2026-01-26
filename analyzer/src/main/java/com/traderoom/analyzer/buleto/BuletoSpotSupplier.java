package com.traderoom.analyzer.buleto;

import com.traderoom.strategy.simulate.QueueSpotSupplier;
import com.traderoom.strategy.simulate.SpotSupplier;

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