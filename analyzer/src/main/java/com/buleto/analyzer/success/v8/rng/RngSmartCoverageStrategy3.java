package com.buleto.analyzer.success.v8.rng;

import com.trading.roulette.api.AbstractStrategy;
import com.trading.roulette.api.annotation.Strategy;
import com.trading.roulette.api.enums.Spot;
import com.trading.roulette.api.model.Bet;
import com.trading.roulette.api.model.config.Config;
import com.trading.roulette.api.utils.BetHelper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

    @Strategy(name = "RNG V11 Phoenix")
    public class RngSmartCoverageStrategy3 extends AbstractStrategy {

        private static final int WINDOW_SIZE = 37;
        private final List<Spot> history = new ArrayList<>(50);

        // Флаг: если true, играем супер-аккуратно
        private final boolean survivalMode;

        // Конструктор по умолчанию (для обычного Runner.of)
        public RngSmartCoverageStrategy3(Config config) {
            this(config, false);
        }

        public RngSmartCoverageStrategy3(Config config, boolean survivalMode) {
            super(config);
            this.survivalMode = survivalMode;
        }

        @Override
        protected void onRoundCustom(Spot spot, List<Bet> bets) {
            if (spot != null) {
                history.add(spot);
                if (history.size() > WINDOW_SIZE) {
                    history.removeFirst();
                }
            }
        }

        @Override
        public List<Bet> decide() {
            if (history.size() < 20) return List.of();

            Map<Spot, Long> counts = history.stream()
                    .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

            // 1. ДЕТЕКТОР ЭНТРОПИИ (Защита от хаоса)
            // Если уникальных чисел слишком много, значит повторов мало. Не играем.
            long uniqueNumbers = counts.size();
            // В режиме выживания требования жестче (22 вместо 25)
            int chaosLimit = survivalMode ? 22 : 25;

            if (history.size() >= 30 && uniqueNumbers > chaosLimit) {
                return List.of();
            }

            // 2. НАСТРОЙКИ РЕЖИМА
            int maxTargets;
            int minHitsRequired;

            if (survivalMode) {
                // ВЫЖИВАНИЕ: Экономим. Ставим только на "верняк".
                maxTargets = 3;        // Максимум 3 числа (дешево)
                minHitsRequired = 3;   // Число должно быть ОЧЕНЬ горячим (выпасть 3 раза за цикл)
            } else {
                // ОБЫЧНЫЙ: Захват территории
                maxTargets = 7;        // До 7 чисел
                minHitsRequired = 2;   // Достаточно 2 повторов
            }

            // 3. ВЫБОР ЦЕЛЕЙ
            List<Spot> targets = counts.entrySet().stream()
                    .filter(entry -> entry.getValue() >= minHitsRequired)
                    .sorted(Map.Entry.<Spot, Long>comparingByValue().reversed())
                    .limit(maxTargets)
                    .map(Map.Entry::getKey)
                    .toList();

            if (targets.isEmpty()) return List.of();

            // 4. РАСЧЕТ СТАВКИ
            long totalBudget = getMinBet() * targets.size();

            // В выживании никаких бустов
            if (!survivalMode && getVirtualBalance() < getStartBalance() * 0.9) {
                // totalBudget = (long)(totalBudget * 1.1); // Можно включить мягкий буст только в нормале
            }

            totalBudget = Math.min(totalBudget, getMaxBet());
            totalBudget = Math.min(totalBudget, getVirtualBalance()); // Не ва-банк

            long betPerSpot = Math.max(1, totalBudget / targets.size());

            return targets.stream()
                    .map(s -> BetHelper.betting(s, betPerSpot))
                    .toList();
        }
    }