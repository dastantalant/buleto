package com.buleto.web.service;

import com.trading.roulette.api.runner.web.WebSimulateResult;

import java.util.Deque;

public interface SimulateService {

    Deque<WebSimulateResult> simulate(long configId, long max);

    Deque<WebSimulateResult> simulate(long configId, long from, long to);
}
