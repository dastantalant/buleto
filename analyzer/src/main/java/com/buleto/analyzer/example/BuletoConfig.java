//package com.traderoom.analyzer.example;
//
//import com.trading.roulette.api.IStrategy;
//import com.trading.roulette.api.StrategyContext;
//import com.trading.roulette.strategy.strategies.CocomoStrategy;
//import com.trading.roulette.strategy.strategies.EnsemblePredictionStrategy;
//import com.trading.roulette.strategy.strategies.GapAnalysisStrategy;
//import com.trading.roulette.strategy.strategies.GapAnalysisStrategyV2;
//import com.trading.roulette.strategy.strategies.LabouchereStrategy;
//import com.trading.roulette.strategy.strategies.MansuriansStrategy;
//import com.trading.roulette.strategy.strategies.MonteCarloStrategy;
//import com.trading.roulette.strategy.strategies.NeighborAnalysisStrategy;
//import com.trading.roulette.strategy.strategies.NeighborAnalysisStrategyV2;
//import com.trading.roulette.strategy.strategies.OscarsGrindStrategy;
//import com.trading.roulette.strategy.strategies.PatternStrategy;
//import com.trading.roulette.strategy.strategies.PivotStrategy;
//import com.trading.roulette.strategy.strategies.RandomStrategy;
//import com.trading.roulette.strategy.strategies.RandomStrategy2;
//import com.trading.roulette.strategy.strategies.Rate9848PercentStrategy;
//import com.trading.roulette.strategy.strategies.RomanovskyStrategy;
//import com.trading.roulette.strategy.strategies.SmartMarkovStrategy;
//import com.trading.roulette.strategy.strategies.StraightUpStrategy;
//import com.trading.roulette.strategy.strategies.StraightUpStrategy2;
//import com.trading.roulette.strategy.strategies.StraightUpStrategy2V2;
//import com.trading.roulette.strategy.strategies.TenPercentStrategy;
//import com.trading.roulette.strategy.strategies.TenUnitStrategy;
//import com.trading.roulette.strategy.strategies.TenUnitStrategyV2;
//import com.trading.roulette.strategy.strategies.ThirtyOneSystemStrategy;
//import com.trading.roulette.strategy.strategies.TierEtToutStrategy;
//import com.trading.roulette.strategy.strategies.TwoInOneStrategy;
//import com.trading.roulette.strategy.strategies.balance.ColorBalanceStrategy;
//import com.trading.roulette.strategy.strategies.balance.DistantProgressionBalanceStrategy;
//import com.trading.roulette.strategy.strategies.balance.EvenOddBalanceStrategy;
//import com.trading.roulette.strategy.strategies.hybrid.DynamicHybridPredictorStrategy;
//import com.trading.roulette.strategy.strategies.hybrid.HybridPredictorStrategy;
//import com.trading.roulette.strategy.strategies.hybrid.SelfTuningHybridStrategy;
//import com.trading.roulette.strategy.strategies.kelly.SaferKellyCriterionStrategy;
//import com.trading.roulette.strategy.strategies.kelly.SaferKellyCriterionStrategyV2;
//import com.trading.roulette.strategy.strategies.manager.AdvancedManager;
//import com.trading.roulette.strategy.strategies.manager.DynamicAllocationManager;
//import com.trading.roulette.strategy.strategies.martingale.CappedMartingaleStrategy;
//import com.trading.roulette.strategy.strategies.martingale.EastCoastProgressionStrategy;
//import com.trading.roulette.strategy.strategies.martingale.GrandMartingaleStrategy;
//import com.trading.roulette.strategy.strategies.martingale.MartingaleStrategy;
//import com.trading.roulette.strategy.strategies.martingale.MartingaleStrategy2;
//import com.trading.roulette.strategy.strategies.martingale.MartingaleStrategy3;
//import com.trading.roulette.strategy.strategies.martingale.MartingaleStrategy4;
//import com.trading.roulette.strategy.strategies.special.InsiderInfoStrategy;
//import com.trading.roulette.strategy.strategies.special.WeightedStatisticStrategy;
//
//import java.util.HashSet;
//import java.util.Set;
//
//public class BuletoConfig {
//    public static Set<Class<? extends IStrategy>> all() {
//        return new HashSet<>(StrategyContext.getAll());
//    }
//
//    public static Set<Class<? extends IStrategy>> selection() {
//        return Set.of(NeighborAnalysisStrategy.class,
//                StraightUpStrategy2V2.class,
//                PatternStrategy.class,
//                StraightUpStrategy2.class,
//                SaferKellyCriterionStrategy.class,
//                WeightedStatisticStrategy.class,
//                CocomoStrategy.class,
//                LabouchereStrategy.class,
//                RandomStrategy.class,
//                HybridPredictorStrategy.class,
//                GrandMartingaleStrategy.class,
//                RandomStrategy2.class,
//                DistantProgressionBalanceStrategy.class,
//                PivotStrategy.class,
//                TwoInOneStrategy.class,
//                MonteCarloStrategy.class,
//                AdvancedManager.class,
//                EvenOddBalanceStrategy.class,
//                GapAnalysisStrategyV2.class,
//                CappedMartingaleStrategy.class,
//                OscarsGrindStrategy.class,
//                ColorBalanceStrategy.class,
//                MartingaleStrategy.class,
//                DynamicHybridPredictorStrategy.class,
//                SmartMarkovStrategy.class,
//                SelfTuningHybridStrategy.class,
//                StraightUpStrategy.class,
//                InsiderInfoStrategy.class,
//                DynamicAllocationManager.class,
//                MartingaleStrategy4.class,
//                TenPercentStrategy.class,
//                MansuriansStrategy.class,
//                MartingaleStrategy2.class,
//                MartingaleStrategy3.class,
//                EnsemblePredictionStrategy.class,
//                TenUnitStrategy.class,
//                Rate9848PercentStrategy.class,
//                SaferKellyCriterionStrategyV2.class,
//                NeighborAnalysisStrategyV2.class,
//                TenUnitStrategyV2.class);
//    }
//
//    public static Set<Class<? extends IStrategy>> select1() {
//        return Set.of(CappedMartingaleStrategy.class,
//                CocomoStrategy.class,
//                EastCoastProgressionStrategy.class,
//                GapAnalysisStrategy.class,
//                GapAnalysisStrategyV2.class,
//                GrandMartingaleStrategy.class,
//                LabouchereStrategy.class,
//                MansuriansStrategy.class,
//                MartingaleStrategy.class,
//                MartingaleStrategy2.class,
//                MartingaleStrategy3.class,
//                MartingaleStrategy4.class,
//                MonteCarloStrategy.class,
//                PivotStrategy.class,
//                RandomStrategy.class,
//                RandomStrategy2.class,
//                RomanovskyStrategy.class,
//                TenPercentStrategy.class,
//                TenUnitStrategy.class,
//                TenUnitStrategyV2.class,
//                ThirtyOneSystemStrategy.class,
//                TierEtToutStrategy.class,
//                TwoInOneStrategy.class);
//    }
//
//    public static Set<Class<? extends IStrategy>> select2() {
//        return Set.of(CappedMartingaleStrategy.class,
//                CocomoStrategy.class,
//                EastCoastProgressionStrategy.class,
//                GapAnalysisStrategy.class,
//                GapAnalysisStrategyV2.class,
//                GrandMartingaleStrategy.class,
//                LabouchereStrategy.class,
//                MansuriansStrategy.class,
//                MartingaleStrategy.class,
//                MartingaleStrategy2.class,
//                MartingaleStrategy3.class,
//                MartingaleStrategy4.class,
//                MonteCarloStrategy.class,
//                PivotStrategy.class,
//                RandomStrategy.class,
//                RandomStrategy2.class,
//                RomanovskyStrategy.class,
//                TenPercentStrategy.class,
//                TenUnitStrategy.class,
//                TenUnitStrategyV2.class,
//                ThirtyOneSystemStrategy.class,
//                TierEtToutStrategy.class,
//                TwoInOneStrategy.class);
//    }
//}
