package com.traderoom.analyzer.buleto.a;

//package com.traderoom.strategy.simulation.buleto;
//
//import com.traderoom.strategy.StrategyFactory;
//import com.traderoom.strategy.model.context.Snapshot;
//import com.traderoom.core.util.CsvDataLoader;
//
//import java.nio.file.Paths;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.Set;
//
//import static com.traderoom.strategy.enums.Constants.PACKAGE;
//import static com.traderoom.strategy.simulation.buleto.BuletoConstants.DIRECTORY;
//import static com.traderoom.strategy.simulation.buleto.BuletoConstants.FORMAT;
//import static com.traderoom.strategy.simulation.buleto.BuletoConstants.VICTORY;
//
//@Deprecated
public class Buleto {}
//    static void main() throws Exception {
//        var configs = Set.of("Default",
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
//        var repeat = 0;
//        var maxRound = 100L;
//        var factory = StrategyFactory.getInstance();
//        var victory = CsvDataLoader.load(Paths.get(VICTORY));
//        var manager = new BuletoManager(factory, victory, maxRound);
//        var map = new HashMap<String, Map<Integer, List<Snapshot>>>();
//        for (String config : configs) {
//            String outDir = DIRECTORY + "\\" + FORMAT.format(new Date()) + "_" + config;
//            map.put(config, manager.repeatAll(repeat, outDir, config, true));
//        }
//    }
//}