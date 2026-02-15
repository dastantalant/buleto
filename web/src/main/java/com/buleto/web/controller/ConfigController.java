package com.buleto.web.controller;

import com.buleto.common.entity.ConfigEntity;
import com.buleto.common.model.request.ConfigRequest;
import com.buleto.web.service.ConfigService;

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
@RequestMapping("/api/config")
@RequiredArgsConstructor
public class ConfigController {
    private final ConfigService service;

    @GetMapping
    public Page<ConfigEntity> findAll(Pageable pageable) {
        return service.findAll(pageable);
    }

    @PostMapping
    public ConfigEntity save(@RequestBody ConfigRequest request) {
        return service.save(request);
    }

    @PutMapping("/{id}")
    public ConfigEntity update(@PathVariable long id, @RequestBody ConfigRequest request) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable long id) {
        service.delete(id);
    }
}
