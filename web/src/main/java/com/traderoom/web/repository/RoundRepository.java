package com.traderoom.web.repository;

import com.traderoom.web.entity.RoundEntity;
import com.traderoom.web.model.RoundShort;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Deque;

public interface RoundRepository extends JpaRepository<RoundEntity, Long> {

    Deque<Integer> findCellByIdBetweenOrderByIdAsc(long from, long to);

    Deque<RoundShort> findByIdBetweenOrderByIdAsc(long from, long to);

}
