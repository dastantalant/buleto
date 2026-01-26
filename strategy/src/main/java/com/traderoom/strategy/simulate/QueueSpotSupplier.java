package com.traderoom.strategy.simulate;

import com.traderoom.strategy.enums.RouletteType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.enums.SpotGenerateType;

import java.util.LinkedList;
import java.util.Queue;

public class QueueSpotSupplier extends BaseSpotSupplier {
    private Queue<Integer> data;
    private final Queue<Integer> original;

    public QueueSpotSupplier(RouletteType rouletteType, SpotGenerateType generateType, Queue<Integer> data) {
        super(rouletteType, generateType, data.size());
        this.data = new LinkedList<>(data);
        this.original = new LinkedList<>(data);
    }

    @Override
    protected Spot getInternal() {
        if (data.isEmpty()) {
            return null;
        }
        return Spot.getByNumber(data.poll());
    }

    @Override
    public void reset() {
        data.clear();
        data = new LinkedList<>(original);
    }
}
