//package com.traderoom.analyzer.buleto;
//
//import com.toolbox.core.logging.FastLogger;
//import com.toolbox.core.util.CsvDataLoader;
//import com.trading.roulette.api.ConfigBuilder;
//import com.trading.roulette.api.IStrategy;
//import com.trading.roulette.api.StrategyContext;
//import com.trading.roulette.api.config.Config;
//import com.trading.roulette.strategy.simulate.ConfigurableSpotSupplier;
//import com.trading.roulette.strategy.simulate.SimulateResult;
//import com.trading.roulette.strategy.simulate.SpotSupplier;
//
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Paths;
//import java.util.ArrayDeque;
//import java.util.Date;
//import java.util.Deque;
//import java.util.HashSet;
//import java.util.LinkedList;
//import java.util.List;
//import java.util.Set;
//import java.util.function.Supplier;
//
//import static com.trading.roulette.api.enums.RouletteType.AMERICAN;
//import static com.traderoom.api.enums.SpotGenerateType.RANDOM;
//
//@Deprecated
//public class BuletoMain {
//    static Set<String> set = Set.of("Default",
//            "VegasHighRoller",
//            "LowBudgetGrinder",
//            "StabilityTest",
//            "HitAndRun",
//            "TrendSurfer",
//            "SafetyFirst",
//            "TableLimitTrap",
//            "ConservativeGrowth",
//            "TrailingStopTest",
//            "AntiStagnation",
//            "Scalper",
//            "Marathon",
//            "MicroStakes",
//            "WinStreakSniper",
//            "BadRunProtector");
//
//    static boolean rand = false;
//    static int count = 1;
//    static int max = 100_000;
//    static int warningLen = 940+940+940+940+940+940+940+940+940;
//    static Set<Class<? extends IStrategy>> classes =
//            new HashSet<>(StrategyContext.getAll());
//    //            new HashSet<>(StrategyFactory.classesWithExclude(Set.of(TwoInOneStrategy.class, GapAnalysisStrategy.class)));
////            Set.of(GapAnalysisStrategy.class);
//
//    static void main() throws IOException {
//        custom(classes, rand);
//    }
//
//    static void custom(Set<Class<? extends IStrategy>> classes, boolean random) throws IOException {
//        FastLogger.info("Simulator started");
//        String session = BuletoConstants.DIRECTORY + "\\" + BuletoConstants.FORMAT.format(new Date()) + "_" + realBalance + (random ? "_RANDOM" : "_FROM_HISTORY");
//        Files.createDirectories(Paths.get(session));
//        Config config;
//        List<SimulateResult> results;
//        Set<Config> configs;
//        if (rand) {
//            config = warn("RANDOM", new LinkedList<>());
//            configs = Set.of(config);
//            BuletoSimulator simulator = new BuletoSimulator(Set.of(config), classes);
//            final SpotSupplier spotSupplier = ConfigurableSpotSupplier.of(AMERICAN, RANDOM, max);
//            final Supplier<SpotSupplier> supplier = () -> spotSupplier;
//            results = simulator.single(count, supplier);
//        } else {
//            Deque<Integer> load = CsvDataLoader.load(BuletoConstants.VICTORY);
//            Deque<Integer> warning = new ArrayDeque<>(warningLen);
//            if (load.size() > warningLen ) {
//                FastLogger.info("warming up");
//                for (int i = 1; i <= warningLen && !load.isEmpty(); i++) {
//                    warning.push(load.pollFirst());
//                }
//            }
//            config = warn("FROM_VICTORY", warning);
//            configs = Set.of(config);
//            BuletoSimulator simulator = new BuletoSimulator(configs, classes);
//            final Supplier<SpotSupplier> supplier = () -> BuletoSpotSupplier.of(load);
//            results = simulator.simulate(count, supplier);
//        }
//        ConfigWriter.write(session, configs);
//        BuletoWriter.single(session, results, true);
//        FastLogger.info("Simulator finished");
//    }
//
//    static long realBalance = 1_000L;
//
//    static Config warn(String name, Deque<Integer> deque) {
//        return ConfigBuilder.builder()
//                .name(name)
//                .american()
//                .realBalance(realBalance)
//                .limits(1L, 100L, 15_000L)
//                // (Ограничение убытка) в процентах от начального баланса. Если текущий баланс упадет ниже этого уровня относительно старта, игра остановится
//                .stopLossPercentageStop(0)
//                // (Фиксация прибыли) в процентах от начального баланса. Если текущий баланс вырастет выше этого уровня относительно старта, игра остановится
//                .takeProfitPercentageStop(0)
//                // (Скользящий стоп) в процентах от пикового баланса. Фиксирует прибыль.
//                // Если баланс упадет на указанный процент от максимально достигнутого за время игры значения, стратегия остановится
//                .trailingStopPercentageStop(0)
//                // Максимальная допустимая просадка (Max Drawdown) в процентах. Это условие останавливает стратегию,
//                // если текущий баланс снизился относительно максимального значения (Peak Balance),
//                // достигнутого за всё время игры, более чем на указанный процент
//                .maxDrawdownPercentageStop(0)
//                // Максимальная серия побед (Win Streak). Остановка после указанного количества выигранных раундов подряд
//                .maxWinStreakStop(0)
//                // Максимальная серия поражений (Loss Streak). Остановка после указанного количества проигранных раундов подряд
//                .maxLossStreakStop(0)
//                // Лимит количества раундов. Жесткое ограничение на длительность игровой сессии
//                .maxRoundsStop(0L)
//                // Максимальный риск на ставку (в долях от баланса). Останавливает стратегию, если она пытается сделать ставку,
//                // размер которой превышает указанную долю от текущего баланса. Защита от "слива" одной ставкой
//                .maxBetBalancePercentageLimit(0.0)
//                // Окно стагнации (количество раундов). Остановка, если баланс не изменяется в течение указанного
//                // числа раундов (например, стратегия перестала делать ставки из-за внутренних фильтров)
//                .stagnationWindowStop(0)
//                // Минимальный порог Винрейта (Win Rate). Значение от 0.0 до 1.0. Если процент побед падает ниже этого уровня,
//                // игра останавливается
//                .minWinRateThresholdLimit(0.0)
//                // Период "разогрева" для проверки Винрейта. Количество раундов, в течение которых проверка
//                // minWinRateThresholdLimit игнорируется. Позволяет стратегии набрать статистику,
//                // чтобы не остановиться после первых пары неудач
//                .minRoundsForWinRateStop(0L)
//                .addHistory(deque)
//                .build();
//    }
//}
