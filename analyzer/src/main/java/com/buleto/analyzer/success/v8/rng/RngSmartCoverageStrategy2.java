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
    public class RngSmartCoverageStrategy2 extends AbstractStrategy {

        private static final int WINDOW_SIZE = 37;
        private final List<Spot> history = new ArrayList<>(50);

        // Флаг режима выживания (включается после Rebuy)
        private final boolean survivalMode;

        public RngSmartCoverageStrategy2(Config config) {
            // По умолчанию выживание выключено
            this(config, false);
        }

        public RngSmartCoverageStrategy2(Config config, boolean survivalMode) {
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

            // 1. ДЕТЕКТОР ЭНТРОПИИ
            long uniqueNumbers = counts.size();
            // В режиме выживания мы еще более придирчивы к хаосу (23 вместо 25)
            int entropyLimit = survivalMode ? 23 : 25;

            if (history.size() >= 30 && uniqueNumbers > entropyLimit) {
                return List.of();
            }

            // 2. НАСТРОЙКИ ФИЛЬТРАЦИИ
            int maxTargets;
            int minHitsRequired;

            if (survivalMode) {
                // ВЫЖИВАНИЕ: Экономим деньги. Ставим только на "верняк".
                maxTargets = 4;        // Максимум 4 числа
                minHitsRequired = 3;   // Число должно быть ОЧЕНЬ горячим
            } else {
                // ОБЫЧНЫЙ: Агрессивный захват территории
                maxTargets = 7;
                minHitsRequired = 2;
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

            // В режиме выживания категорически запрещены любые множители риска
            if (!survivalMode && getVirtualBalance() < getStartBalance() * 0.9) {
                // Мягкий буст только в обычном режиме
                // totalBudget = (long)(totalBudget * 1.1);
            }

            totalBudget = Math.min(totalBudget, getMaxBet());
            totalBudget = Math.min(totalBudget, getVirtualBalance());

            long betPerSpot = Math.max(1, totalBudget / targets.size());

            return targets.stream()
                    .map(s -> BetHelper.betting(s, betPerSpot))
                    .toList();
        }
    }