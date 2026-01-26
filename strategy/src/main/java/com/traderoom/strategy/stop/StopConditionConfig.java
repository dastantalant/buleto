package com.traderoom.strategy.stop;

import lombok.Builder;

import java.io.Serializable;
import java.util.Objects;

/**
 * Конфигурация условий аварийной или плановой остановки стратегии.
 * Определяет границы рисков и целевые показатели.
 * <p>
 * Если поле равно null или 0 (для некоторых параметров), соответствующее условие считается отключенным.
 *
 * @param stopLossPercentage      <strong>Stop Loss (Ограничение убытка) в процентах от начального баланса.</strong>
 *                                <p>
 *                                Если текущий баланс упадет ниже этого уровня относительно старта, игра остановится.
 *                                <br>
 *                                <em>Пример:</em> Стартовый баланс 1000, stopLossPercentage = 20.
 *                                Условие сработает, если баланс станет <= 800 (1000 - 20%).
 * @param takeProfitPercentage    <strong>Take Profit (Фиксация прибыли) в процентах от начального баланса.</strong>
 *                                <p>
 *                                Если текущий баланс вырастет выше этого уровня относительно старта, игра остановится.
 *                                <br>
 *                                <em>Пример:</em> Стартовый баланс 1000, takeProfitPercentage = 50.
 *                                Условие сработает, если баланс станет >= 1500 (1000 + 50%).
 * @param trailingStopPercentage  <strong>Trailing Stop (Скользящий стоп) в процентах от пикового баланса.</strong>
 *                                <p>
 *                                Фиксирует прибыль. Если баланс упадет на указанный процент от <strong>максимально достигнутого</strong>
 *                                за время игры значения, стратегия остановится.
 *                                <br>
 *                                <em>Пример:</em> Баланс поднялся до 2000 (пик). trailingStopPercentage = 10.
 *                                Условие сработает, если баланс откатится до 1800 (2000 - 10%).
 * @param maxDrawdownPercentage   <strong>Максимальная допустимая просадка (Max Drawdown) в процентах.</strong>
 *                                <p>
 *                                Это условие останавливает стратегию, если текущий баланс снизился относительно
 *                                <strong>максимального значения (Peak Balance)</strong>, достигнутого за всё время игры,
 *                                более чем на указанный процент.
 *                                <p>
 *                                Это механизм защиты накопленной прибыли. В отличие от {@code stopLossPercentage} (который считает от стартового баланса),
 *                                этот параметр динамически отслеживает вашу "вершину".
 *                                <p>
 *                                <strong>Формула срабатывания:</strong>
 *                                <br>
 *                                {@code (Пиковый_Баланс - Текущий_Баланс) >= (Пиковый_Баланс * Процент / 100)}
 *                                <p>
 *                                <em>Пример:</em>
 *                                <ul>
 *                                    <li>Старт: 1000$. {@code maxDrawdownPercentage} = 25%.</li>
 *                                    <li>Вы играете и выигрываете, баланс растет: 1200... 1500... <strong>2000$</strong>.</li>
 *                                    <li>2000$ — это ваш текущий Пик (Peak Balance).</li>
 *                                    <li>Допустимая просадка: 25% от 2000$ = 500$.</li>
 *                                    <li>Порог остановки: 2000$ - 500$ = <strong>1500$</strong>.</li>
 *                                    <li>Если начнется серия неудач и баланс упадет до 1500$ или ниже, стратегия остановится.</li>
 *                                </ul>
 * @param maxWinStreak            <strong>Максимальная серия побед (Win Streak).</strong>
 *                                <p>
 *                                Остановка после указанного количества выигранных раундов подряд.
 *                                Полезно для стратегий "Hit and Run" (забрал и ушел).
 *                                <br>
 *                                <em>Пример:</em> maxWinStreak = 5. Победа -> Победа -> Победа -> Победа -> Победа -> СТОП.
 * @param maxLossStreak           <strong>Максимальная серия поражений (Loss Streak).</strong>
 *                                <p>
 *                                Остановка после указанного количества проигранных раундов подряд.
 *                                Предохранитель для мартингейл-подобных стратегий.
 *                                <br>
 *                                <em>Пример:</em> maxLossStreak = 6. Шесть поражений подряд вызовут остановку.
 * @param maxRounds               <strong>Лимит количества раундов.</strong>
 *                                <p>
 *                                Жесткое ограничение на длительность игровой сессии.
 *                                <br>
 *                                <em>Пример:</em> maxRounds = 1000. После 1000-го спина игра завершится независимо от результата.
 * @param maxBetBalancePercentage <strong>Максимальный риск на ставку (в долях от баланса).</strong>
 *                                <p>
 *                                Останавливает стратегию, если она пытается сделать ставку, размер которой превышает
 *                                указанную долю от <em>текущего</em> баланса. Защита от "слива" одной ставкой.
 *                                <br>
 *                                <em>Пример:</em> maxBetBalancePercentage = 0.10 (10%).
 *                                Баланс 5000. Стратегия хочет поставить 600. 600/5000 = 0.12 (12%).
 *                                Так как 12% > 10%, игра будет остановлена перед этой ставкой.
 * @param stagnationWindow        <strong>Окно стагнации (количество раундов).</strong>
 *                                <p>
 *                                Остановка, если баланс не изменяется в течение указанного числа раундов
 *                                (например, стратегия перестала делать ставки из-за внутренних фильтров).
 *                                <br>
 *                                <em>Пример:</em> stagnationWindow = 50. Если 50 раундов подряд баланс один и тот же -> СТОП.
 * @param minWinRateThreshold     <strong>Минимальный порог Винрейта (Win Rate).</strong>
 *                                <p>
 *                                Значение от 0.0 до 1.0. Если процент побед падает ниже этого уровня, игра останавливается.
 *                                <br>
 *                                <em>Пример:</em> minWinRateThreshold = 0.45 (45%).
 * @param minRoundsForWinRate     <strong>Период "разогрева" для проверки Винрейта.</strong>
 *                                <p>
 *                                Количество раундов, в течение которых проверка `minWinRateThreshold` игнорируется.
 *                                Позволяет стратегии набрать статистику, чтобы не остановиться после первых пары неудач.
 *                                <br>
 *                                <em>Пример:</em> minRoundsForWinRate = 100. Проверка на низкий винрейт начнется только со 101-го раунда.
 */
