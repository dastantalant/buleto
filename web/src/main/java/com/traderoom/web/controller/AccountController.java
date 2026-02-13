package com.traderoom.web.controller;

import com.traderoom.common.entity.AccountEntity;
import com.traderoom.common.model.request.AccountRequest;
import com.traderoom.web.service.AccountService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService service;

    @GetMapping
    public Page<AccountEntity> findAll(Pageable pageable) {
        return service.findAll(pageable);
    }

    @PostMapping
    public AccountEntity save(@RequestBody AccountRequest request) {
        return service.save(request);
    }

    @PutMapping("/{id}")
    public AccountEntity update(@PathVariable long id,  @RequestBody AccountRequest request) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id) {
        service.delete(id);
    }
}
