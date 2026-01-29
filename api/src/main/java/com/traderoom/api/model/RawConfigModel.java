package com.traderoom.api.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.traderoom.strategy.enums.RouletteType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = """
        Модель для создания конфигурации торговой стратегии.
        Включает в себя базовые параметры, условия остановки и правила управления рисками.
        """)
public class RawConfigModel {

    @Schema(description = "Уникальное имя конфигурации",
            example = "Моя агрессивная стратегия",
            requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Schema(description = "Тип рулетки, для которой предназначена конфигурация (например, EUROPEAN, AMERICAN)",
            example = "AMERICAN",
            requiredMode = Schema.RequiredMode.REQUIRED,
            allowableValues = {"AMERICAN"})
    private final RouletteType type = RouletteType.AMERICAN;

    @Schema(description = "Стартовый баланс для игры",
            example = "1000",
            requiredMode = Schema.RequiredMode.REQUIRED)
    private Long balance;

    @Schema(description = "Минимально допустимая ставка за раунд (лимит стола)",
            example = "10",
            requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("min_bet")
    private Long minBet;

    @Schema(description = "Максимально допустимая ставка за раунд (лимит стола)",
            example = "500",
            requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonProperty("max_bet")
    private Long maxBet;

    @Schema(description = "Общий лимит ставок на один раунд (если отличается от max_bet)",
            example = "1000")
    @JsonProperty("table_limit")
    private Long limit;

    // --- Поля из StopConditionConfig ---

    @Schema(description = """
            <strong>Stop Loss (Ограничение убытка) в процентах от начального баланса.</strong>
            <p>
            Если текущий баланс упадет ниже этого уровня относительно старта, игра остановится.
            <br>
            <em>Пример:</em> Стартовый баланс 1000, stopLossPercentage = 20.
            Условие сработает, если баланс станет <= 800 (1000 - 20%).
            """, example = "20",
            minimum = "0",
            maximum = "100")
    @JsonProperty("stop_loss_percentage")
    private Integer stopLossPercentage;

    @Schema(description = """
            <strong>Take Profit (Фиксация прибыли) в процентах от начального баланса.</strong>
            <p>
            Если текущий баланс вырастет выше этого уровня относительно старта, игра остановится.
            <br>
            <em>Пример:</em> Стартовый баланс 1000, takeProfitPercentage = 50.
            Условие сработает, если баланс станет >= 1500 (1000 + 50%).
            """,
            example = "50",
            minimum = "0")
    @JsonProperty("take_profit_percentage")
    private Integer takeProfitPercentage;

    @Schema(description = """
            <strong>Trailing Stop (Скользящий стоп) в процентах от пикового баланса.</strong>
            <p>
            Фиксирует прибыль. Если баланс упадет на указанный процент от <strong>максимально достигнутого</strong>
            за время игры значения, стратегия остановится.
            <br>
            <em>Пример:</em> Баланс поднялся до 2000 (пик). trailingStopPercentage = 10.
            Условие сработает, если баланс откатится до 1800 (2000 - 10%).
            """,
            example = "10",
            minimum = "0")
    @JsonProperty("trailing_stop_percentage")
    private Integer trailingStopPercentage;

    @Schema(description = """
            <strong>Максимальная допустимая просадка (Max Drawdown) в процентах.</strong>
            <p>
            Это условие останавливает стратегию, если текущий баланс снизился относительно
            <strong>максимального значения (Peak Balance)</strong>, достигнутого за всё время игры,
            более чем на указанный процент.
            <p>
            Это механизм защиты накопленной прибыли. В отличие от {@code stopLossPercentage} (который считает от стартового баланса),
            этот параметр динамически отслеживает вашу "вершину".
            <p>
            <strong>Формула срабатывания:</strong>
            <br>
            {@code (Пиковый_Баланс - Текущий_Баланс) >= (Пиковый_Баланс * Процент / 100)}
            <p>
            <em>Пример:</em>
            <ul>
                <li>Старт: 1000$. {@code maxDrawdownPercentage} = 25%.</li>
                <li>Вы играете и выигрываете, баланс растет: 1200... 1500... <strong>2000$</strong>.</li>
                <li>2000$ — это ваш текущий Пик (Peak Balance).</li>
                <li>Допустимая просадка: 25% от 2000$ = 500$.</li>
                <li>Порог остановки: 2000$ - 500$ = <strong>1500$</strong>.</li>
                <li>Если начнется серия неудач и баланс упадет до 1500$ или ниже, стратегия остановится.</li>
            </ul>
            """,
            example = "25",
            minimum = "0")
    @JsonProperty("max_drawdown_percentage")
    private Integer maxDrawdownPercentage;

    @Schema(description = """
            <strong>Максимальная серия побед (Win Streak).</strong>
            <p>
            Остановка после указанного количества выигранных раундов подряд.
            Полезно для стратегий "Hit and Run" (забрал и ушел).
            <br>
            <em>Пример:</em> maxWinStreak = 5. Победа -> Победа -> Победа -> Победа -> Победа -> СТОП.
            """,
            example = "5",
            minimum = "0")
    @JsonProperty("max_win_streak")
    private Integer maxWinStreak;

    @Schema(description = """
            <strong>Максимальная серия поражений (Loss Streak).</strong>
            <p>
            Остановка после указанного количества проигранных раундов подряд.
            Предохранитель для мартингейл-подобных стратегий.
            <br>
            <em>Пример:</em> maxLossStreak = 6. Шесть поражений подряд вызовут остановку.
            """,
            example = "6",
            minimum = "0")
    @JsonProperty("max_loss_streak")
    private Integer maxLossStreak;

    @Schema(description = """
            <strong>Лимит количества раундов.</strong>
            <p>
            Жесткое ограничение на длительность игровой сессии.
            <br>
            <em>Пример:</em> maxRounds = 1000. После 1000-го спина игра завершится независимо от результата.
            """,
            example = "1000",
            minimum = "1")
    @JsonProperty("max_rounds")
    private Long maxRounds;

    @Schema(description = """
            <strong>Максимальный риск на ставку (в долях от баланса).</strong>
            <p>
            Останавливает стратегию, если она пытается сделать ставку, размер которой превышает
            указанную долю от <em>текущего</em> баланса. Защита от "слива" одной ставкой.
            <br>
            <em>Пример:</em> maxBetBalancePercentage = 0.10 (10%).
            Баланс 5000. Стратегия хочет поставить 600. 600/5000 = 0.12 (12%).
            Так как 12% > 10%, игра будет остановлена перед этой ставкой.
            """,
            example = "0.1",
            minimum = "0",
            maximum = "1")
    @JsonProperty("max_bet_balance_percentage")
    private Double maxBetBalancePercentage;

    @Schema(description = """
            <strong>Окно стагнации (количество раундов).</strong>
            <p>
            Остановка, если баланс не изменяется в течение указанного числа раундов
            (например, стратегия перестала делать ставки из-за внутренних фильтров).
            <br>
            <em>Пример:</em> stagnationWindow = 50. Если 50 раундов подряд баланс один и тот же -> СТОП.
            """,
            example = "50",
            minimum = "0")
    @JsonProperty("stagnation_windows")
    private Integer stagnationWindow;

    @Schema(description = """
            <strong>Минимальный порог Винрейта (Win Rate).</strong>
            <p>
            Значение от 0.0 до 1.0. Если процент побед падает ниже этого уровня, игра останавливается.
            <br>
            <em>Пример:</em> minWinRateThreshold = 0.45 (45%).
            """,
            example = "0.45",
            minimum = "0",
            maximum = "1")
    @JsonProperty("min_win_rate_threshold")
    private Double minWinRateThreshold;

    @Schema(description = """
            <strong>Период "разогрева" для проверки Винрейта.</strong>
            <p>
            Количество раундов, в течение которых проверка `minWinRateThreshold` игнорируется.
            Позволяет стратегии набрать статистику, чтобы не остановиться после первых пары неудач.
            <br>
            <em>Пример:</em> minRoundsForWinRate = 100. Проверка на низкий винрейт начнется только со 101-го раунда.
            """,
            example = "100",
            minimum = "0")
    @JsonProperty("min_rounds_for_win_rate")
    private Long minRoundsForWinRate;

    // --- Поля из RiskConfig ---

    @Schema(description = """
            <strong>Порог Опасной Зоны (Danger Zone Threshold).</strong>
            <p>
            Коэффициент относительно <em>стартового</em> баланса.
            Если текущий баланс становится меньше или равен {@code startBalance * dangerZoneThreshold},
            активируется режим "Штрафной бокс" (Penalty Box) — стратегия принудительно пропускает ходы.
            <p>
            <em>Цель:</em> Остановить "тильт" (серию необдуманных ставок) и переждать плохую серию ГСЧ.
            <p>
            <strong>Примеры:</strong>
            <ul>
                <li>{@code 0.90} (Дефолт): Старт 1000$. Если баланс упадет до 900$ или ниже, ставки прекращаются на время {@code penaltyBoxDuration}.</li>
                <li>{@code 0.50} (Агрессивный): Позволяет проиграть половину банка (до 500$) перед паузой.</li>
                <li>{@code 0.95} (Консервативный): Пауза при малейшей просадке в 5% (ниже 950$).</li>
            </ul>
            """,
            example = "0.9",
            minimum = "0",
            maximum = "1")
    @JsonProperty("danger_zone_threshold")
    private Double dangerZoneThreshold;

    @Schema(description = """
            <strong>Порог Зоны Прибыли (Profit Zone Threshold).</strong>
            <p>
            Коэффициент относительно <em>стартового</em> баланса.
            Если текущий баланс превышает {@code startBalance * profitZoneThreshold},
            стратегия считается вышедшей в зону сверхприбыли.
            <p>
            <em>Эффект:</em> Снимается ограничение {@code normalZoneBetCap}. Стратегия может делать ставки любого размера
            (в пределах лимитов стола {@code tableLimit}). Это позволяет стратегиям с позитивной прогрессией (Paroli)
            разгонять депозит.
            <p>
            <strong>Примеры:</strong>
            <ul>
                <li>{@code 1.10} (Дефолт): Старт 1000$. При балансе > 1100$ ограничения снимаются.</li>
                <li>{@code 2.00}: Ограничения снимутся только после удвоения депозита (до 2000$).</li>
                <li>{@code 1.01}: Практически сразу разрешает агрессивную игру (как только вышли в +1%).</li>
            </ul>
            """,
            example = "1.1",
            minimum = "0")
    @JsonProperty("profit_zone_threshold")
    private Double profitZoneThreshold;

    @Schema(description = """
            <strong>Лимит ставки в Нормальной Зоне (Normal Zone Bet Cap).</strong>
            <p>
            Доля от <em>текущего</em> (не стартового!) баланса, которую разрешено поставить за один раунд,
            пока мы находимся между {@code Danger} и {@code Profit} зонами.
            <p>
            Если стратегия пытается поставить больше, {@code RiskManager} пропорционально уменьшит (масштабирует)
            все ставки так, чтобы их сумма укладывалась в лимит.
            <p>
            <strong>Примеры:</strong>
            <ul>
                <li>{@code 0.05} (Дефолт, 5%): Текущий баланс 1000$. Максимальная суммарная ставка = 50$.
                    <br>Если стратегия хочет поставить 100$, ставки будут уменьшены в 2 раза.</li>
                <li>{@code 0.01} (Сейф, 1%): Очень жесткий контроль. При 1000$ макс ставка 10$. Подходит для длинных дистанций.</li>
                <li>{@code 0.25} (Риск, 25%): Разрешает ставить четверть банка за раз. Высокий риск слива.</li>
            </ul>
            """,
            example = "0.05",
            minimum = "0",
            maximum = "1")
    @JsonProperty("normal_zone_bet_cap")
    private Double normalZoneBetCap;

    @Schema(description = """
            <strong>Длительность "Штрафного бокса" (Penalty Box Duration).</strong>
            <p>
            Количество раундов, которые стратегия будет пропускать (не делать ставок),
            если баланс упал в Опасную Зону (ниже {@code dangerZoneThreshold}).
            <p>
            По истечении этого времени стратегия снова попробует сделать ставку.
            Если баланс всё еще в опасной зоне, пауза активируется снова.
            <p>
            <strong>Примеры:</strong>
            <ul>
                <li>{@code 10} (Дефолт): Пропустить 10 спинов. Достаточно, чтобы сменился локальный тренд.</li>
                <li>{@code 1}: Почти не останавливается, просто пропускает 1 ход.</li>
                <li>{@code 100}: Долгая пауза, ожидание полной смены условий (или дилера).</li>
            </ul>
            """,
            example = "10",
            minimum = "0")
    @JsonProperty("penalty_box_duration")
    private Integer penaltyBoxDuration;

    // --- Dynamic Bet Limit Config (New Fields) ---
    /** Ограничение макс ставки (% от баланса) */
    private Double limitMaxBetBalancePercentage;

    /** Шаг просадки для защиты пика (например 0.1) */
    private Double limitPeakProtectDrawdownStep;

    /** Множитель снижения лимитов при просадке (например 0.5) */
    private Double limitPeakProtectReductionFactor;

    /** Порог винрейта для ограничения ставок */
    private Double limitMinWinRateThreshold;

    /** Кол-во раундов для активации проверки винрейта */
    private Long limitMinWinRateRounds;

    /** Процент от баланса для плавающей мин ставки */
    private Double limitFloatingMinBetPercent;
}