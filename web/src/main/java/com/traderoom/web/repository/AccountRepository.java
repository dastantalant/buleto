package com.traderoom.web.repository;

import com.traderoom.web.entity.AccountEntity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<AccountEntity, Long> {
}
