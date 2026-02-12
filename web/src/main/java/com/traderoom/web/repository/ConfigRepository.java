package com.traderoom.web.repository;

import com.traderoom.web.entity.ConfigEntity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ConfigRepository extends JpaRepository<ConfigEntity, Long> {
}
