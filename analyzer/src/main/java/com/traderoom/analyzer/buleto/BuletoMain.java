package com.traderoom.analyzer.buleto;

import com.traderoom.core.logging.FastLogger;
import com.traderoom.strategy.ConfigBuilder;
import com.traderoom.strategy.IStrategy;
import com.traderoom.strategy.StrategyFactory;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.simulate.SimulateResult;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


public class BuletoMain {
    static Set<String> set = Set.of("Default",
            "VegasHighRoller",
            "LowBudgetGrinder",
            "StabilityTest",
            "HitAndRun",
            "TrendSurfer",
            "SafetyFirst",
            "TableLimitTrap",
            "ConservativeGrowth",
            "TrailingStopTest",
            "AntiStagnation",
            "Scalper",
            "Marathon",
            "MicroStakes",
            "WinStreakSniper",
            "BadRunProtector");

    //    public static void main(String[] args) throws IOException {
//        String session = DIRECTORY + "\\" + FORMAT.format(new Date());
//        Set<Config> configs = set.stream()
//                .map(CONFIG_HOLDER::get)
//                .filter(Optional::isPresent)
//                .map(Optional::get)
//                .collect(Collectors.toSet());
//        Set<Class<IStrategy>> strategies = StrategyFactory.classes();
//        Deque<Integer> victory = CsvDataLoader.load(VICTORY);
//        long max = 10000L;
//        int repeatCount = 1;
//        BuletoSimulator simulator = new BuletoSimulator(configs, strategies, victory, max);
//        Files.createDirectories(Paths.get(session));
//        ConfigWriter.write(session, configs);
//        FastLogger.info("Starting simulation...");
//        List<SimulateResult> results = simulator.repeat(repeatCount);
//        BuletoWriter.write(session, results);
//        FastLogger.info("Simulation completed.");
//    }

    /**
     * .balance(50_000L)
     * .limits(15L, 15_000L, 15_000L)
     * StraightUpStrategy2: 2098
     * <p>
     * SelfTuningHybridStrategy: 1242
     * HybridPredictorStrategy: 1058
     * <p>
     * AdvancedManager: 489
     * HybridPredictorStrategy: 349
     * TenPercentStrategy: 227
     * <p>
     * SelfTuningHybridStrategy: 1868
     * <p>
     * AdvancedManager: 443
     * RandomStrategy2: 204
     * <p>
     * TierEtToutStrategy: 898
     * DynamicHybridPredictorStrategy: 412
     * EnsemblePredictionStrategy: 134
     * <p>
     * EnsemblePredictionStrategy: 1254
     * TierEtToutStrategy: 1190
     * DynamicHybridPredictorStrategy: 390
     * RandomStrategy2: 301
     * GlobalManager: 287
     * <p>
     * StrategyManager: 452
     * RandomStrategy: 305
     * HybridPredictorStrategy: 285
     * KellyCriterionStrategy: 272
     * SelfTuningHybridStrategy: 245
     */
    /**
     * .balance(50_000L)
     * .limits(15L, 15_000L, 15_000L)
     * <p>
     * TenPercentStrategy: 43669
     * PatternStrategy: 23127
     * EnsemblePredictionStrategy: 14405
     * HybridPredictorStrategy: 3840
     * <p>
     * EnsemblePredictionStrategy: 57297
     * DynamicHybridPredictorStrategy: 28211
     * HybridPredictorStrategy: 23257
     * SelfTuningHybridStrategy: 19571
     * TenPercentStrategy: 16940
     * <p>
     * 26.01.2026_15.04.04.578_50000_RANDOM
     * DynamicAllocationManager: 318189
     * PatternStrategy: 215525
     * EnsemblePredictionStrategy: 11921
     * StraightUpStrategy2: 9692
     * StrategyManager: 9254
     * <p>
     * 26.01.2026_15.20.27.592_50000_RANDOM
     * StraightUpStrategy2: 22195
     * AdvancedManager: 21755
     * StrategyManager: 21755
     * HybridPredictorStrategy: 21755
     * SelfTuningHybridStrategy: 17985
     * <p>
     * session: C:\Users\dastan\Desktop\result\26.01.2026_15.47.19.818_50000_RANDOM
     * TierEtToutStrategy: 20125
     * StrategyManager: 4421
     * StraightUpStrategy2: 1118
     * NeighborAnalysisStrategy: 165
     * <p>
     * session: C:\Users\dastan\Desktop\result\26.01.2026_16.01.43.749_50000_RANDOM
     * EnsemblePredictionStrategy: 89914
     * TierEtToutStrategy: 39899
     * HybridPredictorStrategy: 9037
     * NeighborAnalysisStrategy: 2625
     * RandomStrategy: 2070
     *
     * session: C:\Users\dastan\Desktop\result\26.01.2026_17.03.51.933_50000_RANDOM
     * ZScoreReversionStrategy: 18225
     * TierEtToutStrategy: 5125
     *
     * session: C:\Users\dastan\Desktop\result\26.01.2026_17.07.44.858_50000_RANDOM
     * EnsemblePredictionStrategy: 30893
     * HybridPredictorStrategy: 5953
     * StraightUpStrategy2_v2: 4922
     * ZScoreReversionStrategy: 3390
     *
     * session: C:\Users\dastan\Desktop\result\26.01.2026_17.31.38.816_50000_RANDOM
     * TierEtToutStrategy: 22302
     * HybridPredictorStrategy: 11997
     * EnsemblePredictionStrategy: 2399
     * BayesianMetaStrategy: 1620
     * NeighborAnalysisStrategy: 580
     */
    /**
     * .balance(1_000L)
     * .limits(1L, 100L, 15_000L)
     *
     *session: C:\Users\dastan\Desktop\result\26.01.2026_17.37.46.745_1000_RANDOM
     * RandomStrategy2: 858
     * DynamicHybridPredictorStrategy: 666
     * HybridPredictorStrategy: 388
     * SelfTuningHybridStrategy: 290
     * TenPercentStrategy: 148
     * GapAnalysisStrategy_v2: 14
     */
    /**
     * random
     */
    static boolean random = true;
    static int count = 1;
    static int max = 100_000;

