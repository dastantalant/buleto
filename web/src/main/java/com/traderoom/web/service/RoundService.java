package com.traderoom.web.service;

import com.traderoom.common.model.RoundModel;
import com.traderoom.common.model.RoundShort;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Deque;
import java.util.List;

public interface RoundService {

    Page<RoundModel> findAll(Pageable pageable);

    List<RoundModel> save(List<RoundModel> request);

    RoundModel update(long id, RoundModel request);

    List<RoundModel> update(List<RoundModel> request);

    void delete(long id);


    Deque<Integer> findCellByIdBetweenOrderByIdAsc(long from, long to);
    Deque<RoundShort> findByIdBetweenOrderByIdAsc(long from, long to);

}
