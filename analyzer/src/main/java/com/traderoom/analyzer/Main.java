import com.traderoom.analyzer.ProjectDump;
import com.traderoom.analyzer.success.v7.RunnerTest;
import com.traderoom.analyzer.test.v10.BaseStrategy;
import com.traderoom.api.IStrategy;
import com.traderoom.api.StrategyFactory;
import com.traderoom.api.runner.Runner;
import com.traderoom.core.util.CharSequenceUtil;
import com.traderoom.core.util.DateTimeUtil;
import com.traderoom.core.util.RoundJsonParser;
import com.traderoom.core.websocket.Client;
import com.traderoom.monitoring.MonitoringMain;
import com.traderoom.strategy.strategies.BarnetStrategy;

void main() throws IOException {
//    ProjectDump.of(MonitoringMain.class.getPackage())
//            .lineImport(true)
//            .linePackage(true)
//            .include(Client.class.getPackage())
//            .include(RoundJsonParser.class)
//            .include(CharSequenceUtil.class)
//            .include(DateTimeUtil.class)
//            .exclude(StrategyFactory.class)
//            .exclude(BarnetStrategy.class.getPackage())
//            .exclude(Runner.class.getPackage())
//            .debug()
//            .write();
    ProjectDump.of(BaseStrategy.class.getPackage())
                        .lineImport(false)
            .linePackage(true)
            .debug()
            .write();
}

/**
 * 1. AdaptiveVolatilityStrategy
 * 2. AdaptiveVolatilityStrategyV2
 * 3. AdvancedManager
 * 4. BarnetStrategy
 * 5. BayesianMetaStrategy
 * 6. CappedMartingaleStrategy
 * 7. CocomoStrategy
 * 8. ColdNumbersStrategy
 * 9. ColorBalanceStrategy
 * 10. DAlembertStrategy
 * 11. DealerSignatureStrategy
 * 12. DistantProgressionBalanceStrategy
 * 13. DynamicAllocationManager
 * 14. DynamicHybridPredictorStrategy
 * 15. EastCoastProgressionStrategy
 * 16. EnhancedMarketRegimeStrategy
 * 17. EnsemblePredictionStrategy
 * 18. EvenOddBalanceStrategy
 * 19. FibonacciStrategy
 * 20. GameRegimeStrategy
 * 21. GapAnalysisStrategy
 * 22. GapAnalysisStrategyV2
 * 23. GlobalManager
 * 24. GoodmanStrategy
 * 25. GrandMartingaleStrategy
 * 26. HotNumbersStrategy
 * 27. HybridPredictorStrategy
 * 28. InsiderInfoStrategy
 * 29. KellyCriterionStrategy
 * 30. LabouchereStrategy
 * 31. MansuriansStrategy
 * 32. MarketRegimeStrategy
 * 33. MartingaleStrategy
 * 34. MartingaleStrategy2
 * 35. MartingaleStrategy3
 * 36. MartingaleStrategy4
 * 37. MartingaleStrategy5
 * 38. MeanReversionStrategy
 * 39. MonteCarloStrategy
 * 40. MultiBetStrategy
 * 41. NeighborAnalysisStrategy
 * 42. NeighborAnalysisStrategyV2
 * 43. NeighborStrategy
 * 44. NeighborStrategyV2
 * 45. OneThreeTwoSixStrategy
 * 46. OscarsGrindStrategy
 * 47. ParoliStrategy
 * 48. PatternStrategy
 * 49. PivotStrategy
 * 50. QLearningAgentStrategy
 * 51. RandomStrategy
 * 52. RandomStrategy2
 * 53. Rate9848PercentStrategy
 * 54. Rate9946PercentStrategy
 * 55. RegimeSwitchingStrategy
 * 56. RegimeTrendFollowerStrategy
 * 57. RepeatingColorPatternStrategy
 * 58. ReverseMartingaleRedStrategy
 * 59. RomanovskyStrategy
 * 60. SaferKellyCriterionStrategy
 * 61. SaferKellyCriterionStrategyV2
 * 62. SelfTuningHybridStrategy
 * 63. SevenKaimeStrategy
 * 64. ShannonEntropyStrategy
 * 65. SimpleAdaptiveVolatilityStrategy
 * 66. SmartMarkovStrategy
 * 67. SmartMarkovStrategyV2
 * 68. StraightUpStrategy
 * 69. StraightUpStrategy2
 * 70. StraightUpStrategy2V2
 * 71. StraightUpStrategy3
 * 72. StrategyManager
 * 73. TenPercentStrategy
 * 74. TenUnitStrategy
 * 75. TenUnitStrategyV2
 * 76. ThirtyOneSystemStrategy
 * 77. TierEtToutStrategy
 * 78. TripleSixStrategy
 * 79. TwoInOneStrategy
 * 80. WeightedStatisticStrategy
 * 81. WheelSectorStrategy
 * 82. ZScoreReversionStrategy
 */