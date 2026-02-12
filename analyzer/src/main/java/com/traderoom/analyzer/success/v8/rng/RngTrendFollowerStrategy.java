package com.traderoom.analyzer.success.v8.rng;

import com.traderoom.api.AbstractStrategy;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.enums.Color;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.utils.BetHelper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Strategy(name = "RNG V12 Trend Follower")
public class RngTrendFollowerStrategy extends AbstractStrategy {

    // Храним историю побольше (100 спинов) для определения глобального тренда
    private static final int TREND_WINDOW = 100;
    private static final int HOT_WINDOW = 37; // Окно для поиска горячих чисел

    private final List<Spot> history = new ArrayList<>(150);

    public RngTrendFollowerStrategy(Config config) {
        super(config);
    }

    @Override
    protected void onRoundCustom(Spot spot, List<Bet> bets) {
        if (spot != null) {
            history.add(spot);
            if (history.size() > TREND_WINDOW) {
                history.removeFirst();
            }
        }
    }

    @Override
    public List<Bet> decide() {
        if (history.size() < 37) return List.of();

        // 1. ОПРЕДЕЛЯЕМ ГЛОБАЛЬНЫЙ ТРЕНД (Color Bias)
        long redCount = history.stream().filter(Spot::isRed).count();
        long blackCount = history.stream().filter(Spot::isBlack).count();

        Color dominantColor = null;
        // Если перекос существенный (более 10% разницы)
        if (blackCount > redCount * 1.1) dominantColor = Color.BLACK;
        else if (redCount > blackCount * 1.1) dominantColor = Color.RED;

        // 2. ИЩЕМ ГОРЯЧИЕ ЧИСЛА (в окне 37)
        List<Spot> shortHistory = history.subList(Math.max(0, history.size() - HOT_WINDOW), history.size());

        Map<Spot, Long> counts = shortHistory.stream()
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

        // 3. ФИЛЬТРАЦИЯ И ПРИОРИТЕТИЗАЦИЯ
        Color finalDominantColor = dominantColor;

        List<Spot> targets = counts.entrySet().stream()
                .filter(entry -> entry.getValue() >= 2) // Базовый фильтр (минимум 2 повтора)
                .sorted((e1, e2) -> {
                    // СЛОЖНАЯ СОРТИРОВКА:
                    // Сначала сравниваем количество выпадений
                    int compareCount = e2.getValue().compareTo(e1.getValue());
                    if (compareCount != 0) return compareCount;

                    // Если количество равно, побеждает тот, кто совпадает с Трендом Цвета
                    if (finalDominantColor != null) {
                        boolean e1Matches = e1.getKey().getColor() == finalDominantColor;
                        boolean e2Matches = e2.getKey().getColor() == finalDominantColor;
                        if (e1Matches && !e2Matches) return -1; // e1 лучше
                        if (!e1Matches && e2Matches) return 1;  // e2 лучше
                    }
                    return 0;
                })
                .limit(5) // Берем Топ-5
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());

        // Если целей нет - выход
        if (targets.isEmpty()) return List.of();

        // 4. УМНАЯ СТАВКА
        // Если число совпадает с трендом -> Ставим 100% ставки
        // Если число против тренда (но горячее) -> Ставим 50% ставки (страховка)

        long baseBet = getMinBet();
        // Защита от просадки (V11)
        long totalBudgetLimit = getVirtualBalance();

        List<Bet> bets = new ArrayList<>();

        for (Spot spot : targets) {
            long spotBet = baseBet;

            // Если есть сильный тренд, и число НЕ совпадает с ним -> уменьшаем ставку
            if (finalDominantColor != null && spot.getColor() != finalDominantColor && spot.getColor() != Color.GREEN) {
                spotBet = Math.max(1, baseBet / 2);
            }

            // Проверка лимитов
            if (spotBet > getMaxBet()) spotBet = getMaxBet();

            bets.add(BetHelper.betting(spot, spotBet));
        }

        // Финальная проверка бюджета
        long totalReq = BetHelper.getTotalBetValue(bets);
        if (totalReq > totalBudgetLimit) {
            return List.of(); // Не хватает денег - пропускаем
        }

        return bets;
    }
}