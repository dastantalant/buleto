package com.traderoom.web.strategy;

import com.traderoom.api.IStrategy;
import com.traderoom.strategy.strategies.BarnetStrategy;
import com.traderoom.strategy.strategies.CocomoStrategy;
import com.traderoom.strategy.strategies.ColdNumbersStrategy;
import com.traderoom.strategy.strategies.DAlembertStrategy;
import com.traderoom.strategy.strategies.EnsemblePredictionStrategy;
import com.traderoom.strategy.strategies.FibonacciStrategy;
import com.traderoom.strategy.strategies.GapAnalysisStrategy;
import com.traderoom.strategy.strategies.GapAnalysisStrategyV2;
import com.traderoom.strategy.strategies.GoodmanStrategy;
import com.traderoom.strategy.strategies.LabouchereStrategy;
import com.traderoom.strategy.strategies.MansuriansStrategy;
import com.traderoom.strategy.strategies.MeanReversionStrategy;
import com.traderoom.strategy.strategies.MonteCarloStrategy;
import com.traderoom.strategy.strategies.MultiBetStrategy;
import com.traderoom.strategy.strategies.NeighborAnalysisStrategy;
import com.traderoom.strategy.strategies.NeighborAnalysisStrategyV2;
import com.traderoom.strategy.strategies.NeighborStrategy;
import com.traderoom.strategy.strategies.NeighborStrategyV2;
import com.traderoom.strategy.strategies.OneThreeTwoSixStrategy;
import com.traderoom.strategy.strategies.OscarsGrindStrategy;
import com.traderoom.strategy.strategies.ParoliStrategy;
import com.traderoom.strategy.strategies.PatternStrategy;
import com.traderoom.strategy.strategies.PivotStrategy;
import com.traderoom.strategy.strategies.QLearningAgentStrategy;
import com.traderoom.strategy.strategies.RandomStrategy;
import com.traderoom.strategy.strategies.RandomStrategy2;
import com.traderoom.strategy.strategies.Rate9848PercentStrategy;
import com.traderoom.strategy.strategies.Rate9946PercentStrategy;
import com.traderoom.strategy.strategies.RegimeSwitchingStrategy;
import com.traderoom.strategy.strategies.RegimeTrendFollowerStrategy;
import com.traderoom.strategy.strategies.RepeatingColorPatternStrategy;
import com.traderoom.strategy.strategies.ReverseMartingaleRedStrategy;
import com.traderoom.strategy.strategies.RomanovskyStrategy;
import com.traderoom.strategy.strategies.SevenKaimeStrategy;
import com.traderoom.strategy.strategies.SmartMarkovStrategy;
import com.traderoom.strategy.strategies.SmartMarkovStrategyV2;
import com.traderoom.strategy.strategies.StraightUpStrategy;
import com.traderoom.strategy.strategies.StraightUpStrategy2;
import com.traderoom.strategy.strategies.StraightUpStrategy2V2;
import com.traderoom.strategy.strategies.StraightUpStrategy3;
import com.traderoom.strategy.strategies.TenPercentStrategy;
import com.traderoom.strategy.strategies.TenUnitStrategy;
import com.traderoom.strategy.strategies.TenUnitStrategyV2;
import com.traderoom.strategy.strategies.ThirtyOneSystemStrategy;
import com.traderoom.strategy.strategies.TierEtToutStrategy;
import com.traderoom.strategy.strategies.TripleSixStrategy;
import com.traderoom.strategy.strategies.TwoInOneStrategy;
import com.traderoom.strategy.strategies.WheelSectorStrategy;
import com.traderoom.strategy.strategies.ZScoreReversionStrategy;
import com.traderoom.strategy.strategies.balance.ColorBalanceStrategy;
import com.traderoom.strategy.strategies.balance.DistantProgressionBalanceStrategy;
import com.traderoom.strategy.strategies.balance.EvenOddBalanceStrategy;
import com.traderoom.strategy.strategies.hybrid.DynamicHybridPredictorStrategy;
import com.traderoom.strategy.strategies.hybrid.HybridPredictorStrategy;
import com.traderoom.strategy.strategies.hybrid.SelfTuningHybridStrategy;
import com.traderoom.strategy.strategies.kelly.KellyCriterionStrategy;
import com.traderoom.strategy.strategies.kelly.SaferKellyCriterionStrategy;
import com.traderoom.strategy.strategies.kelly.SaferKellyCriterionStrategyV2;
import com.traderoom.strategy.strategies.manager.AdvancedManager;
import com.traderoom.strategy.strategies.manager.DynamicAllocationManager;
import com.traderoom.strategy.strategies.manager.EnhancedMarketRegimeStrategy;
import com.traderoom.strategy.strategies.manager.GlobalManager;
import com.traderoom.strategy.strategies.manager.StrategyManager;
import com.traderoom.strategy.strategies.martingale.CappedMartingaleStrategy;
import com.traderoom.strategy.strategies.martingale.EastCoastProgressionStrategy;
import com.traderoom.strategy.strategies.martingale.GrandMartingaleStrategy;
import com.traderoom.strategy.strategies.martingale.MartingaleStrategy;
import com.traderoom.strategy.strategies.martingale.MartingaleStrategy2;
import com.traderoom.strategy.strategies.martingale.MartingaleStrategy3;
import com.traderoom.strategy.strategies.martingale.MartingaleStrategy4;
import com.traderoom.strategy.strategies.martingale.MartingaleStrategy5;
import com.traderoom.strategy.strategies.regime.GameRegimeStrategy;
import com.traderoom.strategy.strategies.regime.MarketRegimeStrategy;
import com.traderoom.strategy.strategies.special.BayesianMetaStrategy;
import com.traderoom.strategy.strategies.special.DealerSignatureStrategy;
import com.traderoom.strategy.strategies.special.InsiderInfoStrategy;
import com.traderoom.strategy.strategies.special.ShannonEntropyStrategy;
import com.traderoom.strategy.strategies.special.WeightedStatisticStrategy;
import com.traderoom.strategy.strategies.volatility.AdaptiveVolatilityStrategy;
import com.traderoom.strategy.strategies.volatility.AdaptiveVolatilityStrategyV2;
import com.traderoom.strategy.strategies.volatility.SimpleAdaptiveVolatilityStrategy;
import io.swagger.v3.oas.annotations.media.Schema;

