package com.buleto.analyzer.example;

import com.trading.roulette.api.enums.RouletteType;
import com.trading.roulette.api.runner.supplier.QueueSpotSupplier;
import com.trading.roulette.api.runner.supplier.SpotSupplier;

import java.util.LinkedList;
import java.util.Queue;

import static com.trading.roulette.api.enums.RouletteType.AMERICAN;
import static com.trading.roulette.api.enums.RouletteType.EUROPEAN;


public class BuletoSpotSupplier extends QueueSpotSupplier {

    public BuletoSpotSupplier(Queue<Integer> data) {
        super(AMERICAN,  data);
    }
    public BuletoSpotSupplier(RouletteType type,Queue<Integer> data) {
        super(type,  data);
    }
    public static SpotSupplier of(Queue<Integer> data) {
        return new BuletoSpotSupplier(data);
    }

    public static SpotSupplier european(Queue<Integer> data) {
        var deque = new LinkedList<Integer>();
        for (Integer item : data) {
            deque.add(item == -1 ? 0 : item);
        }
        return new BuletoSpotSupplier(EUROPEAN, deque);
    }
}