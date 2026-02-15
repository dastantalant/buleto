package com.buleto.web.repository;

import com.buleto.common.entity.AccountEntity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<AccountEntity, Long> {
}