import lombok.Getter;
import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@Getter

public enum StrategyEnum {

    // --- Классические и Математические ---

    @Schema(description = "BARNET (Barnet (1-3-2-6)) - Барнет (1-3-2-6). Позитивная прогрессия на равные шансы. Пытается поймать серию из 4 побед подряд.")
    BARNET(BarnetStrategy.class, "Barnet (1-3-2-6)"),

    @Schema(description = "COCOMBO (Cocomo (Дюжины)) - Кокомо. Ставка на две дюжины. Ждет серию промахов, затем начинает агрессивную прогрессию.")
    COCOMBO(CocomoStrategy.class, "Cocomo (Дюжины)"),

    @Schema(description = "COLD_NUMBERS (Cold Numbers) - Холодные числа. Ставит на номера, которые выпадали реже всего за последнее время, ожидая их возврата.")
    COLD_NUMBERS(ColdNumbersStrategy.class, "Cold Numbers"),

    @Schema(description = "D_ALEMBERT (D'Alembert) - Д'Аламбер. Консервативная прогрессия на равные шансы: +1 юнит при проигрыше, -1 при выигрыше.")
    D_ALEMBERT(DAlembertStrategy.class, "D'Alembert"),

    @Schema(description = "ENSEMBLE_PREDICTION (Ensemble Prediction) - Ансамбль. Использует коллективное мнение (голосование) нескольких алгоритмов (Марков, Паттерны, Статистика).")
    ENSEMBLE_PREDICTION(EnsemblePredictionStrategy.class, "Ensemble Prediction"),

    @Schema(description = "FIBONACCI (Fibonacci) - Фибоначчи. Использует последовательность Фибоначчи для определения размера ставки при проигрыше на равных шансах.")
    FIBONACCI(FibonacciStrategy.class, "Fibonacci"),

    @Schema(description = "GAP_ANALYSIS (Gap Analysis) - Гэп-анализ. Отслеживает 'разрывы' (gaps) в истории выпадений чисел. Ставит на те, что давно не появлялись.")
    GAP_ANALYSIS(GapAnalysisStrategy.class, "Gap Analysis"),

    @Schema(description = "GAP_ANALYSIS_V2 (Gap Analysis V2) - Гэп-анализ V2. Улучшенная версия с адаптивным порогом входа и мягкой прогрессией.")
    GAP_ANALYSIS_V2(GapAnalysisStrategyV2.class, "Gap Analysis V2"),

