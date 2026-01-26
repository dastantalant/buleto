package com.traderoom.strategy.model.context;

import com.traderoom.core.csv.CsvColumn;
import com.traderoom.core.csv.CsvFile;
import com.traderoom.core.csv.CsvIgnore;
import com.traderoom.core.csv.Separator;
import com.traderoom.strategy.config.BetListConverter;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.Bet;

import lombok.Builder;

import java.util.List;

/**
 * Снимок состояния стратегии в конкретный момент времени (обычно после завершения раунда).
 * Используется для логирования, построения графиков и финального анализа эффективности.
 *
 * @param strategyName      Название стратегии (идентификатор).
 *                          <br>📝 <i>Пример:</i> "Martingale_Classic"
 * @param roundNumber       Текущий номер раунда (спина).
 *                          <br>🟢 <i>Хорошо:</i> Достигает {@code maxRounds} (стратегия выжила).
 *                          <br>🔴 <i>Плохо:</i> Малое число (быстрый слив депозита).
 * @param balance           Текущий баланс игрока.
 *                          <br>📝 <i>Пример:</i> 10500
 * @param startBalance      Стартовый баланс. Точка отсчета для ROI и Profit.
 *                          <br>📝 <i>Пример:</i> 10000
 * @param lastProfit        Прибыль или убыток за <b>последний</b> раунд (PnL).
 *                          <br>🟢 <i>Хорошо:</i> Положительное значение.
 *                          <br>🔴 <i>Плохо:</i> Огромное отрицательное значение (означает срыв ставки в прогрессии).
 * @param netProfit         Чистая прибыль за всю игру ({@code Balance - StartBalance}).
 *                          <br>🟢 <i>Хорошо:</i> > 0.
 *                          <br>🔴 <i>Плохо:</i> < 0 или равно {@code -StartBalance} (полное банкротство).
 * @param roundBetAmount    Сумма всех ставок, сделанных в <b>текущем</b> раунде.
 *                          <br>🟢 <i>Хорошо:</i> Фиксированный или плавно меняющийся % от банка.
 *                          <br>🔴 <i>Плохо:</i> Экспоненциальный рост (признак агрессивного Мартингейла).
 * @param roiPercentage     Return on Investment (Рентабельность) в процентах.
 *                          <br>📝 <i>Формула:</i> {@code (NetProfit / StartBalance) * 100}
 *                          <br>🟢 <i>Хорошо:</i> > 10-20% при низкой просадке.
 *                          <br>🔴 <i>Плохо:</i> < 0% (убыток).
 * @param winRatePercentage Процент выигранных раундов.
 *                          <br>📝 <i>Формула:</i> {@code (Won / Rounds) * 100}
 *                          <br>📊 <i>Анализ:</i> Зависит от типа ставок. Для ставок на равные шансы (Красное/Черное) норма ~47.3-48.6%.
 *                          <br>🔴 <i>Подозрительно:</i> > 80% (обычно означает глубокие пересиживания убытков).
 * @param currentDrawdown   Текущая просадка в процентах от исторического пика баланса.
 *                          <br>📝 <i>Пример:</i> Если был пик 11000, а сейчас 10000, то DD = 9.09%.
 *                          <br>🟢 <i>Хорошо:</i> 0% (мы на пике прибыли).
 * @param maxDrawdown       Максимальная зафиксированная просадка за всю историю симуляции. Главный показатель риска.
 *                          <br>🟢 <i>Хорошо:</i> < 15-20%. Стратегия безопасна.
 *                          <br>🔴 <i>Плохо:</i> > 50%. Стратегия крайне рискованна, возможен слив в любой момент.
 * @param profitFactor      Фактор профита. Отношение всех полученных выплат к сумме всех ставок.
 *                          <br>📝 <i>Формула:</i> {@code TotalPayout / TotalWagered}
 *                          <br>🟢 <i>Отлично:</i> > 1.0 (Стратегия математически прибыльна на этом отрезке).
 *                          <br>⚪ <i>Нейтрально:</i> ~1.0 (Игра в ноль).
 *                          <br>🔴 <i>Плохо:</i> < 0.95 (Матожидание казино съедает депозит).
 * @param lastSpot          Последнее выпавшее число.
 *                          <br>📝 <i>Использование:</i> Для проверки, почему ставка сыграла или нет.
 * @param totalWon          Общее количество выигранных раундов.
 * @param totalLost         Общее количество проигранных раундов.
 * @param totalWagered      Оборот средств. Сумма всех сделанных ставок за игру.
 *                          <br>📝 <i>Пример:</i> Можно иметь баланс 10000, но оборот 1,000,000 (казино любит такие стратегии).
 * @param totalPayout       Общая сумма всех выплат от казино (включая возврат тела ставки при выигрыше).
 * @param lastBets          Список ставок, сделанных в последнем раунде.
 *                          <br>📝 <i>Пример:</i> {@code [RED: 10, ZERO: 1]}
 * @param isStopped         Флаг остановки игры.
 *                          <br>📝 <i>Значение:</i> {@code true}, если сработал StopLoss, TakeProfit или закончились деньги.
 */
@Builder
@CsvFile(separator = Separator.SEMICOLON)
public record Snapshot(
        @CsvIgnore
        String strategyName,
        @CsvColumn(value = "ROUND", order = 1)
        long roundNumber,
        @CsvColumn(value = "BALANCE", order = 2)
        long balance,
        @CsvColumn(value = "START", order = 20)
        long startBalance,
        @CsvColumn(value = "LAST_PROF", order = 4)
        long lastProfit,
        @CsvColumn(value = "NET_PROF", order = 5)
        long netProfit,
        @CsvColumn(value = "ROUND_BET", order = 6)
        long roundBetAmount,
        @CsvColumn(value = "ROI%", order = 7)
        double roiPercentage,
        @CsvColumn(value = "WIN_RATE%", order = 8)
        double winRatePercentage,
        @CsvColumn(value = "CURRENT_DD", order = 9)
        double currentDrawdown,
        @CsvColumn(value = "MAX_DD", order = 10)
        double maxDrawdown,
        @CsvColumn(value = "PF", order = 11)
        double profitFactor,
        @CsvColumn(value = "LAST_SPOT", order = 12)
        Spot lastSpot,
        @CsvColumn(value = "WON", order = 13)
        long totalWon,
        @CsvColumn(value = "LOST", order = 14)
        long totalLost,
        @CsvColumn(value = "WAGERED", order = 15)
        long totalWagered,
        @CsvColumn(value = "PAYOUT", order = 16)
        long totalPayout,
        @CsvColumn(value = "BETS", order = 18, converter = BetListConverter.class)
        List<Bet> lastBets,
//        @CsvColumn(value = "STATUS", order = 17, converter = StopedConverter.class)
        @CsvIgnore
        boolean isStopped
) {
    /**
     * calculate field roiPercentage
     */
    public double getRoi() {
        return startBalance == 0 ? 0 : ((double) netProfit / startBalance) * 100;
    }

    /**
     * calculate field netProfit
     */
    public long getNetProfit() {
        return balance - startBalance;
    }

    /**
     * calculate field roiPercentage
     */
    public double getRoiPercentage() {
        if (startBalance == 0) return 0.0;
        return ((double) getNetProfit() / startBalance) * 100.0;
    }

    /**
     * calculate field winRatePercentage
     */
    public double getWinRatePercentage() {
        if (roundNumber == 0) return 0.0;
        return ((double) totalWon / roundNumber) * 100.0;
    }
}