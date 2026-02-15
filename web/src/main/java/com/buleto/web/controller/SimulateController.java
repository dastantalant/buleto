package com.buleto.web.controller;

import com.buleto.web.service.SimulateService;
import com.trading.roulette.api.runner.web.WebSimulateResult;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import java.util.Deque;

@RestController
@RequestMapping("/api/simulate")
@RequiredArgsConstructor
public class SimulateController {

    private final SimulateService service;

    @GetMapping("/config/{id}")
    public Deque<WebSimulateResult> simulate(@PathVariable long id, @RequestParam long max) {
        return service.simulate(id, max);
    }

    @GetMapping("/config/{id}/round")
    public Deque<WebSimulateResult> simulate(@PathVariable long id, @RequestParam long from, @RequestParam long to) {
        return service.simulate(id, from, to);
    }
}
