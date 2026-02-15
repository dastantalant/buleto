package com.buleto.web.service.impl;

import com.buleto.common.entity.ConfigEntity;
import com.buleto.common.mapper.ConfigMapper;
import com.buleto.common.model.request.ConfigRequest;
import com.buleto.web.repository.ConfigRepository;
import com.buleto.web.service.ConfigService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import jakarta.persistence.EntityNotFoundException;

@Service
@RequiredArgsConstructor
public class ConfigServiceImpl implements ConfigService {
    private final ConfigRepository repository;

    @Override
    public Page<ConfigEntity> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Override
    public ConfigEntity findById(long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public ConfigEntity save(ConfigRequest request) {
        return repository.save(ConfigMapper.INSTANCE.toEntity(request));
    }

    @Override
    public ConfigEntity update(long id, ConfigRequest request) {
        ConfigEntity entity = repository.findById(id).orElseThrow(EntityNotFoundException::new);
        entity.setPayload(request.getPayload());
        entity.setStrategies(request.getStrategies());
        return repository.save(entity);
    }

    @Override
    public void delete(long id) {
        repository.deleteById(id);
    }
}