    @Schema(description = "GOODMAN (Goodman (1-2-3-5)) - Гудман (1-2-3-5). Консервативная позитивная прогрессия. Фиксирует прибыль при коротких сериях побед.")
    GOODMAN(GoodmanStrategy.class, "Goodman (1-2-3-5)"),

    @Schema(description = "LABOUCHERE (Labouchere) - Лабушер (Сплит-Мартингейл). Система вычеркивания чисел из ряда. Цель — закрыть ряд и получить прибыль.")
    LABOUCHERE(LabouchereStrategy.class, "Labouchere"),

    @Schema(description = "MANSURIAN (Mansurian (Углы)) - Мансуриан. Ставки на Углы (Corners). При проигрыше увеличивает количество закрываемых углов.")
    MANSURIAN(MansuriansStrategy.class, "Mansurian (Углы)"),

    @Schema(description = "MEAN_REVISION (Mean Reversion) - Возврат к среднему. Если цвет/дюжина выпадали слишком часто, ставит на противоположный исход.")
    MEAN_REVISION(MeanReversionStrategy.class, "Mean Reversion"),

    @Schema(description = "MONTE_CARLO (Monte Carlo) - Монте-Карло. Использует последовательность 1-2-3 для ставок на дюжины. При выигрыше убирает крайние числа.")
    MONTE_CARLO(MonteCarloStrategy.class, "Monte Carlo"),

    @Schema(description = "MULTI_BET (Multi Bet) - Мульти-ставка. Ставит на несколько наиболее вероятных чисел, предсказанных Марковскими цепями.")
    MULTI_BET(MultiBetStrategy.class, "Multi Bet"),

    @Schema(description = "NEIGHBOR_ANALYSIS (Neighbor Analysis) - Анализ соседей. Ставит на числа, являющиеся 'соседями' последнего выпавшего числа на физическом колесе.")
    NEIGHBOR_ANALYSIS(NeighborAnalysisStrategy.class, "Neighbor Analysis"),

    @Schema(description = "NEIGHBOR_ANALYSIS_V2 (Neighbor Analysis V2) - Анализ соседей V2. Адаптивная версия. Отслеживает 'почерк' дилера и смещение колеса.")
    NEIGHBOR_ANALYSIS_V2(NeighborAnalysisStrategyV2.class, "Neighbor Analysis V2"),

    @Schema(description = "NEIGHBOR (Neighbor Bets) - Соседи (Сектора). Ставит на фиксированные группы соседей (Voisins, Tiers, Orphelins) на основе прогноза.")
    NEIGHBOR(NeighborStrategy.class, "Neighbor Bets"),

    @Schema(description = "NEIGHBOR_V2 (Neighbor Bets V2) - Соседи V2. Динамический поиск горячего сектора на колесе с адаптивным радиусом.")
    NEIGHBOR_V2(NeighborStrategyV2.class, "Neighbor Bets V2"),

    @Schema(description = "ONE_THREE_TWO_SIX (System 1-3-2-6) - 1-3-2-6. Популярная система позитивной прогрессии. Рискует только выигранными деньгами на 3 и 4 шаге.")
    ONE_THREE_TWO_SIX(OneThreeTwoSixStrategy.class, "System 1-3-2-6"),

    @Schema(description = "OSCARS_GRIND (Oscar's Grind) - Гринд Оскара. Консервативная стратегия. Цель: выиграть ровно 1 юнит за цикл. Не увеличивает ставку при проигрыше.")
    OSCARS_GRIND(OscarsGrindStrategy.class, "Oscar's Grind"),

    @Schema(description = "PAROLI (Paroli) - Пароли. Анти-Мартингейл. Удваивает ставку при выигрыше (до 3 раз), сбрасывает при проигрыше.")
    PAROLI(ParoliStrategy.class, "Paroli"),

    @Schema(description = "PATTERN (Pattern Hunter) - Паттерн. Ищет повторяющиеся последовательности чисел в истории и ставит на продолжение паттерна.")
    PATTERN(PatternStrategy.class, "Pattern Hunter"),

    @Schema(description = "PIVOT (Pivot (Law of Thirds)) - Пивот. Ждет, пока число выпадет дважды (станет Пивотом), и ставит на него фиксированное количество раз.")
    PIVOT(PivotStrategy.class, "Pivot (Law of Thirds)"),

