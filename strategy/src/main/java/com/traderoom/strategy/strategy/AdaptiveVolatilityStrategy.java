package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;

import java.util.Collections;
import java.util.List;
import java.util.LongSummaryStatistics;

/**
 * Адаптивная стратегия, которая меняет свое поведение в зависимости от волатильности игры.
 * 1. Низкая волатильность -> Консервативные ставки.
 * 2. Фаза роста (выигрыши) -> Агрессивные ставки (положительная прогрессия).
 * 3. Фаза просадки (проигрыши) -> Защитные ставки (минимально возможные).
 */
public class AdaptiveVolatilityStrategy extends BaseStrategy {
    /** Тип ставки по умолчанию (можно сделать более сложный выбор). */
    private static final BetType DEFAULT_BET_TYPE = BetType.RED;

    /** Количество последних спинов для анализа волатильности баланса. */
    private static final int HISTORY_WINDOW_SIZE = 20;

    /**
     * Порог для определения "спокойной" фазы. Если размах колебаний баланса
     * (max - min) в пределах этого процента от стартового капитала, игра считается стабильной.
     */
    private static final double LOW_VOLATILITY_THRESHOLD_PERCENT = 0.10;

    /** Множитель для агрессивного режима (Обратный Мартингейл). */
    private static final double REVERSE_MARTINGALE_MULTIPLIER = 2.0;

    public AdaptiveVolatilityStrategy(Context context) {
        super(context);
    }

    @Override
    public String getName() {
        return AdaptiveVolatilityStrategy.class.getSimpleName();
    }

    @Override
    protected List<Bet> getNextInternal(Context context) {
        if (historyBalance.size() < HISTORY_WINDOW_SIZE) {
            return createBet(context.getMin(), context);
        }

        LongSummaryStatistics stats = historyBalance.stream()
                .mapToLong(Long::longValue)
                .summaryStatistics();

        long balanceRange = stats.getMax() - stats.getMin();
        double lowVolatilityThreshold = startBalance * LOW_VOLATILITY_THRESHOLD_PERCENT;

        if (balanceRange < lowVolatilityThreshold) {
            return createBet(context.getMin(), context);
        }

        if (wasLastBetWon(context) && curBalance > stats.getAverage()) {
            long nextBetValue = (long) (getLastTotalBetValue() * REVERSE_MARTINGALE_MULTIPLIER);
            return createBet(nextBetValue, context);
        }

        return createBet(context.getMin(), context);
    }

    private List<Bet> createBet(long desiredValue, Context context) {
        long value = Math.max(context.getMin(), desiredValue);
        value = Math.min(value, context.getMax());
        value = Math.min(value, curBalance);
        if (value < context.getMin()) {
            return Collections.emptyList();
        }
        return Collections.singletonList(Bet.builder().type(DEFAULT_BET_TYPE).value(value).build());
    }
}