package com.traderoom.monitoring.sandbox.playwright.model;

import java.time.Instant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class State<T> {
    private static final Logger LOGGER = LoggerFactory.getLogger(State.class);
    private final Timeline timeline;
    private final Grid<T> grid;
    private final BulletWave<T> bulletWave;
    private final CanTimer<T> canTimer;
    private Cell<T> lastVictory;
    private boolean saved;

    public State(Timeline timeline, Grid<T> grid, BulletWave<T> bulletWave, CanTimer<T> canTimer) {
        this.timeline = timeline;
        this.grid = grid;
        this.bulletWave = bulletWave;
        this.canTimer = canTimer;
    }

    public TimerState fix() {
        byte time = canTimer.getTime();
        TimerState state = canTimer.getState();
        double wave = bulletWave.getWave();

        if (state == TimerState.NONE) {
            return state;
        }

        if (state == TimerState.INIT) {
            update();
            saved = false;
            timeline.set(System.currentTimeMillis(), wave);
            return state;
        }

        if (state == TimerState.RED && time < 2) {
            Cell<T> current = grid.getVictoryCell();
            if (current != null) {
                if (!saved && (lastVictory == null || !current.equals(lastVictory))) {
                    lastVictory = current;
                    timeline.bullet(System.currentTimeMillis(), wave);
                    LOGGER.info("VICTORY: {}, {}",current,  Instant.now());
                    return TimerState.VICTORY;
                }
                return TimerState.RED;
            }
        }

        timeline.set(System.currentTimeMillis(), wave);
        return state;
    }

    public void update() {
        grid.update();
        timeline.reset();
        lastVictory = null;
        saved = false;
    }

    public Timeline getTimeline() {
        return timeline;
    }

    public Grid<T> getGrid() {
        return grid;
    }

    public void setSaved(boolean saved) {
        this.saved = saved;
    }

    public void saved() {
        saved = true;
    }

    public boolean isSaved() {
        return saved;
    }

}