    @Schema(description = "Q_LEARNING_AGENT (Q-Learning AI) - Q-Learning AI. Обучаемый агент (Reinforcement Learning), который ищет оптимальную стратегию методом проб и ошибок.")
    Q_LEARNING_AGENT(QLearningAgentStrategy.class, "Q-Learning AI"),

    @Schema(description = "RANDOM (Random) - Случайная. Делает абсолютно случайные ставки. Используется как бенчмарк (контрольная группа).")
    RANDOM(RandomStrategy.class, "Random"),

    @Schema(description = "RANDOM_2 (Random V2) - Случайная V2. Делает случайные ставки, но пытается 'держать' выигрышные номера.")
    RANDOM_2(RandomStrategy2.class, "Random V2"),

    @Schema(description = "RATE_9848_PERCENT (Rate 98.48% (Dozens)) - 98.48%. Ставит на две дюжины, если они не выпадали 3 раза подряд. Высокая вероятность, малый выигрыш.")
    RATE_9848_PERCENT(Rate9848PercentStrategy.class, "Rate 98.48% (Dozens)"),

    @Schema(description = "RATE_9946_PERCENT (Rate 99.46% (Dozens)) - 99.46%. Ставит на две дюжины, если они не выпадали 4 раза подряд. Экстремально консервативная.")
    RATE_9946_PERCENT(Rate9946PercentStrategy.class, "Rate 99.46% (Dozens)"),

    @Schema(description = "REGIME_SWITHING (Regime Switching) - Переключение режимов. Анализирует рынок (Тренд/Флэт) и переключается между 'Горячими' и 'Холодными' ставками.")
    REGIME_SWITHING(RegimeSwitchingStrategy.class, "Regime Switching"),

    @Schema(description = "REGIME_TREND_FOLLOWER (Regime Trend Follower) - Следование за трендом. Ставит на простые шансы и дюжины, которые сейчас 'горячие' (выпадают чаще среднего).")
    REGIME_TREND_FOLLOWER(RegimeTrendFollowerStrategy.class, "Regime Trend Follower"),

    @Schema(description = "REPEATING_COLOR_PATTERN (Repeating Color) - Повтор цвета. Ставит на паттерны цветов (например, R-R-R) или против чередования.")
    REPEATING_COLOR_PATTERN(RepeatingColorPatternStrategy.class, "Repeating Color"),

    @Schema(description = "REVERSE_MARTINGALE_RED (Reverse Martingale (Red)) - Обратный Мартингейл Красное. Ставит только на Красное, удваивая при выигрыше.")
    REVERSE_MARTINGALE_RED(ReverseMartingaleRedStrategy.class, "Reverse Martingale (Red)"),

    @Schema(description = "ROMANOVSKY (Romanosky) - Романовский. Покрывает 32 номера (две дюжины + 4 угла). Высокий винрейт, дорогая ставка.")
    ROMANOVSKY(RomanovskyStrategy.class, "Romanosky"),

    @Schema(description = "SEVEN_KAIME (Seven Kaime) - Семь Кайме. Ждет 7 проигрышей подряд на равных шансах (например, 7 красных), затем ставит на противоположное.")
    SEVEN_KAIME(SevenKaimeStrategy.class, "Seven Kaime"),

    @Schema(description = "SMART_MARKOV (Smart Markov) - Умный Марков. Использует цепи Маркова для предсказания следующего числа на основе предыдущего.")
    SMART_MARKOV(SmartMarkovStrategy.class, "Smart Markov"),

    @Schema(description = "SMART_MARKOV_V2 (Smart Markov V2) - Умный Марков V2. Версия с затухающей памятью (Decay) и фильтром шума.")
    SMART_MARKOV_V2(SmartMarkovStrategyV2.class, "Smart Markov V2"),

    @Schema(description = "STRAIGHT_UP (Straight Up (Single)) - Straight Up. Ставит на одно наиболее вероятное число (по Маркову). Высокий риск, высокая награда.")
    STRAIGHT_UP(StraightUpStrategy.class, "Straight Up (Single)"),

    @Schema(description = "STRAIGHT_UP_2 (Straight Up 2 (Freq)) - Straight Up 2. Ставит на несколько чисел на основе частотного анализа и управления бюджетом.")
    STRAIGHT_UP_2(StraightUpStrategy2.class, "Straight Up 2 (Freq)"),

