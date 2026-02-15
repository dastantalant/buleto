//package com.traderoom.analyzer;
//
//import com.trading.roulette.api.StrategyFactory;
//import com.trading.roulette.api.IStrategy;
//import com.trading.roulette.api.model.config.RawConfig;
//import com.trading.roulette.api.StrategyContext;
//import com.trading.roulette.api.enums.RouletteType;
//
//import java.io.IOException;
//import java.util.Optional;
//import java.util.Set;
//
//public class TestMain {
//    static void main() throws IOException {
////        Set<Class<? extends IStrategy>> all = new HashSet<>(StrategyContext.getAll());
//
//        Optional<Class<IStrategy>> optional = StrategyContext.findByClassName("NeighborAnalysisStrategy");
//        RawConfig build = RawConfig.builder()
//                .name("TEST")
//                .startBalance(15000L)
//                .minBet(10L)
//                .maxBet(2000L)
//                .type(RouletteType.AMERICAN)
//                .tableLimit(5000L)
//                .takeProfitPercentageStop(50)
//                .maxDrawdownPercentageStop(50)
//                .maxRoundsStop(2_000L)
////                .dangerZoneThresholdRisk(0.0)
////                .profitZoneThresholdRisk(0.0)
////                .normalZoneBetCapRisk(1.0)
////                .penaltyBoxDurationRisk(0)
//                .build();
////        var run = StrategyFactory.webSimulatorManager(Set.of(optional.get()), build, 1000L).run();
//        var run = StrategyFactory.simulatorManager(Set.of(optional.get()), build, 1000L).run();
////        new ObjectMapper().writeValue(System.out, run);
//        for(var item : run){
//            System.out.println(item);
//            System.out.println();
//        }
//    }
//}
