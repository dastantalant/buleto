package com.traderoom.analyzer.example;

import com.traderoom.api.IStrategy;
import com.traderoom.api.StrategyContext;
import com.traderoom.strategy.strategies.CocomoStrategy;
import com.traderoom.strategy.strategies.EnsemblePredictionStrategy;
import com.traderoom.strategy.strategies.GapAnalysisStrategy;
import com.traderoom.strategy.strategies.GapAnalysisStrategyV2;
import com.traderoom.strategy.strategies.LabouchereStrategy;
import com.traderoom.strategy.strategies.MansuriansStrategy;
import com.traderoom.strategy.strategies.MonteCarloStrategy;
import com.traderoom.strategy.strategies.NeighborAnalysisStrategy;
import com.traderoom.strategy.strategies.NeighborAnalysisStrategyV2;
import com.traderoom.strategy.strategies.OscarsGrindStrategy;
import com.traderoom.strategy.strategies.PatternStrategy;
import com.traderoom.strategy.strategies.PivotStrategy;
import com.traderoom.strategy.strategies.RandomStrategy;
import com.traderoom.strategy.strategies.RandomStrategy2;
import com.traderoom.strategy.strategies.Rate9848PercentStrategy;
import com.traderoom.strategy.strategies.RomanovskyStrategy;
import com.traderoom.strategy.strategies.SmartMarkovStrategy;
import com.traderoom.strategy.strategies.StraightUpStrategy;
import com.traderoom.strategy.strategies.StraightUpStrategy2;
import com.traderoom.strategy.strategies.StraightUpStrategy2V2;
import com.traderoom.strategy.strategies.TenPercentStrategy;
import com.traderoom.strategy.strategies.TenUnitStrategy;
import com.traderoom.strategy.strategies.TenUnitStrategyV2;
import com.traderoom.strategy.strategies.ThirtyOneSystemStrategy;
import com.traderoom.strategy.strategies.TierEtToutStrategy;
import com.traderoom.strategy.strategies.TwoInOneStrategy;
import com.traderoom.strategy.strategies.balance.ColorBalanceStrategy;
import com.traderoom.strategy.strategies.balance.DistantProgressionBalanceStrategy;
import com.traderoom.strategy.strategies.balance.EvenOddBalanceStrategy;
import com.traderoom.strategy.strategies.hybrid.DynamicHybridPredictorStrategy;
import com.traderoom.strategy.strategies.hybrid.HybridPredictorStrategy;
import com.traderoom.strategy.strategies.hybrid.SelfTuningHybridStrategy;
import com.traderoom.strategy.strategies.kelly.SaferKellyCriterionStrategy;
import com.traderoom.strategy.strategies.kelly.SaferKellyCriterionStrategyV2;
import com.traderoom.strategy.strategies.manager.AdvancedManager;
import com.traderoom.strategy.strategies.manager.DynamicAllocationManager;
import com.traderoom.strategy.strategies.martingale.CappedMartingaleStrategy;
import com.traderoom.strategy.strategies.martingale.EastCoastProgressionStrategy;
import com.traderoom.strategy.strategies.martingale.GrandMartingaleStrategy;
import com.traderoom.strategy.strategies.martingale.MartingaleStrategy;
import com.traderoom.strategy.strategies.martingale.MartingaleStrategy2;
import com.traderoom.strategy.strategies.martingale.MartingaleStrategy3;
import com.traderoom.strategy.strategies.martingale.MartingaleStrategy4;
import com.traderoom.strategy.strategies.special.InsiderInfoStrategy;
import com.traderoom.strategy.strategies.special.WeightedStatisticStrategy;

import java.util.HashSet;
import java.util.Set;

public class BuletoConfig {
    public static Set<Class<? extends IStrategy>> all() {
        return new HashSet<>(StrategyContext.getAll());
    }

    public static Set<Class<? extends IStrategy>> selection() {
        return Set.of(NeighborAnalysisStrategy.class,
                StraightUpStrategy2V2.class,
                PatternStrategy.class,
                StraightUpStrategy2.class,
                SaferKellyCriterionStrategy.class,
                WeightedStatisticStrategy.class,
                CocomoStrategy.class,
                LabouchereStrategy.class,
                RandomStrategy.class,
                HybridPredictorStrategy.class,
                GrandMartingaleStrategy.class,
                RandomStrategy2.class,
                DistantProgressionBalanceStrategy.class,
                PivotStrategy.class,
                TwoInOneStrategy.class,
                MonteCarloStrategy.class,
                AdvancedManager.class,
                EvenOddBalanceStrategy.class,
                GapAnalysisStrategyV2.class,
                CappedMartingaleStrategy.class,
                OscarsGrindStrategy.class,
                ColorBalanceStrategy.class,
                MartingaleStrategy.class,
                DynamicHybridPredictorStrategy.class,
                SmartMarkovStrategy.class,
                SelfTuningHybridStrategy.class,
                StraightUpStrategy.class,
                InsiderInfoStrategy.class,
                DynamicAllocationManager.class,
                MartingaleStrategy4.class,
                TenPercentStrategy.class,
                MansuriansStrategy.class,
                MartingaleStrategy2.class,
                MartingaleStrategy3.class,
                EnsemblePredictionStrategy.class,
                TenUnitStrategy.class,
                Rate9848PercentStrategy.class,
                SaferKellyCriterionStrategyV2.class,
                NeighborAnalysisStrategyV2.class,
                TenUnitStrategyV2.class);
    }

    public static Set<Class<? extends IStrategy>> select1() {
        return Set.of(CappedMartingaleStrategy.class,
                CocomoStrategy.class,
                EastCoastProgressionStrategy.class,
                GapAnalysisStrategy.class,
                GapAnalysisStrategyV2.class,
                GrandMartingaleStrategy.class,
                LabouchereStrategy.class,
                MansuriansStrategy.class,
                MartingaleStrategy.class,
                MartingaleStrategy2.class,
                MartingaleStrategy3.class,
                MartingaleStrategy4.class,
                MonteCarloStrategy.class,
                PivotStrategy.class,
                RandomStrategy.class,
                RandomStrategy2.class,
                RomanovskyStrategy.class,
                TenPercentStrategy.class,
                TenUnitStrategy.class,
                TenUnitStrategyV2.class,
                ThirtyOneSystemStrategy.class,
                TierEtToutStrategy.class,
                TwoInOneStrategy.class);
    }

    public static Set<Class<? extends IStrategy>> select2() {
        return Set.of(CappedMartingaleStrategy.class,
                CocomoStrategy.class,
                EastCoastProgressionStrategy.class,
                GapAnalysisStrategy.class,
                GapAnalysisStrategyV2.class,
                GrandMartingaleStrategy.class,
                LabouchereStrategy.class,
                MansuriansStrategy.class,
                MartingaleStrategy.class,
                MartingaleStrategy2.class,
                MartingaleStrategy3.class,
                MartingaleStrategy4.class,
                MonteCarloStrategy.class,
                PivotStrategy.class,
                RandomStrategy.class,
                RandomStrategy2.class,
                RomanovskyStrategy.class,
                TenPercentStrategy.class,
                TenUnitStrategy.class,
                TenUnitStrategyV2.class,
                ThirtyOneSystemStrategy.class,
                TierEtToutStrategy.class,
                TwoInOneStrategy.class);
    }
}
