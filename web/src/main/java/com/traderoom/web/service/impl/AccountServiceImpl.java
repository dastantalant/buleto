package com.traderoom.web.service.impl;

import com.traderoom.web.entity.AccountEntity;
import com.traderoom.web.mapper.AccountMapper;
import com.traderoom.web.model.request.AccountRequest;
import com.traderoom.web.repository.AccountRepository;
import com.traderoom.web.service.AccountService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import jakarta.persistence.EntityNotFoundException;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    private final AccountRepository repository;

    @Override
    public Page<AccountEntity> findAll(Pageable pageable) {
        // todo find by user
        return repository.findAll(pageable);
    }

    @Override
    public AccountEntity save(AccountRequest request) {
        // todo save with set user
        AccountEntity entity = AccountMapper.toEntity(request);
        return repository.save(entity);
    }

    @Override
    public AccountEntity update(long id, AccountRequest request) {
        // todo where user = user
        AccountEntity entity = repository.findById(id).orElseThrow(EntityNotFoundException::new);
        entity.setUsername(request.getUsername());
        entity.setPassword(request.getPassword());
        return repository.save(entity);
    }

    @Override
    public void delete(long id) {
        // todo where user = user
        repository.deleteById(id);
    }
}
