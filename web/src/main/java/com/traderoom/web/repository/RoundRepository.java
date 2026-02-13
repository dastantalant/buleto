package com.traderoom.web.repository;

import com.traderoom.common.entity.RoundEntity;
import com.traderoom.common.model.RoundShort;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Deque;

public interface RoundRepository extends JpaRepository<RoundEntity, Long> {

    Deque<Integer> findCellByIdBetweenOrderByIdAsc(long from, long to);

    Deque<RoundShort> findByIdBetweenOrderByIdAsc(long from, long to);

}
