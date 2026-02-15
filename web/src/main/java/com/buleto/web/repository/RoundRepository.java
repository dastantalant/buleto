package com.buleto.web.repository;

import com.buleto.common.entity.RoundEntity;
import com.buleto.common.model.RoundShort;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Deque;

public interface RoundRepository extends JpaRepository<RoundEntity, Long> {

    Deque<Integer> findCellByIdBetweenOrderByIdAsc(long from, long to);

    Deque<RoundShort> findByIdBetweenOrderByIdAsc(long from, long to);

}
