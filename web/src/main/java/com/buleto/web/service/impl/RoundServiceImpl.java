package com.buleto.web.service.impl;

import com.buleto.common.mapper.RoundMapper;
import com.buleto.core.model.RoundModel;
import com.buleto.common.model.RoundShort;
import com.buleto.core.service.RoundPostgresDAO;
import com.buleto.web.repository.RoundRepository;
import com.buleto.web.service.RoundService;
import com.zaxxer.hikari.HikariDataSource;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Deque;
import java.util.List;

@Service
public class RoundServiceImpl implements RoundService {
    private final RoundRepository repository;
    private final RoundPostgresDAO dao;

    public RoundServiceImpl(RoundRepository repository, HikariDataSource dataSource) {
        this.repository = repository;
        dao = new RoundPostgresDAO(dataSource);
    }

    @Override
    public Page<RoundModel> findAll(Pageable pageable) {
        var all = repository.findAll(pageable);
        return all.map(RoundMapper::toModel);
    }

    @Override
    public List<RoundModel> save(List<RoundModel> request) {
        dao.saveAllModels(request);
        return request;
    }

    @Override
    public RoundModel update(long id, RoundModel request) {
        dao.save(request);
        return request;
    }

    @Override
    public List<RoundModel> update(List<RoundModel> request) {
        dao.saveAllModels(request);
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
