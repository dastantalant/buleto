package com.traderoom.strategy.api;

import com.traderoom.strategy.model.context.Snapshot;

import java.io.Serializable;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.LinkedList;

public interface Subscriber extends Serializable {

    void onRound(Snapshot snapshot);

    default void onGameEnd(Snapshot snapshot) {
    }

    default Deque<Snapshot> deque() {
        return new LinkedList<>();
    }

    static Subscriber storage() {
        return new Storage(new ArrayDeque<>());
    }

    record Storage(Deque<Snapshot> deque) implements Subscriber {
        public void onRound(Snapshot snapshot) {
            deque.addLast(snapshot);
        }

        public void onGameEnd(Snapshot snapshot) {
            deque.addLast(snapshot);
        }
    }
}