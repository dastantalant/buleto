package com.traderoom.bet.web.service;

import com.traderoom.bet.buleto.model.round.Cell;
import com.traderoom.bet.buleto.model.round.Line;
import com.traderoom.bet.buleto.model.round.Round;
import java.util.Map;

public interface TimelineService {

    boolean save(Round round);

    Long saveTimeline(long unix, double value, Boolean isBullet);

    long updateTimeline(long timelineId, boolean isBullet);

    void saveTimeline(Map<Byte, Line> timeline);

//    Long saveRound(long unix, double value, Map<Byte, Double> cells);

    void saveCell(long roundId, Map<Byte, Cell> cells);

    boolean saveVictory(long timelineId, long cellNumber);

}
