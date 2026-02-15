package com.buleto.common.model.request;

import com.buleto.common.model.RawConfigModel;
import com.buleto.common.strategy.StrategyEnum;
import io.swagger.v3.oas.annotations.media.Schema;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ConfigRequest {
    private RawConfigModel payload;
    @Schema(enumAsRef = true,
            description = """
                    <strong>Типы стратегий и их описание</strong>
                    <ul>
                        <li><strong>BARNET</strong>(Barnet (1-3-2-6)) - Барнет (1-3-2-6). Позитивная прогрессия на равные шансы. Пытается поймать серию из 4 побед подряд.</li>
                        <li><strong>COCOMBO</strong>(Cocomo (Дюжины)) - Кокомо. Ставка на две дюжины. Ждет серию промахов, затем начинает агрессивную прогрессию.</li>
                        <li><strong>COLD_NUMBERS</strong>(Cold Numbers) - Холодные числа. Ставит на номера, которые выпадали реже всего за последнее время, ожидая их возврата.</li>
                        <li><strong>D_ALEMBERT</strong>(D'Alembert) - Д'Аламбер. Консервативная прогрессия на равные шансы: +1 юнит при проигрыше, -1 при выигрыше.</li>
                        <li><strong>ENSEMBLE_PREDICTION</strong>(Ensemble Prediction) - Ансамбль. Использует коллективное мнение (голосование) нескольких алгоритмов (Марков, Паттерны, Статистика).</li>
                        <li><strong>FIBONACCI</strong>(Fibonacci) - Фибоначчи. Использует последовательность Фибоначчи для определения размера ставки при проигрыше на равных шансах.</li>
                        <li><strong>GAP_ANALYSIS</strong>(Gap Analysis) - Гэп-анализ. Отслеживает 'разрывы' (gaps) в истории выпадений чисел. Ставит на те, что давно не появлялись.</li>
                        <li><strong>GAP_ANALYSIS_V2</strong>(Gap Analysis V2) - Гэп-анализ V2. Улучшенная версия с адаптивным порогом входа и мягкой прогрессией.</li>
                        <li><strong>GOODMAN</strong>(Goodman (1-2-3-5)) - Гудман (1-2-3-5). Консервативная позитивная прогрессия. Фиксирует прибыль при коротких сериях побед.</li>
                        <li><strong>LABOUCHERE</strong>(Labouchere) - Лабушер (Сплит-Мартингейл). Система вычеркивания чисел из ряда. Цель — закрыть ряд и получить прибыль.</li>
                        <li><strong>MANSURIAN</strong>(Mansurian (Углы)) - Мансуриан. Ставки на Углы (Corners). При проигрыше увеличивает количество закрываемых углов.</li>
                        <li><strong>MEAN_REVISION</strong>(Mean Reversion) - Возврат к среднему. Если цвет/дюжина выпадали слишком часто, ставит на противоположный исход.</li>
                        <li><strong>MONTE_CARLO</strong>(Monte Carlo) - Монте-Карло. Использует последовательность 1-2-3 для ставок на дюжины. При выигрыше убирает крайние числа.</li>
                        <li><strong>MULTI_BET</strong>(Multi Bet) - Мульти-ставка. Ставит на несколько наиболее вероятных чисел, предсказанных Марковскими цепями.</li>
                        <li><strong>NEIGHBOR_ANALYSIS</strong>(Neighbor Analysis) - Анализ соседей. Ставит на числа, являющиеся 'соседями' последнего выпавшего числа на физическом колесе.</li>
                        <li><strong>NEIGHBOR_ANALYSIS_V2</strong>(Neighbor Analysis V2) - Анализ соседей V2. Адаптивная версия. Отслеживает 'почерк' дилера и смещение колеса.</li>
                        <li><strong>NEIGHBOR</strong>(Neighbor Bets) - Соседи (Сектора). Ставит на фиксированные группы соседей (Voisins, Tiers, Orphelins) на основе прогноза.</li>
                        <li><strong>NEIGHBOR_V2</strong>(Neighbor Bets V2) - Соседи V2. Динамический поиск горячего сектора на колесе с адаптивным радиусом.</li>
                        <li><strong>ONE_THREE_TWO_SIX</strong>(System 1-3-2-6) - 1-3-2-6. Популярная система позитивной прогрессии. Рискует только выигранными деньгами на 3 и 4 шаге.</li>
                        <li><strong>OSCARS_GRIND</strong>(Oscar's Grind) - Гринд Оскара. Консервативная стратегия. Цель: выиграть ровно 1 юнит за цикл. Не увеличивает ставку при проигрыше.</li>
                        <li><strong>PAROLI</strong>(Paroli) - Пароли. Анти-Мартингейл. Удваивает ставку при выигрыше (до 3 раз), сбрасывает при проигрыше.</li>
                        <li><strong>PATTERN</strong>(Pattern Hunter) - Паттерн. Ищет повторяющиеся последовательности чисел в истории и ставит на продолжение паттерна.</li>
                        <li><strong>PIVOT</strong>(Pivot (Law of Thirds)) - Пивот. Ждет, пока число выпадет дважды (станет Пивотом), и ставит на него фиксированное количество раз.</li>
                        <li><strong>Q_LEARNING_AGENT</strong>(Q-Learning AI) - Q-Learning AI. Обучаемый агент (Reinforcement Learning), который ищет оптимальную стратегию методом проб и ошибок.</li>
                        <li><strong>RANDOM</strong>(Random) - Случайная. Делает абсолютно случайные ставки. Используется как бенчмарк (контрольная группа).</li>
                        <li><strong>RANDOM_2</strong>(Random V2) - Случайная V2. Делает случайные ставки, но пытается 'держать' выигрышные номера.</li>
                        <li><strong>RATE_9848_PERCENT</strong>(Rate 98.48% (Dozens)) - 98.48%. Ставит на две дюжины, если они не выпадали 3 раза подряд. Высокая вероятность, малый выигрыш.</li>
                        <li><strong>RATE_9946_PERCENT</strong>(Rate 99.46% (Dozens)) - 99.46%. Ставит на две дюжины, если они не выпадали 4 раза подряд. Экстремально консервативная.</li>
                        <li><strong>REGIME_SWITHING</strong>(Regime Switching) - Переключение режимов. Анализирует рынок (Тренд/Флэт) и переключается между 'Горячими' и 'Холодными' ставками.</li>
                        <li><strong>REGIME_TREND_FOLLOWER</strong>(Regime Trend Follower) - Следование за трендом. Ставит на простые шансы и дюжины, которые сейчас 'горячие' (выпадают чаще среднего).</li>
                        <li><strong>REPEATING_COLOR_PATTERN</strong>(Repeating Color) - Повтор цвета. Ставит на паттерны цветов (например, R-R-R) или против чередования.</li>
                        <li><strong>REVERSE_MARTINGALE_RED</strong>(Reverse Martingale (Red)) - Обратный Мартингейл Красное. Ставит только на Красное, удваивая при выигрыше.</li>
                        <li><strong>ROMANOVSKY</strong>(Romanosky) - Романовский. Покрывает 32 номера (две дюжины + 4 угла). Высокий винрейт, дорогая ставка.</li>
                        <li><strong>SEVEN_KAIME</strong>(Seven Kaime) - Семь Кайме. Ждет 7 проигрышей подряд на равных шансах (например, 7 красных), затем ставит на противоположное.</li>
                        <li><strong>SMART_MARKOV</strong>(Smart Markov) - Умный Марков. Использует цепи Маркова для предсказания следующего числа на основе предыдущего.</li>
                        <li><strong>SMART_MARKOV_V2</strong>(Smart Markov V2) - Умный Марков V2. Версия с затухающей памятью (Decay) и фильтром шума.</li>
                        <li><strong>STRAIGHT_UP</strong>(Straight Up (Single)) - Straight Up. Ставит на одно наиболее вероятное число (по Маркову). Высокий риск, высокая награда.</li>
                        <li><strong>STRAIGHT_UP_2</strong>(Straight Up 2 (Freq)) - Straight Up 2. Ставит на несколько чисел на основе частотного анализа и управления бюджетом.</li>
                        <li><strong>STRAIGHT_UP_2_V2</strong>(Straight Up 2 V2) - Straight Up 2 V2. Адаптивная версия с динамическим порогом уверенности и защитой капитала.</li>
                        <li><strong>STRAIGHT_UP_3</strong>(Straight Up 3 (Exclusion)) - Straight Up 3. Исключает выпавшие номера за последние N спинов и ставит на оставшиеся.</li>
                        <li><strong>TEN_PERCENT</strong>(Ten Percent (MM)) - 10 процентов. Всегда ставит 10% от текущего банка на равные шансы. Невозможно слить депозит полностью.</li>
                        <li><strong>TEN_UNIT</strong>(Ten Unit Target) - 10 Юнитов. Цель: выиграть 10 единиц за сессию. Использует прогрессию. Сбрасывается при достижении цели.</li>
                        <li><strong>TEN_UNIT_V2</strong>(Ten Unit V2 (Safe)) - 10 Юнитов V2. Улучшенная версия со 'сбросом убытка' (Safety Breaker) и динамическим размером юнита.</li>
                        <li><strong>THIRTY_ONE_SYSTEM</strong>(System 31) - Система 31. Прогрессия 1-1-1-2-2-4-4-8-8. Позволяет выиграть при любой двойной победе.</li>
                        <li><strong>TIER_ET_TOUT</strong>(Tier Et Tout) - Tier Et Tout. Делит банк на части. Если первая часть проиграна, ставит всё остальное (All-in) на отыгрыш.</li>
                        <li><strong>TRIPLE_SIX</strong>(Triple Six (66%)) - Triple Six. Покрывает более 66% стола агрессивными ставками. Высокие шансы, но дорогая цена ошибки.</li>
                        <li><strong>TWO_IN_ONE</strong>(Two In One) - Two In One. Комбинирует две прогрессии. При выигрыше удаляет 2 числа, при проигрыше добавляет 1.</li>
                        <li><strong>WHEEL_SECTOR</strong>(Wheel Sector) - Сектор Колеса. Предсказывает сектор, куда упадет шарик, и закрывает его целиком.</li>
                        <li><strong>Z_SCORE_REVERSION</strong>(Z-Score Reversion) - Z-Score Reversion. Статистический арбитраж. Ищет числа с аномально низким выпадением (Z < -2).</li>
                        <li><strong>COLOR_BALANCE</strong>(Color Balance) - Баланс Цветов. Если один цвет доминирует, ставит на другой, ожидая выравнивания статистики.</li>
                        <li><strong>DISTANT_PROGRESSION_BALANCE</strong>(Distant Balance) - Дистанционный Баланс. Отслеживает отстающие дюжины на длинной дистанции.</li>
                        <li><strong>EVEN_ODD_BALANCE</strong>(Even/Odd Balance) - Баланс Чет/Нечет. Ставит на выравнивание пропорции четных и нечетных чисел.</li>
                        <li><strong>DYNAMIC_HYBRID_PREDICTOR</strong>(Dynamic Hybrid) - Динамический Гибрид. Взвешивает мнение разных предикторов в зависимости от их текущей успешности.</li>
                        <li><strong>HYBRID_PREDICTOR</strong>(Hybrid Predictor) - Гибридный Предиктор. Комбинирует Маркова и Частотный анализ с фиксированными весами.</li>
                        <li><strong>SELF_TUNING_HYBRID</strong>(Self-Tuning Hybrid) - Само-настраивающийся Гибрид. Меняет параметры агрессивности в зависимости от текущего Винрейта.</li>
                        <li><strong>KELLY_CRITERION</strong>(Kelly Criterion) - Критерий Келли. Рассчитывает идеальный размер ставки на основе вероятности и коэффициента выигрыша.</li>
                        <li><strong>SAFER_KELLY_CRITERION</strong>(Safer Kelly) - Безопасный Келли. Ограничивает размер ставки Келли, чтобы избежать катастрофических потерь.</li>
                        <li><strong>SAFER_KELLY_CRITERION_V2</strong>(Safer Kelly V2) - Безопасный Келли V2. Использует дробный Келли (0.25) и жесткий потолок ставки (1.5%).</li>
                        <li><strong>ADVANCED_MANAGER</strong>(Advanced Manager) - Продвинутый Менеджер. Анализирует Sharpe Ratio под-стратегий и перераспределяет капитал.</li>
                        <li><strong>DYNAMIC_ALLOCATION_MANAGER</strong>(Dynamic Allocation) - Динамический Менеджер. Отключает проигрывающие стратегии и усиливает выигрывающие.</li>
                        <li><strong>ENHANCED_MARKET_REGIME</strong>(Enhanced Regime) - Улучшенный Режим Рынка. Переключается между Трендовыми и Реверсивными стратегиями.</li>
                        <li><strong>GLOBAL_MANAGER</strong>(Global Manager) - Глобальный Менеджер. Управляет широким портфелем, выбирая топ-3 активных стратегии.</li>
                        <li><strong>STRATEGY_MANAGER</strong>(Strategy Manager) - Менеджер Стратегий. Базовый менеджер для переключения между набором пресетов.</li>
                        <li><strong>CAPPED_MARTINGALE</strong>(Capped Martingale) - Capped Martingale. Мартингейл с ограничением максимальной серии удвоений (Stop Loss).</li>
                        <li><strong>EAST_COAST_PROGRESSION</strong>(East Coast Progression) - East Coast. Агрессивная прогрессия, которая пытается быстро восстановиться после просадки.</li>
                        <li><strong>GRAND_MARTINGALE</strong>(Grand Martingale) - Гранд Мартингейл. Удваивает ставку + добавляет единицу, чтобы получить прибыль сверх возврата.</li>
                        <li><strong>MARTINGALE</strong>(Martingale (Classic)) - Мартингейл (Классика). Удваивает ставку при проигрыше на Красное.</li>
                        <li><strong>MARTINGALE_2</strong>(Martingale (Adaptive Color)) - Мартингейл 2. Адаптивный Мартингейл, выбирающий цвет на основе статистики.</li>
                        <li><strong>MARTINGALE_3</strong>(Martingale (Predictive)) - Мартингейл 3. Использует CountPredictor для выбора направления ставки.</li>
                        <li><strong>MARTINGALE_4</strong>(Martingale (Dozens)) - Мартингейл 4. Прогрессия на Дюжины (x1.5 или x3 при проигрыше).</li>
                        <li><strong>MARTINGALE_5</strong>(Martingale (Straight Up 18)) - Мартингейл 5. Агрессивная прогрессия на покрытие 18 отдельных номеров.</li>
                        <li><strong>GAME_REGIME</strong>(Game Regime Detector) - Игровой Режим. Пытается определить: Тренд, Чередование или Хаос, и ставит соответственно.</li>
                        <li><strong>MARKET_REGIME</strong>(Market Regime) - Рыночный Режим. Анализирует волатильность баланса для определения тактики.</li>
                        <li><strong>BAYESIAN_META</strong>(Bayesian Meta-Strategy) - Байесовская Мета. Использует теорему Байеса для оценки вероятности истинности разных моделей прогноза.</li>
                        <li><strong>DEALER_SIGNATURE</strong>(Dealer Signature) - Почерк Дилера. Ищет закономерности в смещении сектора падения шарика (Rotor speed).</li>
                        <li><strong>INSIDER_INFO</strong>(Insider Info (Sim)) - Инсайд. Симулирует наличие внешней информации (например, запрет ставить на определенные числа).</li>
                        <li><strong>SHANNON_ENTROPY</strong>(Shannon Entropy) - Энтропия Шеннона. Анализирует уровень хаоса. При низкой энтропии играет по тренду.</li>
                        <li><strong>WEIGHTED_STATISTIC</strong>(Weighted Statistic) - Взвешенная Статистика. Ставит на числа пропорционально частоте их выпадения (Weight).</li>
                        <li><strong>ADAPTER_VOLATILITY</strong>(Adaptive Volatility) - Адаптивная Волатильность. Меняет размер ставки в зависимости от 'тряски' баланса.</li>
                        <li><strong>ADAPTER_VOLATILITY_V2</strong>(Adaptive Volatility V2) - Адаптивная Волатильность V2. Переключается между Paroli (атака) и Flat (защита).</li>
                        <li><strong>SIMPLE_ADAPTER_VOLATILITY</strong>(Simple Volatility) - Простая Адаптивная. Упрощенная версия реакции на изменения баланса.</li>
                    </ul>
                    """)
    private List<StrategyEnum> strategies;
}
