package com.traderoom.monitoring.sandbox.round.service;

import com.traderoom.monitoring.sandbox.round.model.Cell;
import com.traderoom.monitoring.sandbox.round.model.Line;
import com.traderoom.monitoring.sandbox.round.monitor.Round;
import java.util.Map;

public interface TimelineService {

    boolean save(Round round);

    long updateTimeline(long timelineId, boolean isBullet);

    void saveTimeline(Map<Byte, Line> timeline);

    void saveCell(long roundId, Map<Byte, Cell> cells);

    boolean saveVictory(long timelineId, long cellNumber);

}
