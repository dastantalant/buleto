package com.traderoom.web.service;

import com.traderoom.web.entity.ConfigEntity;
import com.traderoom.web.model.request.ConfigRequest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ConfigService {

    Page<ConfigEntity> findAll(Pageable pageable);

    ConfigEntity findById(long id);

    ConfigEntity save(ConfigRequest request);

    ConfigEntity update(long id, ConfigRequest request);

    void delete(long id);
}
