package com.buleto.web.repository;

import com.buleto.common.entity.ConfigEntity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ConfigRepository extends JpaRepository<ConfigEntity, Long> {
}
