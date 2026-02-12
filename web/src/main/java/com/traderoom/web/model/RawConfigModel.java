package com.traderoom.web.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.traderoom.api.enums.RouletteType;
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
        Включает в себя базовые параметры, условия остановки, правила управления рисками и динамические лимиты ставок.
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
    private Long startBalance;

    @Schema(description = "Реальный баланс",
            example = "1000",
            requiredMode = Schema.RequiredMode.REQUIRED)
    private Long realBalance;

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
    private Long tableLimit;

    // --- Поля из StopConditionConfig ---

    @Schema(description = """
            <strong>Stop Loss (Ограничение убытка) в процентах от начального баланса.</strong>
            <p>
            Если текущий баланс упадет ниже этого уровня относительно старта, игра остановится.
            <br>
            <em>Пример:</em> Стартовый баланс 1000, stopLossPercentageStop = 20.
            Условие сработает, если баланс станет <= 800 (1000 - 20%).
            """, example = "20",
            minimum = "0",
            maximum = "100")
    @JsonProperty("stop_loss_percentage_stop")
    private Integer stopLossPercentageStop;

    @Schema(description = """
            <strong>Take Profit (Фиксация прибыли) в процентах от начального баланса.</strong>
            <p>
            Если текущий баланс вырастет выше этого уровня относительно старта, игра остановится.
            <br>
            <em>Пример:</em> Стартовый баланс 1000, takeProfitPercentageStop = 50.
            Условие сработает, если баланс станет >= 1500 (1000 + 50%).
            """,
            example = "50",
            minimum = "0")
    @JsonProperty("take_profit_percentage_stop")
    private Integer takeProfitPercentageStop;

    @Schema(description = """
            <strong>Trailing Stop (Скользящий стоп) в процентах от пикового баланса.</strong>
            <p>
            Фиксирует прибыль. Если баланс упадет на указанный процент от <strong>максимально достигнутого</strong>
            за время игры значения, стратегия остановится.
            <br>
            <em>Пример:</em> Баланс поднялся до 2000 (пик). trailingStopPercentageStop = 10.
            Условие сработает, если баланс откатится до 1800 (2000 - 10%).
            """,
            example = "10",
            minimum = "0")
    @JsonProperty("trailing_stop_percentage_stop")
    private Integer trailingStopPercentageStop;

    @Schema(description = """
            <strong>Максимальная допустимая просадка (Max Drawdown) в процентах.</strong>
            <p>
            Это условие останавливает стратегию, если текущий баланс снизился относительно
            <strong>максимального значения (Peak Balance)</strong>, достигнутого за всё время игры,
            более чем на указанный процент.
            <p>
            Это механизм защиты накопленной прибыли. В отличие от {@code stopLossPercentageStop} (который считает от стартового баланса),
            этот параметр динамически отслеживает вашу "вершину".
            <p>
            <strong>Формула срабатывания:</strong>
            <br>
            {@code (Пиковый_Баланс - Текущий_Баланс) >= (Пиковый_Баланс * Процент / 100)}
            <p>
            <em>Пример:</em>
            <ul>
                <li>Старт: 1000$. {@code maxDrawdownPercentageStop} = 25%.</li>
                <li>Вы играете и выигрываете, баланс растет: 1200... 1500... <strong>2000$</strong>.</li>
                <li>2000$ — это ваш текущий Пик (Peak Balance).</li>
                <li>Допустимая просадка: 25% от 2000$ = 500$.</li>
                <li>Порог остановки: 2000$ - 500$ = <strong>1500$</strong>.</li>
                <li>Если начнется серия неудач и баланс упадет до 1500$ или ниже, стратегия остановится.</li>
            </ul>
            """,
            example = "25",
            minimum = "0")
    @JsonProperty("max_drawdown_percentage_stop")
    private Integer maxDrawdownPercentageStop;

    @Schema(description = """
            <strong>Максимальная серия побед (Win Streak).</strong>
            <p>
            Остановка после указанного количества выигранных раундов подряд.
            Полезно для стратегий "Hit and Run" (забрал и ушел).
            <br>
            <em>Пример:</em> maxWinStreakStop = 5. Победа -> Победа -> Победа -> Победа -> Победа -> СТОП.
            """,
            example = "5",
            minimum = "0")
    @JsonProperty("max_win_streak_stop")
    private Integer maxWinStreakStop;

    @Schema(description = """
            <strong>Максимальная серия поражений (Loss Streak).</strong>
            <p>
            Остановка после указанного количества проигранных раундов подряд.
            Предохранитель для мартингейл-подобных стратегий.
            <br>
            <em>Пример:</em> maxLossStreakStop = 6. Шесть поражений подряд вызовут остановку.
            """,
            example = "6",
            minimum = "0")
    @JsonProperty("max_loss_streak_stop")
    private Integer maxLossStreakStop;

    @Schema(description = """
            <strong>Лимит количества раундов.</strong>
            <p>
            Жесткое ограничение на длительность игровой сессии.
            <br>
            <em>Пример:</em> maxRoundsStop = 1000. После 1000-го спина игра завершится независимо от результата.
            """,
            example = "1000",
            minimum = "1")
    @JsonProperty("max_rounds_stop")
    private Long maxRoundsStop;

    @Schema(description = """
            <strong>Окно стагнации (количество раундов).</strong>
            <p>
            Остановка, если баланс не изменяется в течение указанного числа раундов
            (например, стратегия перестала делать ставки из-за внутренних фильтров).
            <br>
            <em>Пример:</em> stagnationWindowStop = 50. Если 50 раундов подряд баланс один и тот же -> СТОП.
            """,
            example = "50",
            minimum = "0")
    @JsonProperty("stagnation_windows_stop")
    private Integer stagnationWindowStop;

    @Schema(description = """
            <strong>Минимальный порог Винрейта (Win Rate).</strong>
            <p>
            Значение от 0 до 100. Если процент побед падает ниже этого уровня, игра останавливается.
            <br>
            <em>Пример:</em> minWinRateThresholdLimit = 45 (45%).
            """,
            example = "45",
            minimum = "0",
            maximum = "100")
    @JsonProperty("min_win_rate_threshold_stop")
    private Integer minWinRateThresholdStop;

    @Schema(description = """
            <strong>Период "разогрева" для проверки Винрейта.</strong>
            <p>
            Количество раундов, в течение которых проверка `minWinRateThresholdLimit` игнорируется.
            Позволяет стратегии набрать статистику, чтобы не остановиться после первых пары неудач.
            <br>
            <em>Пример:</em> minRoundsForWinRateStop = 100. Проверка на низкий винрейт начнется только со 101-го раунда.
            """,
            example = "100",
            minimum = "0")
    @JsonProperty("min_rounds_for_win_rate_stop")
    private Long minRoundsForWinRateStop;
    @Schema(description = """
                     <strong>Период SMA для проверки кривой эквити (Equity Curve Stop).</strong>
                     <p>
                     Если задано значение > 0, включается механизм остановки по ухудшению скользящей средней кривой баланса.
                     Стратегия останавливается, если <strong>текущий баланс</strong> падает ниже 95% от
                     <strong>простой скользящей средней (SMA)</strong> баланса за последние N раундов.
                     <p>
                     Это помогает ловить ситуации, когда стратегия начинает устойчиво деградировать,
                     даже если абсолютная просадка ещё не достигла уровня maxDrawdown или trailing stop.
                     <br>
                     Очень полезно для фильтрации «медленных сливов» и затяжных боковиков с отрицательным матожиданием.
                     <p>
                     <strong>Логика срабатывания:</strong>
                     <br>
                     1. Собираем историю баланса за последние {@code equityCurveSmaPeriodStop} раундов
                     2. Считаем SMA (простую среднюю) этих значений
                     3. Если текущий баланс < SMA × 0.95 → стоп
                     <p>
                     <em>Пример:</em>
                     <ul>
                         <li>{@code equityCurveSmaPeriodStop = 50}</li>
                         <li>Последние 50 раундов баланс колебался в диапазоне 1800–2200</li>
                         <li>SMA за 50 периодов ≈ 1980</li>
                         <li>95% от SMA = 1980 × 0.95 ≈ 1881</li>
                         <li>Если текущий баланс упадёт ниже ~1881 — стратегия остановится</li>
                     </ul>
                     <p>
                     <strong>Значения:</strong>
                     <ul>
                         <li>{@code null} или ≤ 0 — условие отключено</li>
                         <li>обычно используют 20–200 в зависимости от стиля стратегии</li>
                         <li>слишком маленькое значение (5–10) → много ложных срабатываний</li>
                         <li>слишком большое (500+) → реакция слишком запаздывает</li>
                     </ul>
            """,
            example = "100",
            minimum = "0")
    @JsonProperty("equity_curve_sma_period_stop")
    private Integer equityCurveSmaPeriodStop;

    // --- Поля из RiskConfig ---

    @Schema(description = """
            <strong>Порог Опасной Зоны (Danger Zone Threshold).</strong>
            <p>
            Коэффициент относительно <em>стартового</em> баланса.
            Если текущий баланс становится меньше или равен {@code startBalance * dangerZoneThresholdRisk},
            активируется режим "Штрафной бокс" (Penalty Box) — стратегия принудительно пропускает ходы.
            <p>
            <em>Цель:</em> Остановить "тильт" (серию необдуманных ставок) и переждать плохую серию ГСЧ.
            <p>
            <strong>Примеры:</strong>
            <ul>
                <li>{@code 90} (Дефолт): Старт 1000$. Если баланс упадет до 900$ или ниже, ставки прекращаются на время {@code penaltyBoxDurationRisk}.</li>
                <li>{@code 50} (Агрессивный): Позволяет проиграть половину банка (до 500$) перед паузой.</li>
                <li>{@code 95} (Консервативный): Пауза при малейшей просадке в 5% (ниже 950$).</li>
            </ul>
            """,
            example = "90",
            minimum = "0",
            maximum = "100")
    @JsonProperty("danger_zone_threshold_risk")
    private Integer dangerZoneThresholdRisk;

    @Schema(description = """
            <strong>Порог Зоны Прибыли (Profit Zone Threshold).</strong>
            <p>
            Коэффициент относительно <em>стартового</em> баланса.
            Если текущий баланс превышает {@code startBalance * profitZoneThresholdRisk},
            стратегия считается вышедшей в зону сверхприбыли.
            <p>
            <em>Эффект:</em> Снимается ограничение {@code normalZoneBetCapRisk}. Стратегия может делать ставки любого размера
            (в пределах лимитов стола {@code tableLimit}). Это позволяет стратегиям с позитивной прогрессией (Paroli)
            разгонять депозит.
            <p>
            <strong>Примеры:</strong>
            <ul>
                <li>{@code 110} (Дефолт): Старт 1000$. При балансе > 1100$ ограничения снимаются.</li>
                <li>{@code 200}: Ограничения снимутся только после удвоения депозита (до 2000$).</li>
                <li>{@code 101}: Практически сразу разрешает агрессивную игру (как только вышли в +1%).</li>
            </ul>
            """,
            example = "110",
            minimum = "0")
    @JsonProperty("profit_zone_threshold_risk")
    private Integer profitZoneThresholdRisk;

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
                <li>{@code 5} (Дефолт, 5%): Текущий баланс 1000$. Максимальная суммарная ставка = 50$.
                    <br>Если стратегия хочет поставить 100$, ставки будут уменьшены в 2 раза.</li>
                <li>{@code 1} (Сейф, 1%): Очень жесткий контроль. При 1000$ макс ставка 10$. Подходит для длинных дистанций.</li>
                <li>{@code 25} (Риск, 25%): Разрешает ставить четверть банка за раз. Высокий риск слива.</li>
            </ul>
            """,
            example = "5",
            minimum = "0",
            maximum = "100")
    @JsonProperty("normal_zone_bet_cap_risk")
    private Integer normalZoneBetCapRisk;

    @Schema(description = """
            <strong>Длительность "Штрафного бокса" (Penalty Box Duration).</strong>
            <p>
            Количество раундов, которые стратегия будет пропускать (не делать ставок),
            если баланс упал в Опасную Зону (ниже {@code dangerZoneThresholdRisk}).
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
    @JsonProperty("penalty_box_duration_risk")
    private Integer penaltyBoxDurationRisk;

    @Schema(description = """
            <strong>Динамический MaxBet (% от баланса).</strong>
            <p>
            Правило, которое "на лету" меняет верхний лимит стола (MaxBet) в зависимости от текущего размера банка.
            Это позволяет автоматически снижать риски при просадке и повышать их при росте (компаундинг).
            <p>
            <em>Пример:</em> {@code 5} (5%). При балансе 1000$ макс ставка будет 50$. При росте до 2000$ -> 100$.
            """,
            example = "5",
            minimum = "0",
            maximum = "100")
    @JsonProperty("limit_max_bet_balance_percentage_limit")
    private Integer maxBetBalancePercentageLimit;

    @Schema(description = """
            <strong>Шаг просадки для защиты пика (Peak Protection Step).</strong>
            <p>
            Определяет, как часто нужно урезать лимиты при откате от максимума (Peak Balance).
            <p>
            <em>Пример:</em> {@code 10} (10%).
            <br>
            Если мы упали на 10% от пика -> срабатывает 1-й уровень защиты.
            <br>
            Если упали еще на 10% (всего 20%) -> срабатывает 2-й уровень.
            """,
            example = "10",
            minimum = "0",
            maximum = "100")
    @JsonProperty("limit_peak_protect_drawdown_step_limit")
    private Integer peakProtectDrawdownStepLimit;

    @Schema(description = """
            <strong>Множитель снижения лимитов (Peak Protection Reduction).</strong>
            <p>
            Во сколько раз уменьшать {@code MaxBet} при срабатывании каждого шага просадки (см. {@code limit_peak_protect_drawdown_step}).
            <p>
            <em>Пример:</em> {@code 50} (50%).
            <br>
            Шаг 1 (просадка 10%): Макс ставка режется в 2 раза.
            <br>
            Шаг 2 (просадка 20%): Макс ставка режется еще в 2 раза (итого в 4 раза от номинала).
            """,
            example = "50",
            minimum = "0",
            maximum = "100")
    @JsonProperty("limit_peak_protect_reduction_factor_limit")
    private Integer peakProtectReductionFactorLimit;

    @Schema(description = """
            <strong>Порог Винрейта для ограничения лимитов.</strong>
            <p>
            Если процент побед падает ниже этого значения, система переключается в "режим выживания":
            {@code MaxBet} принудительно устанавливается равным {@code MinBet}. Это не дает стратегии использовать прогрессии (Мартингейл) при плохой удаче.
            <p>
            <em>Пример:</em> {@code 30} (30%). Если винрейт < 30%, играем только минимальной ставкой (флэт).
            """,
            example = "30",
            minimum = "0",
            maximum = "100")
    @JsonProperty("limit_min_win_rate_threshold_limit")
    private Integer minWinRateThresholdLimit;

    @Schema(description = """
            <strong>Минимум раундов для проверки Винрейта (для лимитов).</strong>
            <p>
            Задержка перед включением правила {@code limit_min_win_rate_threshold}.
            Нужно, чтобы накопить репрезентативную статистику.
            """,
            example = "50",
            minimum = "0")
    @JsonProperty("limit_min_win_rate_rounds_limit")
    private Long minWinRateRoundsLimit;

    @Schema(description = """
            <strong>Плавающая Минимальная Ставка (% от баланса).</strong>
            <p>
            Позволяет автоматически поднимать нижний лимит (MinBet) при росте банка.
            Это нужно для очень долгих симуляций, чтобы "копеечные" ставки не становились бессмысленными при огромном балансе.
            <p>
            <em>Пример:</em> {@code 1} (0.1%).
            <br>
            Баланс 10,000$ -> MinBet = 10$.
            <br>
            Баланс 1,000,000$ -> MinBet = 1000$.
            """,
            example = "1",
            minimum = "0",
            maximum = "1000")
    @JsonProperty("limit_floating_min_bet_percent_limit")
    private Integer floatingMinBetPercentLimit;
}