package com.traderoom.web.service;

import com.traderoom.common.entity.AccountEntity;
import com.traderoom.common.model.request.AccountRequest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AccountService {
    Page<AccountEntity> findAll(Pageable pageable);

    AccountEntity save(AccountRequest request);

    AccountEntity update(long id, AccountRequest request);

    void delete(long id);
}
