package com.buleto.web.service.impl;

import com.buleto.common.entity.ConfigEntity;
import com.buleto.common.mapper.ConfigMapper;
import com.buleto.web.service.ConfigService;
import com.buleto.web.service.RoundService;
import com.buleto.web.service.SimulateService;
import com.buleto.common.strategy.StrategyEnum;
import com.trading.roulette.api.StrategyFactory;
import com.trading.roulette.api.IStrategy;
import com.trading.roulette.api.runner.web.WebSimulateResult;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.util.Deque;
import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class SimulateServiceImpl implements SimulateService {

    private final ConfigService configService;
    private final RoundService roundService;

    @Override
    public Deque<WebSimulateResult> simulate(long configId, long max) {
        var configEntity = configService.findById(configId);
        var list = extractClass(configEntity);
        var rawConfig = ConfigMapper.INSTANCE.toConfig(configEntity.getPayload());
        return StrategyFactory.webSimulatorManager(list, rawConfig, max).run();
    }

    @Override
    public Deque<WebSimulateResult> simulate(long configId, long from, long to) {
        var deque = roundService.findCellByIdBetweenOrderByIdAsc(from, to);
        var configEntity = configService.findById(configId);
        var list = extractClass(configEntity);
        var rawConfig = ConfigMapper.INSTANCE.toConfig(configEntity.getPayload());
        return StrategyFactory.webSimulatorManager(list, rawConfig, deque).run();
    }

    private Set<Class<? extends IStrategy>> extractClass(ConfigEntity configEntity) {
        Set<Class<? extends IStrategy>> set = HashSet.newHashSet(configEntity.getStrategies().size());
        for (StrategyEnum strategyEnum : configEntity.getStrategies()) {
            Class<? extends IStrategy> clazz = strategyEnum.getClazz();
            set.add(clazz);
        }
        return set;
    }
}
