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
public class RngSmartCoverageStrategy extends AbstractStrategy {

    // Окно анализа = 1 цикл рулетки (37 спинов)
    private static final int WINDOW_SIZE = 37;
    // Максимум чисел для ставки (чтобы не размазывать профит)
    private static final int MAX_TARGETS = 7;

    private final List<Spot> history = new ArrayList<>(50);

    public RngSmartCoverageStrategy(Config config) {
        super(config);
    }

    @Override
    protected void onRoundCustom(Spot spot, List<Bet> bets) {
        if (spot != null) {
            history.add(spot);
            // Поддерживаем размер окна ровно 37
            if (history.size() > WINDOW_SIZE) {
                history.removeFirst();
            }
        }
    }

    @Override
    public List<Bet> decide() {
        // 1. Прогрев: Ждем накопления минимум 20 спинов в истории
        if (history.size() < 20) {
            return List.of();
        }

        // 2. Анализ частоты внутри скользящего окна
        Map<Spot, Long> counts = history.stream()
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

        // --- УЛУЧШЕНИЕ V10.1: Детектор ЭНТРОПИИ ---
        // Логика: Если за 30+ спинов выпало слишком много РАЗНЫХ чисел (>25),
        // значит ГСЧ находится в фазе "Разброс". Повторов (Double hits) мало.
        // В такой ситуации лучше не ставить и подождать фазу "Кучности".
        long uniqueNumbers = counts.size();
        if (history.size() >= 30 && uniqueNumbers > 25) {
            return List.of(); // Пропускаем ход, рынок хаотичен
        }

        // 3. Выбор целей: Берем только "Горячие" (>= 2 повторов)
        List<Spot> targets = counts.entrySet().stream()
                .filter(entry -> entry.getValue() >= 2) // Отсеиваем случайные одиночные выпадения
                .sorted(Map.Entry.<Spot, Long>comparingByValue().reversed()) // Сначала лидеры
                .limit(MAX_TARGETS) // Ограничиваемся топ-7 (чтобы не размазывать профит)
                .map(Map.Entry::getKey)
                .toList();

        // Если горячих чисел нет - ждем
        if (targets.isEmpty()) {
            return List.of();
        }

        // 4. Расчет ставки
        // getMinBet() берется из конфига. В системе V3 (Pocket Strategy)
        // он автоматически пересчитывается при создании Runner'а.
        long totalBudgetForSpin = getMinBet() * targets.size();

        // --- УПРАВЛЕНИЕ РИСКОМ ПРИ ПРОСАДКЕ ---
        // Если мы в просадке > 10% (balance < start * 0.9), мы НЕ используем множители.
        // В V10.0 мы умножали на 1.2, но для V3 (с выводом в сейф) важнее выживаемость.
        // Поэтому просто играем базовой ставкой.

        // Защита от превышения лимитов стола (MaxBet)
        totalBudgetForSpin = Math.min(totalBudgetForSpin, getMaxBet());

        // Защита от All-in (не ставить больше, чем есть на виртуальном балансе)
        totalBudgetForSpin = Math.min(totalBudgetForSpin, getVirtualBalance());

        // Распределяем бюджет поровну на все цели
        long betPerSpot = Math.max(1, totalBudgetForSpin / targets.size());

        return targets.stream()
                .map(s -> BetHelper.betting(s, betPerSpot))
                .toList();
    }
}