@Builder
public record StopConditionConfig(

        /**
         * <strong>Stop Loss (Ограничение убытка) в процентах от начального баланса.</strong>
         * <p>
         * Если текущий баланс упадет ниже этого уровня относительно старта, игра остановится.
         * <br>
         * <em>Пример:</em> Стартовый баланс 1000, stopLossPercentage = 20.
         * Условие сработает, если баланс станет <= 800 (1000 - 20%).
         */
        Integer stopLossPercentage,

        /**
         * <strong>Take Profit (Фиксация прибыли) в процентах от начального баланса.</strong>
         * <p>
         * Если текущий баланс вырастет выше этого уровня относительно старта, игра остановится.
         * <br>
         * <em>Пример:</em> Стартовый баланс 1000, takeProfitPercentage = 50.
         * Условие сработает, если баланс станет >= 1500 (1000 + 50%).
         */
        Integer takeProfitPercentage,

        /**
         * <strong>Trailing Stop (Скользящий стоп) в процентах от пикового баланса.</strong>
         * <p>
         * Фиксирует прибыль. Если баланс упадет на указанный процент от <strong>максимально достигнутого</strong>
         * за время игры значения, стратегия остановится.
         * <br>
         * <em>Пример:</em> Баланс поднялся до 2000 (пик). trailingStopPercentage = 10.
         * Условие сработает, если баланс откатится до 1800 (2000 - 10%).
         */
        Integer trailingStopPercentage,

        /**
         * <strong>Максимальная допустимая просадка (Max Drawdown) в процентах.</strong>
         * <p>
         * Это условие останавливает стратегию, если текущий баланс снизился относительно
         * <strong>максимального значения (Peak Balance)</strong>, достигнутого за всё время игры,
         * более чем на указанный процент.
         * <p>
         * Это механизм защиты накопленной прибыли. В отличие от {@code stopLossPercentage} (который считает от стартового баланса),
         * этот параметр динамически отслеживает вашу "вершину".
         * <p>
         * <strong>Формула срабатывания:</strong>
         * <br>
         * {@code (Пиковый_Баланс - Текущий_Баланс) >= (Пиковый_Баланс * Процент / 100)}
         * <p>
         * <em>Пример:</em>
         * <ul>
         *     <li>Старт: 1000$. {@code maxDrawdownPercentage} = 25%.</li>
         *     <li>Вы играете и выигрываете, баланс растет: 1200... 1500... <strong>2000$</strong>.</li>
         *     <li>2000$ — это ваш текущий Пик (Peak Balance).</li>
         *     <li>Допустимая просадка: 25% от 2000$ = 500$.</li>
         *     <li>Порог остановки: 2000$ - 500$ = <strong>1500$</strong>.</li>
         *     <li>Если начнется серия неудач и баланс упадет до 1500$ или ниже, стратегия остановится.</li>
         * </ul>
         */
        Integer maxDrawdownPercentage,

        /**
         * <strong>Максимальная серия побед (Win Streak).</strong>
         * <p>
         * Остановка после указанного количества выигранных раундов подряд.
         * Полезно для стратегий "Hit and Run" (забрал и ушел).
         * <br>
         * <em>Пример:</em> maxWinStreak = 5. Победа -> Победа -> Победа -> Победа -> Победа -> СТОП.
         */
        Integer maxWinStreak,

        /**
         * <strong>Максимальная серия поражений (Loss Streak).</strong>
         * <p>
         * Остановка после указанного количества проигранных раундов подряд.
         * Предохранитель для мартингейл-подобных стратегий.
         * <br>
         * <em>Пример:</em> maxLossStreak = 6. Шесть поражений подряд вызовут остановку.
         */
        Integer maxLossStreak,

        /**
         * <strong>Лимит количества раундов.</strong>
         * <p>
         * Жесткое ограничение на длительность игровой сессии.
         * <br>
         * <em>Пример:</em> maxRounds = 1000. После 1000-го спина игра завершится независимо от результата.
         */
        Long maxRounds,

        /**
         * <strong>Максимальный риск на ставку (в долях от баланса).</strong>
         * <p>
         * Останавливает стратегию, если она пытается сделать ставку, размер которой превышает
         * указанную долю от <em>текущего</em> баланса. Защита от "слива" одной ставкой.
         * <br>
         * <em>Пример:</em> maxBetBalancePercentage = 0.10 (10%).
         * Баланс 5000. Стратегия хочет поставить 600. 600/5000 = 0.12 (12%).
         * Так как 12% > 10%, игра будет остановлена перед этой ставкой.
         */
        Double maxBetBalancePercentage,

        /**
         * <strong>Окно стагнации (количество раундов).</strong>
         * <p>
         * Остановка, если баланс не изменяется в течение указанного числа раундов
         * (например, стратегия перестала делать ставки из-за внутренних фильтров).
         * <br>
         * <em>Пример:</em> stagnationWindow = 50. Если 50 раундов подряд баланс один и тот же -> СТОП.
         */
        Integer stagnationWindow,

        /**
         * <strong>Минимальный порог Винрейта (Win Rate).</strong>
         * <p>
         * Значение от 0.0 до 1.0. Если процент побед падает ниже этого уровня, игра останавливается.
         * <br>
         * <em>Пример:</em> minWinRateThreshold = 0.45 (45%).
         */
        Double minWinRateThreshold,

        /**
         * <strong>Период "разогрева" для проверки Винрейта.</strong>
         * <p>
         * Количество раундов, в течение которых проверка `minWinRateThreshold` игнорируется.
         * Позволяет стратегии набрать статистику, чтобы не остановиться после первых пары неудач.
         * <br>
         * <em>Пример:</em> minRoundsForWinRate = 100. Проверка на низкий винрейт начнется только со 101-го раунда.
         */
        Long minRoundsForWinRate
) implements Serializable {

    @Builder
    public StopConditionConfig(
            Integer stopLossPercentage,
            Integer takeProfitPercentage,
            Integer trailingStopPercentage,
            Integer maxDrawdownPercentage,
            Integer maxWinStreak,
            Integer maxLossStreak,
            Long maxRounds,
            Double maxBetBalancePercentage,
            Integer stagnationWindow,
            Double minWinRateThreshold,
            Long minRoundsForWinRate
    ) {
        this.stopLossPercentage = Objects.requireNonNullElse(stopLossPercentage, 0);
        this.takeProfitPercentage = Objects.requireNonNullElse(takeProfitPercentage, 0);
        this.trailingStopPercentage = Objects.requireNonNullElse(trailingStopPercentage, 0);
        this.maxDrawdownPercentage = Objects.requireNonNullElse(maxDrawdownPercentage, 0);
        this.maxWinStreak = Objects.requireNonNullElse(maxWinStreak, 0);
        this.maxLossStreak = Objects.requireNonNullElse(maxLossStreak, 0);
        this.maxRounds = (maxRounds == null || maxRounds < 0) ? 10_000L : maxRounds;
        this.maxBetBalancePercentage = Objects.requireNonNullElse(maxBetBalancePercentage, 0.0);
        this.stagnationWindow = Objects.requireNonNullElse(stagnationWindow, 0);
        this.minWinRateThreshold = Objects.requireNonNullElse(minWinRateThreshold, 0.0);
        this.minRoundsForWinRate = (minRoundsForWinRate == null || minRoundsForWinRate < 0) ? 100L : minRoundsForWinRate;

        if (this.stopLossPercentage < 0 || this.stopLossPercentage > 100)
            throw new IllegalArgumentException("stopLossPercentage must be between 0 and 100");
        if (this.takeProfitPercentage < 0)
            throw new IllegalArgumentException("takeProfitPercentage must be greater than 0");
    }

    private static final long serialVersionUID = 1L;

    public static StopConditionConfig of() {
        return StopConditionConfig.builder().build();
    }
}