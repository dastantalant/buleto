package com.traderoom.monitoring.sandbox.playwright.service;

import com.traderoom.monitoring.sandbox.playwright.model.Cell;
import com.traderoom.monitoring.sandbox.playwright.model.Line;
import com.traderoom.monitoring.sandbox.playwright.model.State;

import java.util.Map;

public interface TimelineService<T> {

    void save(State<T> state);

    long updateTimeline(long timelineId, boolean isBullet);

    void saveTimeline(Map<Byte, Line> timeline);

    void saveCell(long roundId, Map<Byte, Cell<T>> cells);

    boolean saveVictory(long timelineId, long cellNumber);

}