    static void main() throws IOException {
//        custom(Set.of(GapAnalysisStrategy.class), random);
        custom(new HashSet<>(StrategyFactory.classes()), random);
    }

    static void custom(Set<Class<? extends IStrategy>> classes, boolean random) throws IOException {
        FastLogger.info("Simulator started");
        String session = BuletoConstants.DIRECTORY + "\\" + BuletoConstants.FORMAT.format(new Date()) + "_" + balance + (random ? "_RANDOM" : "");
        Files.createDirectories(Paths.get(session));

        Set<Config> configs = Set.of(config);

        BuletoSimulator simulator = new BuletoSimulator(configs, classes);

//        final Deque<Integer> victory = random ? new ArrayDeque<>() : CsvDataLoader.load(VICTORY);
//        final Function<List<MetaConfig>, SimulatorManager> function = random
//                ? meta -> SimulatorManager.createShared(meta, randomSupplier)
//                : SimulatorManager::create;
//        final Supplier<SpotSupplier> supplier = random ? () -> randomSupplier : () -> BuletoSpotSupplier.of(victory);
//        List<SimulateResult> results =  simulator.repeat(count, supplier, function);

//        List<SimulateResult> results = random
//                ? simulator.single(repeat, () -> randomSupplier)
//                : simulator.repeat(repeat, () -> BuletoSpotSupplier.of(victory));

        List<SimulateResult> results = simulator.simulate(count, max);

        ConfigWriter.write(session, configs);
        BuletoWriter.single(session, results, false);
        FastLogger.info("Simulator finished");
    }

    //    static final SpotSupplier randomSupplier = ConfigurableSpotSupplier.of(AMERICAN, RANDOM, max);
    static long balance = 1_000L;
    static Config config = ConfigBuilder.builder()
            .name("Default")
            .american()
            .balance(balance)
            .limits(1L, 100L, 15_000L)
            // (Ограничение убытка) в процентах от начального баланса. Если текущий баланс упадет ниже этого уровня относительно старта, игра остановится
            .stopLossPercentage(0)
            // (Фиксация прибыли) в процентах от начального баланса. Если текущий баланс вырастет выше этого уровня относительно старта, игра остановится
            .takeProfitPercentage(0)
            // (Скользящий стоп) в процентах от пикового баланса. Фиксирует прибыль.
            // Если баланс упадет на указанный процент от максимально достигнутого за время игры значения, стратегия остановится
            .trailingStopPercentage(0)
            // Максимальная допустимая просадка (Max Drawdown) в процентах. Это условие останавливает стратегию,
            // если текущий баланс снизился относительно максимального значения (Peak Balance),
            // достигнутого за всё время игры, более чем на указанный процент
            .maxDrawdownPercentage(0)
            // Максимальная серия побед (Win Streak). Остановка после указанного количества выигранных раундов подряд
            .maxWinStreak(0)
            // Максимальная серия поражений (Loss Streak). Остановка после указанного количества проигранных раундов подряд
            .maxLossStreak(0)
            // Лимит количества раундов. Жесткое ограничение на длительность игровой сессии
            .maxRounds(0L)
            // Максимальный риск на ставку (в долях от баланса). Останавливает стратегию, если она пытается сделать ставку,
            // размер которой превышает указанную долю от текущего баланса. Защита от "слива" одной ставкой
            .maxBetBalancePercentage(0.0)
            // Окно стагнации (количество раундов). Остановка, если баланс не изменяется в течение указанного
            // числа раундов (например, стратегия перестала делать ставки из-за внутренних фильтров)
            .stagnationWindow(0)
            // Минимальный порог Винрейта (Win Rate). Значение от 0.0 до 1.0. Если процент побед падает ниже этого уровня,
            // игра останавливается
            .minWinRateThreshold(0.0)
            // Период "разогрева" для проверки Винрейта. Количество раундов, в течение которых проверка
            // minWinRateThreshold игнорируется. Позволяет стратегии набрать статистику,
            // чтобы не остановиться после первых пары неудач
            .minRoundsForWinRate(0L)
            .build();
}
