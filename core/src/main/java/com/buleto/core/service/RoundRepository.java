package com.buleto.core.service;

import com.buleto.core.model.Day;
import com.buleto.core.model.Round;
import com.buleto.core.model.RoundModel;

import java.io.Closeable;
import java.util.Deque;
import java.util.List;

public interface RoundRepository extends Closeable {

    RoundModel save(RoundModel model);

    Round save(Round round);

    void saveAllModels(List<RoundModel> models);

    void saveAll(List<Round> rounds);

    Deque<Round> findAllDeque();

    List<Round> findAll();

    List<Round> findAllBy(long start, long end);

    default List<Round> findAllBy(Day day) {
        return findAllBy(day.start(), day.end());
    }
}