    @Schema(description = "STRAIGHT_UP_2_V2 (Straight Up 2 V2) - Straight Up 2 V2. Адаптивная версия с динамическим порогом уверенности и защитой капитала.")
    STRAIGHT_UP_2_V2(StraightUpStrategy2V2.class, "Straight Up 2 V2"),

    @Schema(description = "STRAIGHT_UP_3 (Straight Up 3 (Exclusion)) - Straight Up 3. Исключает выпавшие номера за последние N спинов и ставит на оставшиеся.")
    STRAIGHT_UP_3(StraightUpStrategy3.class, "Straight Up 3 (Exclusion)"),

    @Schema(description = "TEN_PERCENT (Ten Percent (MM)) - 10 процентов. Всегда ставит 10% от текущего банка на равные шансы. Невозможно слить депозит полностью.")
    TEN_PERCENT(TenPercentStrategy.class, "Ten Percent (MM)"),

    @Schema(description = "TEN_UNIT (Ten Unit Target) - 10 Юнитов. Цель: выиграть 10 единиц за сессию. Использует прогрессию. Сбрасывается при достижении цели.")
    TEN_UNIT(TenUnitStrategy.class, "Ten Unit Target"),

    @Schema(description = "TEN_UNIT_V2 (Ten Unit V2 (Safe)) - 10 Юнитов V2. Улучшенная версия со 'сбросом убытка' (Safety Breaker) и динамическим размером юнита.")
    TEN_UNIT_V2(TenUnitStrategyV2.class, "Ten Unit V2 (Safe)"),

    @Schema(description = "THIRTY_ONE_SYSTEM (System 31) - Система 31. Прогрессия 1-1-1-2-2-4-4-8-8. Позволяет выиграть при любой двойной победе.")
    THIRTY_ONE_SYSTEM(ThirtyOneSystemStrategy.class, "System 31"),

    @Schema(description = "TIER_ET_TOUT (Tier Et Tout) - Tier Et Tout. Делит банк на части. Если первая часть проиграна, ставит всё остальное (All-in) на отыгрыш.")
    TIER_ET_TOUT(TierEtToutStrategy.class, "Tier Et Tout"),

    @Schema(description = "TRIPLE_SIX (Triple Six (66%)) - Triple Six. Покрывает более 66% стола агрессивными ставками. Высокие шансы, но дорогая цена ошибки.")
    TRIPLE_SIX(TripleSixStrategy.class, "Triple Six (66%)"),

    @Schema(description = "TWO_IN_ONE (Two In One) - Two In One. Комбинирует две прогрессии. При выигрыше удаляет 2 числа, при проигрыше добавляет 1.")
    TWO_IN_ONE(TwoInOneStrategy.class, "Two In One"),

    @Schema(description = "WHEEL_SECTOR (Wheel Sector) - Сектор Колеса. Предсказывает сектор, куда упадет шарик, и закрывает его целиком.")
    WHEEL_SECTOR(WheelSectorStrategy.class, "Wheel Sector"),

    @Schema(description = "Z_SCORE_REVERSION (Z-Score Reversion) - Z-Score Reversion. Статистический арбитраж. Ищет числа с аномально низким выпадением (Z < -2).")
    Z_SCORE_REVERSION(ZScoreReversionStrategy.class, "Z-Score Reversion"),

    // --- Балансирующие (Balance) ---

    @Schema(description = "COLOR_BALANCE (Color Balance) - Баланс Цветов. Если один цвет доминирует, ставит на другой, ожидая выравнивания статистики.")
    COLOR_BALANCE(ColorBalanceStrategy.class, "Color Balance"),

    @Schema(description = "DISTANT_PROGRESSION_BALANCE (Distant Balance) - Дистанционный Баланс. Отслеживает отстающие дюжины на длинной дистанции.")
    DISTANT_PROGRESSION_BALANCE(DistantProgressionBalanceStrategy.class, "Distant Balance"),

    @Schema(description = "EVEN_ODD_BALANCE (Even/Odd Balance) - Баланс Чет/Нечет. Ставит на выравнивание пропорции четных и нечетных чисел.")
    EVEN_ODD_BALANCE(EvenOddBalanceStrategy.class, "Even/Odd Balance"),

    // --- Гибридные и AI (Hybrid) ---

