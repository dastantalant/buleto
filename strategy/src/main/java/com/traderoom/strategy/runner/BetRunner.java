package com.traderoom.strategy.runner;

import com.traderoom.strategy.api.IStrategy;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.context.Snapshot;
import com.traderoom.strategy.model.context.State;

import java.util.Objects;
import java.util.UUID;

public class BetRunner implements IRunner {
    private final UUID id = UUID.randomUUID();

    private final IStrategy strategy;
    private final State state;
    private Snapshot snapshot;
    private boolean lastApplied;

    public BetRunner(IStrategy strategy) {
        this.strategy = strategy;
        state = State.of(strategy.getStartBalance());
    }

    public static IRunner of(IStrategy strategy) {
        return new BetRunner(strategy);
    }

    @Override
    public Snapshot apply(Spot spot) {
        if (canContinue()) {
            snapshot = strategy.playTurn(spot, state);
        }
        return snapshot;
    }

    @Override
    public Snapshot snapshot() {
        snapshot = strategy.snapshot();
        return snapshot;
    }

    @Override
    public boolean canContinue() {
        lastApplied = strategy.canContinue(state);
        return lastApplied;
    }

    @Override
    public boolean isLastApplied() {
        return lastApplied;
    }

    @Override
    public State getState() {
        return state;
    }

    @Override
    public Snapshot stop() {
        return strategy.endGame(state);
    }

    @Override
    public boolean isStopped() {
        return strategy.isStopped();
    }

    @Override
    public final int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public final boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        BetRunner that = (BetRunner) obj;
        return Objects.equals(id, that.id);
    }
}
