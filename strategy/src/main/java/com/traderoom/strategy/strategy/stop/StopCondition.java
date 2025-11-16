package com.traderoom.strategy.strategy.stop;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.strategy.BaseStrategy;

/**
 * Интерфейс для определения условий остановки стратегии.
 */
@FunctionalInterface
public interface StopCondition {

    /**
     * Проверяет, должно ли выполнение стратегии быть остановлено.
     *
     * @param strategy Текущий экземпляр стратегии со всеми ее параметрами (баланс, история и т.д.).
     * @param context  Контекст приложения, содержащий дополнительную информацию.
     * @return {@code true}, если стратегия должна быть остановлена, иначе {@code false}.
     */
    boolean shouldStop(BaseStrategy strategy, Context context);
}