    @Schema(description = "DYNAMIC_HYBRID_PREDICTOR (Dynamic Hybrid) - Динамический Гибрид. Взвешивает мнение разных предикторов в зависимости от их текущей успешности.")
    DYNAMIC_HYBRID_PREDICTOR(DynamicHybridPredictorStrategy.class, "Dynamic Hybrid"),

    @Schema(description = "HYBRID_PREDICTOR (Hybrid Predictor) - Гибридный Предиктор. Комбинирует Маркова и Частотный анализ с фиксированными весами.")
    HYBRID_PREDICTOR(HybridPredictorStrategy.class, "Hybrid Predictor"),

    @Schema(description = "SELF_TUNING_HYBRID (Self-Tuning Hybrid) - Само-настраивающийся Гибрид. Меняет параметры агрессивности в зависимости от текущего Винрейта.")
    SELF_TUNING_HYBRID(SelfTuningHybridStrategy.class, "Self-Tuning Hybrid"),

    // --- Критерий Келли (Kelly) ---

    @Schema(description = "KELLY_CRITERION (Kelly Criterion) - Критерий Келли. Рассчитывает идеальный размер ставки на основе вероятности и коэффициента выигрыша.")
    KELLY_CRITERION(KellyCriterionStrategy.class, "Kelly Criterion"),

    @Schema(description = "SAFER_KELLY_CRITERION (Safer Kelly) - Безопасный Келли. Ограничивает размер ставки Келли, чтобы избежать катастрофических потерь.")
    SAFER_KELLY_CRITERION(SaferKellyCriterionStrategy.class, "Safer Kelly"),

    @Schema(description = "SAFER_KELLY_CRITERION_V2 (Safer Kelly V2) - Безопасный Келли V2. Использует дробный Келли (0.25) и жесткий потолок ставки (1.5%).")
    SAFER_KELLY_CRITERION_V2(SaferKellyCriterionStrategyV2.class, "Safer Kelly V2"),

    // --- Менеджеры (Managers) ---

    @Schema(description = "ADVANCED_MANAGER (Advanced Manager) - Продвинутый Менеджер. Анализирует Sharpe Ratio под-стратегий и перераспределяет капитал.")
    ADVANCED_MANAGER(AdvancedManager.class, "Advanced Manager"),

    @Schema(description = "DYNAMIC_ALLOCATION_MANAGER (Dynamic Allocation) - Динамический Менеджер. Отключает проигрывающие стратегии и усиливает выигрывающие.")
    DYNAMIC_ALLOCATION_MANAGER(DynamicAllocationManager.class, "Dynamic Allocation"),

    @Schema(description = "ENHANCED_MARKET_REGIME (Enhanced Regime) - Улучшенный Режим Рынка. Переключается между Трендовыми и Реверсивными стратегиями.")
    ENHANCED_MARKET_REGIME(EnhancedMarketRegimeStrategy.class, "Enhanced Regime"),

    @Schema(description = "GLOBAL_MANAGER (Global Manager) - Глобальный Менеджер. Управляет широким портфелем, выбирая топ-3 активных стратегии.")
    GLOBAL_MANAGER(GlobalManager.class, "Global Manager"),

    @Schema(description = "STRATEGY_MANAGER (Strategy Manager) - Менеджер Стратегий. Базовый менеджер для переключения между набором пресетов.")
    STRATEGY_MANAGER(StrategyManager.class, "Strategy Manager"),

    // --- Мартингейлы (Martingale variations) ---

    @Schema(description = "CAPPED_MARTINGALE (Capped Martingale) - Capped Martingale. Мартингейл с ограничением максимальной серии удвоений (Stop Loss).")
    CAPPED_MARTINGALE(CappedMartingaleStrategy.class, "Capped Martingale"),

    @Schema(description = "EAST_COAST_PROGRESSION (East Coast Progression) - East Coast. Агрессивная прогрессия, которая пытается быстро восстановиться после просадки.")
    EAST_COAST_PROGRESSION(EastCoastProgressionStrategy.class, "East Coast Progression"),

    @Schema(description = "GRAND_MARTINGALE (Grand Martingale) - Гранд Мартингейл. Удваивает ставку + добавляет единицу, чтобы получить прибыль сверх возврата.")
    GRAND_MARTINGALE(GrandMartingaleStrategy.class, "Grand Martingale"),

