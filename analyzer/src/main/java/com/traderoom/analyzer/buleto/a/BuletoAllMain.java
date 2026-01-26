//package com.traderoom.strategy.simulation.buleto;
//
//import com.traderoom.core.logging.FastLogger;
//import com.traderoom.strategy.StrategyFactory;
//import com.traderoom.strategy.model.context.Snapshot;
//import com.traderoom.strategy.simulation.BetSimulatorManager;
//import com.traderoom.strategy.simulation.buleto.writer.GlobalFullCsvLogger;
//import com.traderoom.strategy.simulation.buleto.writer.GlobalSnapshot;
//import com.traderoom.core.util.CsvDataLoader;
//
//import java.io.File;
//import java.nio.file.Files;
//import java.nio.file.Paths;
//import java.util.ArrayList;
//import java.util.Comparator;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.LinkedList;
//import java.util.List;
//import java.util.Map;
//
//import static com.traderoom.strategy.simulation.buleto.BuletoConstants.DIRECTORY;
//import static com.traderoom.strategy.simulation.buleto.BuletoConstants.FORMAT;
//import static com.traderoom.strategy.simulation.buleto.BuletoConstants.VICTORY;
//
//
//public class BuletoAllMain {
//    public static void main(String[] args) throws Exception {
//        var configs = List.of("Default",
//                "Standard",
//                "VegasHighRoller",
//                "LowBudgetGrinder",
//                "InfiniteMartingaleTest",
//                "StabilityTest",
//                "HitAndRun",
//                "TrendSurfer",
//                "SafetyFirst",
//                "EuropeanStandard",
//                "EuropeanPro",
//                "MartingaleParadise",
//                "TableLimitTrap",
//                "ConservativeGrowth",
//                "TrailingStopTest",
//                "AntiStagnation",
//                "QualityControl",
//                "RiskManager",
//                "Scalper",
//                "Marathon",
//                "MicroStakes",
//                "WinStreakSniper",
//                "BadRunProtector");
//        var repeat = 10;
//        var maxRound = 10000L;
//        var random = true;
//        var factory = StrategyFactory.getInstance();
//        var victoryPath = Paths.get(VICTORY);
//        var victory = (random || !Files.exists(victoryPath)) ? new LinkedList<Integer>() : CsvDataLoader.load(victoryPath);
//
//        var manager = new BetSimulatorManager(factory, victory, maxRound);
//
//        Map<String, List<GlobalSnapshot>> global = new HashMap<>();
//        List<GlobalSnapshot> globalList = new ArrayList<>();
//        String currentSessionDate = FORMAT.format(new Date());
//        String outDir = DIRECTORY + File.separator + currentSessionDate;
//        var counter = new HashMap<String, Integer>();
//        for (String config : configs) {
//            Map<Integer, List<Snapshot>> runResults = manager.repeatAll(repeat, outDir, config, random);
//            runResults.forEach((runId, snapshots) -> {
//                for (Snapshot snapshot : snapshots) {
//                    if (snapshot.getNetProfit() > 0) {
//                        String strategy = snapshot.strategyName();
//                        Integer count = counter.getOrDefault(strategy, 0);
//                        counter.put(strategy, ++count);
//                        GlobalSnapshot enrichedSnapshot = GlobalSnapshot.builder()
//                                .strategyName(strategy)
//                                .config(config)
//                                .runId(runId)
//                                .roundNumber(snapshot.roundNumber())
//                                .balance(snapshot.balance())
//                                .startBalance(snapshot.startBalance())
//                                .lastProfit(snapshot.lastProfit())
//                                .netProfit(snapshot.netProfit())
//                                .roundBetAmount(snapshot.roundBetAmount())
//                                .roiPercentage(snapshot.roiPercentage())
//                                .winRatePercentage(snapshot.winRatePercentage())
//                                .currentDrawdown(snapshot.currentDrawdown())
//                                .maxDrawdown(snapshot.maxDrawdown())
//                                .profitFactor(snapshot.profitFactor())
//                                .lastSpot(snapshot.lastSpot())
//                                .totalWon(snapshot.totalWon())
//                                .totalLost(snapshot.totalLost())
//                                .totalWagered(snapshot.totalWagered())
//                                .totalPayout(snapshot.totalPayout())
//                                .lastBets(snapshot.lastBets())
//                                .isStopped(snapshot.isStopped())
//                                .tempCount(count)
//                                .build();
//                        var list = global.getOrDefault(strategy, new ArrayList<>());
//                        list.add(enrichedSnapshot);
//                        global.put(strategy, list);
//                        globalList.add(enrichedSnapshot);
//                    }
//                }
//            });
//        }
//
//        globalList.sort(Comparator.comparingInt(GlobalSnapshot::tempCount).reversed());
//
//        counter.forEach((key, value) -> {
//            if (value >= 50 && global.containsKey(key)) {
//                try (GlobalFullCsvLogger logger = new GlobalFullCsvLogger(outDir, "_" + value + "_" + key)) {
//                    List<GlobalSnapshot> snapshots = global.get(key);
//                    for (GlobalSnapshot snapshot : snapshots) {
//                        logger.onRound(snapshot);
//                    }
//                } catch (Exception _) {
//                }
//            }
//        });
//        try (GlobalFullCsvLogger logger = new GlobalFullCsvLogger(outDir, "_GLOBAL_SUMMARY")) {
//            for (GlobalSnapshot snapshot : globalList) {
//                logger.onRound(snapshot);
//            }
//            FastLogger.info("Global statistics collected in {}_GLOBAL_SUMMARY.csv", outDir);
//        }
//    }
//}
