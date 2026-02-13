package com.traderoom.web.repository;

import com.traderoom.common.entity.ConfigEntity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ConfigRepository extends JpaRepository<ConfigEntity, Long> {
}
