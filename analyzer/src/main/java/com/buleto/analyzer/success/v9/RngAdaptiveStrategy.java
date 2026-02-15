package com.buleto.analyzer.success.v9;

import com.trading.roulette.api.AbstractStrategy;
import com.trading.roulette.api.annotation.Strategy;
import com.trading.roulette.api.enums.Spot;
import com.trading.roulette.api.model.Bet;
import com.trading.roulette.api.model.config.Config;
import com.trading.roulette.api.utils.BetHelper;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Strategy(name = "RNG V13 Chameleon")
public class RngAdaptiveStrategy extends AbstractStrategy {

    private static final int WINDOW = 37;
    private final List<Spot> history = new ArrayList<>(100);

    // Виртуальные счета для тестирования гипотез
    private long virtualScoreTrend = 0;
    private long virtualScoreReversion = 0;

    // Какой режим сейчас побеждает?
    private Mode currentMode = Mode.WAITING;

    private enum Mode {
        TREND_FOLLOWING, // Ставим на Горячие
        MEAN_REVERSION,  // Ставим на Холодные (Те, что давно не падали)
        WAITING          // Рынок непонятен, не ставим
    }

    public RngAdaptiveStrategy(Config config) {
        super(config);
    }

    @Override
    protected void onRoundCustom(Spot spot, List<Bet> bets) {
        if (spot != null) {
            // 1. Сначала проверяем, кто угадал в ПРОШЛОМ раунде (на основе истории ДО добавления spot)
            evaluateVirtualPerformance(spot);

            // 2. Обновляем историю
            history.add(spot);
            if (history.size() > 50) history.removeFirst();
        }
    }

    private void evaluateVirtualPerformance(Spot winningSpot) {
        if (history.size() < 20) return;

        // Генерируем прогнозы, которые БЫЛИ БЫ сделаны в прошлом ходу
        List<Spot> trendTargets = getTrendTargets(history); // Горячие
        List<Spot> reversionTargets = getReversionTargets(history); // Холодные (спящие)

        // Начисляем очки (Симуляция ставки)
        // Если бы ставили 100 монет на 5 чисел: расход 500. Приход 3600. Чистые +3100.
        // Если промах: -500.

        // Очки Тренда
        if (trendTargets.contains(winningSpot)) virtualScoreTrend += 31;
        else if (!trendTargets.isEmpty()) virtualScoreTrend -= 5;

        // Очки Реверсии
        if (reversionTargets.contains(winningSpot)) virtualScoreReversion += 31;
        else if (!reversionTargets.isEmpty()) virtualScoreReversion -= 5;

        // Затухание очков (чтобы реагировать на смену режима ГСЧ)
        // Каждые 10 спинов уменьшаем счетчики на 10%, чтобы старые заслуги забывались
        if (history.size() % 10 == 0) {
            virtualScoreTrend = (long)(virtualScoreTrend * 0.9);
            virtualScoreReversion = (long)(virtualScoreReversion * 0.9);
        }

        // ОПРЕДЕЛЕНИЕ РЕЖИМА
        long diff = virtualScoreTrend - virtualScoreReversion;

        if (virtualScoreTrend > 0 && virtualScoreTrend > virtualScoreReversion + 20) {
            currentMode = Mode.TREND_FOLLOWING;
        } else if (virtualScoreReversion > 0 && virtualScoreReversion > virtualScoreTrend + 20) {
            currentMode = Mode.MEAN_REVERSION;
        } else {
            currentMode = Mode.WAITING; // Лидер не ясен или оба в минусе
        }
    }

    @Override
    public List<Bet> decide() {
        if (history.size() < WINDOW) return List.of();

        // Если адаптер говорит "ЖДАТЬ", мы не рискуем деньгами
        if (currentMode == Mode.WAITING) {
            return List.of();
        }

        List<Spot> targets;
        if (currentMode == Mode.TREND_FOLLOWING) {
            targets = getTrendTargets(history);
        } else {
            targets = getReversionTargets(history);
        }

        if (targets.isEmpty()) return List.of();

        // Ставка
        long totalBudget = getMinBet() * targets.size();
        totalBudget = Math.min(totalBudget, getMaxBet());
        long betPerSpot = Math.max(1, totalBudget / targets.size());

        return targets.stream()
                .map(s -> BetHelper.betting(s, betPerSpot))
                .toList();
    }

    // --- ЛОГИКА ДВИЖКОВ ---

    private List<Spot> getTrendTargets(List<Spot> currentHistory) {
        // Стандартная логика V12: Горячие числа
        Map<Spot, Long> counts = currentHistory.stream()
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

        return counts.entrySet().stream()
                .filter(e -> e.getValue() >= 2) // Минимум 2 повтора
                .sorted(Map.Entry.<Spot, Long>comparingByValue().reversed())
                .limit(5)
                .map(Map.Entry::getKey)
                .toList();
    }

    private List<Spot> getReversionTargets(List<Spot> currentHistory) {
        // Логика "Против толпы": Ищем числа, которые НЕ выпадали в окне 37,
        // но начали "просыпаться" (выпали 1 раз недавно) или "спящие гиганты".
        // Для простоты: берем числа, которые вообще не выпадали в последних 30 спинах (Cold),
        // это ловит "Correction Phase" генератора.

        Set<Spot> appeared = new HashSet<>(currentHistory.subList(Math.max(0, currentHistory.size() - 30), currentHistory.size()));
        List<Spot> allSpots = Spot.getAvailableList(getConfig().rouletteType());

        List<Spot> missing = allSpots.stream()
                .filter(s -> !appeared.contains(s))
                .collect(Collectors.toList());

        // Чтобы не ставить на все 15 холодных, выбираем случайно или по соседям.
        // Для стабильности: берем 5 случайных "Холодных" (или по очереди).
        // В ГСЧ лучше ставить на те, которые "Задолжал" генератор.
        Collections.shuffle(missing, new Random(currentHistory.size())); // Псевдо-рандом для ротации
        return missing.stream().limit(5).toList();
    }
}