    @Schema(description = "MARTINGALE (Martingale (Classic)) - Мартингейл (Классика). Удваивает ставку при проигрыше на Красное.")
    MARTINGALE(MartingaleStrategy.class, "Martingale (Classic)"),

    @Schema(description = "MARTINGALE_2 (Martingale (Adaptive Color)) - Мартингейл 2. Адаптивный Мартингейл, выбирающий цвет на основе статистики.")
    MARTINGALE_2(MartingaleStrategy2.class, "Martingale (Adaptive Color)"),

    @Schema(description = "MARTINGALE_3 (Martingale (Predictive)) - Мартингейл 3. Использует CountPredictor для выбора направления ставки.")
    MARTINGALE_3(MartingaleStrategy3.class, "Martingale (Predictive)"),

    @Schema(description = "MARTINGALE_4 (Martingale (Dozens)) - Мартингейл 4. Прогрессия на Дюжины (x1.5 или x3 при проигрыше).")
    MARTINGALE_4(MartingaleStrategy4.class, "Martingale (Dozens)"),

    @Schema(description = "MARTINGALE_5 (Martingale (Straight Up 18)) - Мартингейл 5. Агрессивная прогрессия на покрытие 18 отдельных номеров.")
    MARTINGALE_5(MartingaleStrategy5.class, "Martingale (Straight Up 18)"),

    // --- Режимы (Regime) ---

    @Schema(description = "GAME_REGIME (Game Regime Detector) - Игровой Режим. Пытается определить: Тренд, Чередование или Хаос, и ставит соответственно.")
    GAME_REGIME(GameRegimeStrategy.class, "Game Regime Detector"),

    @Schema(description = "MARKET_REGIME (Market Regime) - Рыночный Режим. Анализирует волатильность баланса для определения тактики.")
    MARKET_REGIME(MarketRegimeStrategy.class, "Market Regime"),

    // --- Специальные (Special) ---

    @Schema(description = "BAYESIAN_META (Bayesian Meta-Strategy) - Байесовская Мета. Использует теорему Байеса для оценки вероятности истинности разных моделей прогноза.")
    BAYESIAN_META(BayesianMetaStrategy.class, "Bayesian Meta-Strategy"),

    @Schema(description = "DEALER_SIGNATURE (Dealer Signature) - Почерк Дилера. Ищет закономерности в смещении сектора падения шарика (Rotor speed).")
    DEALER_SIGNATURE(DealerSignatureStrategy.class, "Dealer Signature"),

    @Schema(description = "INSIDER_INFO (Insider Info (Sim)) - Инсайд. Симулирует наличие внешней информации (например, запрет ставить на определенные числа).")
    INSIDER_INFO(InsiderInfoStrategy.class, "Insider Info (Sim)"),

    @Schema(description = "SHANNON_ENTROPY (Shannon Entropy) - Энтропия Шеннона. Анализирует уровень хаоса. При низкой энтропии играет по тренду.")
    SHANNON_ENTROPY(ShannonEntropyStrategy.class, "Shannon Entropy"),

    @Schema(description = "WEIGHTED_STATISTIC (Weighted Statistic) - Взвешенная Статистика. Ставит на числа пропорционально частоте их выпадения (Weight).")
    WEIGHTED_STATISTIC(WeightedStatisticStrategy.class, "Weighted Statistic"),

    // --- Волатильность (Volatility) ---

    @Schema(description = "ADAPTER_VOLATILITY (Adaptive Volatility) - Адаптивная Волатильность. Меняет размер ставки в зависимости от 'тряски' баланса.")
    ADAPTER_VOLATILITY(AdaptiveVolatilityStrategy.class, "Adaptive Volatility"),

    @Schema(description = "ADAPTER_VOLATILITY_V2 (Adaptive Volatility V2) - Адаптивная Волатильность V2. Переключается между Paroli (атака) и Flat (защита).")
    ADAPTER_VOLATILITY_V2(AdaptiveVolatilityStrategyV2.class, "Adaptive Volatility V2"),

    @Schema(description = "SIMPLE_ADAPTER_VOLATILITY (Simple Volatility) - Простая Адаптивная. Упрощенная версия реакции на изменения баланса.")
    SIMPLE_ADAPTER_VOLATILITY(SimpleAdaptiveVolatilityStrategy.class, "Simple Volatility");

    private final Class<? extends IStrategy> clazz;
    private final String label;
}