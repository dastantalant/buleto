package com.traderoom.web.controller;

import com.traderoom.common.model.RoundModel;
import com.traderoom.web.service.RoundService;

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

import java.util.List;

@RestController
@RequestMapping("/api/round")
@RequiredArgsConstructor
public class RoundController {
    private final RoundService service;

    @GetMapping
    public Page<RoundModel> findAll(Pageable pageable) {
        return service.findAll(pageable);
    }

    @PostMapping
    public List<RoundModel> save(@RequestBody List<RoundModel> request) {
        return service.save(request);
    }

    @PutMapping("/{id}")
    public RoundModel update(@PathVariable long id, @RequestBody RoundModel request) {
        return service.update(id, request);
    }

    @PutMapping("/batch")
    public List<RoundModel> update(@RequestBody List<RoundModel> request) {
        return service.update(request);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable long id) {
        service.delete(id);
    }
}
