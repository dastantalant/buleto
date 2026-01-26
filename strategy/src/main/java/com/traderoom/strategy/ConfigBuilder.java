package com.traderoom.strategy;

import com.traderoom.strategy.enums.RouletteType;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.stop.StopConditionConfig;

import java.util.Deque;
import java.util.LinkedList;
import java.util.List;

public final class ConfigBuilder {
    private final Config.ConfigBuilder config;
    private final StopConditionConfig.StopConditionConfigBuilder stopConfig;
    private final Deque<Integer> initialHistory;

    private ConfigBuilder() {
        config = Config.builder();
        stopConfig = StopConditionConfig.builder();
        initialHistory = new LinkedList<>();
    }

    public static ConfigBuilder builder() {
        return new ConfigBuilder();
    }

    public ConfigBuilder name(String name) {
        config.name(name);
        return this;
    }

    public ConfigBuilder rouletteType(RouletteType type) {
        config.rouletteType(type);
        return this;
    }

    public ConfigBuilder european() {
        config.rouletteType(RouletteType.EUROPEAN);
        return this;
    }

    public ConfigBuilder american() {
        config.rouletteType(RouletteType.AMERICAN);
        return this;
    }

    public ConfigBuilder balance(Long balance) {
        if (balance <= 0) throw new IllegalArgumentException("balance <= 0");
        config.startBalance(balance);
        return this;
    }

    public ConfigBuilder limits(Long minBet, Long maxBet, Long tableLimit) {
        if (minBet <= 0) throw new IllegalArgumentException("minBet <= 0");
        if (maxBet < minBet) throw new IllegalArgumentException("maxBet < minBet");
        if (tableLimit < maxBet) throw new IllegalArgumentException("tableLimit < maxBet");

        config.minBet(minBet);
        config.maxBet(maxBet);
        config.tableLimit(tableLimit);
        return this;
    }
    public ConfigBuilder addLast(Integer history) {
        initialHistory.addLast(history);
        return this;
    }
    public ConfigBuilder addLast(Deque<Integer> history) {
        initialHistory.addAll(history);
        return this;
    }
    public ConfigBuilder stopLossPercentage(Integer stopLossPercentage) {
        stopConfig.stopLossPercentage(stopLossPercentage);
        return this;
    }

    public ConfigBuilder takeProfitPercentage(Integer takeProfitPercentage) {
        stopConfig.takeProfitPercentage(takeProfitPercentage);
        return this;
    }

    public ConfigBuilder trailingStopPercentage(Integer trailingStopPercentage) {
        stopConfig.trailingStopPercentage(trailingStopPercentage);
        return this;
    }

    public ConfigBuilder maxDrawdownPercentage(Integer maxDrawdownPercentage) {
        stopConfig.maxDrawdownPercentage(maxDrawdownPercentage);
        return this;
    }

    public ConfigBuilder maxWinStreak(Integer maxWinStreak) {
        stopConfig.maxWinStreak(maxWinStreak);
        return this;
    }

    public ConfigBuilder maxLossStreak(Integer maxLossStreak) {
        stopConfig.maxLossStreak(maxLossStreak);
        return this;
    }

    public ConfigBuilder maxRounds(Long maxRounds) {
        stopConfig.maxRounds(maxRounds);
        return this;
    }

    public ConfigBuilder maxBetBalancePercentage(Double maxBetBalancePercentage) {
        stopConfig.maxBetBalancePercentage(maxBetBalancePercentage);
        return this;
    }

    public ConfigBuilder stagnationWindow(Integer stagnationWindow) {
        stopConfig.stagnationWindow(stagnationWindow);
        return this;
    }

    public ConfigBuilder minWinRateThreshold(Double minWinRateThreshold) {
        stopConfig.minWinRateThreshold(minWinRateThreshold);
        return this;
    }

    public ConfigBuilder minRoundsForWinRate(Long minRoundsForWinRate) {
        stopConfig.minRoundsForWinRate(minRoundsForWinRate);
        return this;
    }

    public Config build() {
        StopConditionConfig stop = stopConfig.build();
        return config.stopConfig(stop)
                .build();
    }

    public static Config defaultConfig() {
        return ConfigBuilder.builder()
                .name("Default")
                .american()
                .balance(15_000L)
                .limits(1L, 15_000L, 15_000L)
                // (Ограничение убытка) в процентах от начального баланса. Если текущий баланс упадет ниже этого уровня
                // относительно старта, игра остановится
                .stopLossPercentage(50)
                // (Фиксация прибыли) в процентах от начального баланса. Если текущий баланс вырастет выше этого уровня
                // относительно старта, игра остановится
                .takeProfitPercentage(20)
                // (Скользящий стоп) в процентах от пикового баланса. Фиксирует прибыль.
                // Если баланс упадет на указанный
                // процент от максимально достигнутого за время игры значения, стратегия остановится
                .trailingStopPercentage(0)
                // Максимальная допустимая просадка (Max Drawdown) в процентах. Это условие останавливает стратегию,
                // если текущий баланс снизился относительно максимального значения (Peak Balance),
                // достигнутого за всё время игры, более чем на указанный процент
                .maxDrawdownPercentage(0)
                // Максимальная серия побед (Win Streak).
                // Остановка после указанного количества выигранных раундов подряд
                .maxWinStreak(0)
                // Максимальная серия поражений (Loss Streak).
                // Остановка после указанного количества проигранных раундов подряд
                .maxLossStreak(0)
                // Лимит количества раундов. Жесткое ограничение на длительность игровой сессии
                .maxRounds(0L)
                // Максимальный риск на ставку (в долях от баланса). Останавливает стратегию, если она пытается сделать
                // ставку, размер которой превышает указанную долю от текущего баланса. Защита от "слива" одной ставкой
                .maxBetBalancePercentage(0.0)
                // Окно стагнации (количество раундов). Остановка, если баланс не изменяется в течение указанного числа
                // раундов (например, стратегия перестала делать ставки из-за внутренних фильтров)
                .stagnationWindow(0)
                // Минимальный порог Винрейта (Win Rate). Значение от 0.0 до 1.0.
                // Если процент побед падает ниже этого уровня, игра останавливается
                .minWinRateThreshold(0.0)
                // Период "разогрева" для проверки Винрейта. Количество раундов, в течение которых проверка
                // minWinRateThreshold игнорируется. Позволяет стратегии набрать статистику,
                // чтобы не остановиться после первых пары неудач
                .minRoundsForWinRate(0L)
                .build();
    }
}
