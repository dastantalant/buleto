package com.traderoom.api.runner;


import com.traderoom.api.model.Snapshot;

import java.util.Deque;

public record RunnerResult(String strategy, Snapshot snapshot, Deque<Snapshot> deque) {
    public static RunnerResult of(String strategy, Snapshot snapshot, Deque<Snapshot> deque) {
        return new RunnerResult(strategy, snapshot, deque);
    }
}