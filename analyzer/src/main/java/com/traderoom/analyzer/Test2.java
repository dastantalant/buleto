package com.traderoom.analyzer;

import com.traderoom.api.StrategyFactory;
import com.traderoom.api.IStrategy;
import com.traderoom.api.model.config.RawConfig;
import com.traderoom.api.StrategyContext;
import com.traderoom.api.enums.RouletteType;
import com.traderoom.api.enums.GenerateType;
import com.traderoom.api.runner.SimulateResult;
import com.traderoom.api.runner.SimulatorManager;

import java.util.Comparator;
import java.util.Deque;
import java.util.HashSet;
import java.util.Set;

public class Test2 {

    public static void main(String[] args) {
        // 1. Настройка окружения
        RawConfig config = RawConfig.builder()
                .name("SelectionTournament")
                .type(RouletteType.EUROPEAN)
                .startBalance(10_000L)
                .minBet(10L)
                .maxBet(2_000L)
                .tableLimit(5_000L)
                .maxRoundsStop(2_000L) // Длинная дистанция
                .normalZoneBetCapRisk(10) // Разрешаем ставки до 10% от банка
                .build();

        // 2. Выбор кандидатов (Можно взять StrategyContext.getAll(), но лучше выбрать интересные)
        // Если хотите протестировать ВСЕ, используйте: StrategyContext.getAll()
        Set<Class<? extends IStrategy>> candidates = new HashSet<>(StrategyContext.getAll());

        System.out.println("Запуск симуляции для " + candidates.size() + " стратегий...");

        // 3. Запуск через Shared Manager (одинаковые спины для всех)
        SimulatorManager manager = StrategyFactory.simulatorManager(
                candidates,
                config,
                GenerateType.RANDOM, // Или ROTATION_NUMBER для проверки физики
                2_000L // Количество спинов
        );

        Deque<SimulateResult> results = manager.run();

        // 4. Анализ и вывод ТОП-3
        System.out.println("\n--- РЕЗУЛЬТАТЫ (Сортировка по ROI) ---");

        results.stream()
                .sorted(Comparator.comparingDouble((SimulateResult r) ->
                        r.runnerResult().snapshot().roiPercentage()).reversed())
                .forEach(Test2::printStats);

        // 5. Поиск самой безопасной (Profit Factor > 1.0 и минимальная просадка)
        System.out.println("\n--- САМЫЕ БЕЗОПАСНЫЕ (Profit > 0, Мин. просадка) ---");
        results.stream()
                .filter(r -> r.runnerResult().snapshot().netProfit() > 0)
                .sorted(Comparator.comparingDouble((SimulateResult r) ->
                        r.runnerResult().snapshot().maxDrawdown()))
                .forEach(Test2::printStats);
    }

    private static void printStats(SimulateResult result) {
        var snap = result.runnerResult().snapshot();
        System.out.printf(
                "Strategy: %-30s | Profit: %7d | ROI: %6.2f%% | Drawdown: %5.2f%% | WinRate: %5.2f%% | PF: %4.2f%n",
                result.strategy(),
                snap.netProfit(),
                snap.roiPercentage(),
                snap.maxDrawdown(),
                snap.winRatePercentage(),
                snap.profitFactor()
        );
    }
    public RawConfig createOptimalConfig() {
        return RawConfig.builder()
                .name("Benchmark Configuration")
                .type(RouletteType.AMERICAN) // Лучше чем AMERICAN (меньше преимущество казино)
                .startBalance(10_000L)            // Стартовый баланс
                .minBet(10L)                 // Минимальная ставка
                .maxBet(5_000L)              // Максимальная ставка стола
                .tableLimit(10_000L)              // Лимит стола (суммарный)

                // Условия остановки (Риск-менеджмент)
                .stopLossPercentageStop(50)      // Остановиться, если потеряли 50% банка
                .takeProfitPercentageStop(20)    // Остановиться, если заработали 20%
                .maxDrawdownPercentageStop(30)   // Остановиться при просадке 30% от пика

                // Настройки симуляции
                .maxRoundsStop(1_000L)           // Длительность одной сессии

                // Настройки RiskManager (Зоны опасности)
                .dangerZoneThresholdRisk(80)    // Снижать ставки, если баланс упал до 80%
                .profitZoneThresholdRisk(120)    // Агрессивнее, если баланс > 120%
                .normalZoneBetCapRisk(5)      // Макс ставка 5% от банка в нормальном режиме
                .penaltyBoxDurationRisk(10)      // "Отдых" 10 раундов после просадки
                .build();
    }
}
