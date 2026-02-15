package com.buleto.analyzer.success.v8.rng;

import com.trading.roulette.api.AbstractStrategy;
import com.trading.roulette.api.annotation.Strategy;
import com.trading.roulette.api.enums.Spot;
import com.trading.roulette.api.model.Bet;
import com.trading.roulette.api.model.config.Config;
import com.trading.roulette.api.utils.BetHelper;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Strategy
public class RngSniperStrategy extends AbstractStrategy {

    private final List<Spot> localHistory = new ArrayList<>(200);
    private final int wait;
    private final int attack;
    private final int limit;

    private int sessionRound = 0;
    private List<Spot> targetSpots = new ArrayList<>();

    private boolean hitWinInAttack = false;

    public RngSniperStrategy(Config config) {
        this(config, 120, 10, 3);
    }

    public RngSniperStrategy(Config config, int wait, int attack, int limit) {
        super(config);
        this.wait = wait;
        this.attack = attack;
        this.limit = limit;
    }

    @Override
    protected void onRoundCustom(Spot spot, List<Bet> bets) {
        if (spot != null) {
            localHistory.add(spot);
        }
    }

    @Override
    public List<Bet> decide() {
        sessionRound++;

        // 1. ФАЗА ОЖИДАНИЯ
        if (sessionRound <= wait) {
            return List.of();
        }

        // 2. МОМЕНТ АНАЛИЗА (Первый спин после ожидания)
        if (sessionRound == wait + 1) {
            analyzeAndSelectTargets();
            // Если целей нет - сразу сброс, не тратим время
            if (targetSpots.isEmpty()) {
                resetCycle();
                return List.of();
            }
        }

        // 3. ФАЗА АТАКИ
        if (sessionRound <= wait + attack) {
            // Проверка на победу в прошлом спине (Hit and Run)
            if (isLastBetWon()) {
                // Мы выиграли! Забираем прибыль и уходим в новый цикл ожидания
                resetCycle();
                return List.of();
            }

            if (targetSpots.isEmpty()) return List.of();

            // РАСЧЕТ СТАВКИ
            // Используем фиксированную ставку.
            // Для ГСЧ Снайпера лучше флэт или очень мягкий догон (Мартингейл тут опасен)
            long betAmount = getMinBet();

            // Если глубокая просадка, можно чуть увеличить (но не более чем в 2 раза от базы)
            if (getVirtualBalance() < getStartBalance() * 0.9) {
                betAmount = (long)(betAmount * 1.5);
            }

            // Лимиты
            betAmount = Math.min(betAmount, getMaxBet());
            betAmount = Math.min(betAmount, getVirtualBalance() / targetSpots.size()); // Защита от All-in

            long finalBet = betAmount;
            return targetSpots.stream()
                    .map(spot -> BetHelper.betting(spot, finalBet))
                    .toList();
        }

        // 4. КОНЕЦ АТАКИ (Не повезло)
        resetCycle();
        return List.of();
    }

    private void analyzeAndSelectTargets() {
        Map<Spot, Long> counts = localHistory.stream()
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

        targetSpots = counts.entrySet().stream()
                .sorted(Map.Entry.<Spot, Long>comparingByValue().reversed())
                .limit(limit)
                .map(Map.Entry::getKey)
                .toList();

        if (targetSpots.isEmpty()) return;

        // Фильтр: Лидер должен выпасть хотя бы 4 раза за 120 спинов (3.24 - среднее)
        // Если меньше 4 - значит рынок "плоский", явных лидеров нет.
        long leaderCount = counts.getOrDefault(targetSpots.getFirst(), 0L);
        if (leaderCount < 4) {
            targetSpots = Collections.emptyList();
        }
    }

    private void resetCycle() {
        sessionRound = 0;
        localHistory.clear();
        targetSpots = Collections.emptyList();
        hitWinInAttack = false;
    }
}