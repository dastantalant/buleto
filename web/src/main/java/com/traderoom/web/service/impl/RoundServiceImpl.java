package com.traderoom.web.service.impl;

import com.traderoom.common.mapper.RoundMapper;
import com.traderoom.common.model.RoundModel;
import com.traderoom.common.model.RoundShort;
import com.traderoom.web.repository.RoundJdbcRepository;
import com.traderoom.web.repository.RoundRepository;
import com.traderoom.web.service.RoundService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.util.Deque;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoundServiceImpl implements RoundService {
    private final RoundRepository repository;
    private final RoundJdbcRepository jdbcRepository;

    @Override
    public Page<RoundModel> findAll(Pageable pageable) {
        var all = repository.findAll(pageable);
        return all.map(RoundMapper::toModel);
    }

    @Override
    public List<RoundModel> save(List<RoundModel> request) {
        jdbcRepository.saveAllModel(request);
        return request;
    }

    @Override
    public RoundModel update(long id, RoundModel request) {
        jdbcRepository.saveModel(request);
        return request;
    }

    @Override
    public List<RoundModel> update(List<RoundModel> request) {
        jdbcRepository.saveAllModel(request);
        return request;
    }

    @Override
    public void delete(long id) {
        repository.deleteById(id);
    }

    @Override
    public Deque<Integer> findCellByIdBetweenOrderByIdAsc(long from, long to) {
        return repository.findCellByIdBetweenOrderByIdAsc(from, to);
    }

    @Override
    public Deque<RoundShort> findByIdBetweenOrderByIdAsc(long from, long to) {
        return repository.findByIdBetweenOrderByIdAsc(from, to);
    }
}
