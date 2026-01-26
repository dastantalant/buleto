package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.base.AbstractStrategy;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.utils.BetHelper;

import java.util.*;

/**
 * НОВАЯ СТРАТЕГИЯ: Z-Score Mean Reversion (Статистический Арбитраж).
 * <p>
 * Принцип:
 * Вычисляет Z-Score (стандартное отклонение от среднего) для частоты выпадения каждого числа.
 * Если число выпадает слишком редко (Z < -2.0), статистически ожидается его возврат к среднему.
 * <p>
 * Отличие от "Холодных чисел": Использует математически обоснованный порог (сигма),
 * зависящий от размера выборки, а не просто "топ-5 редких".
 */
@AStrategy
public class ZScoreReversionStrategy extends AbstractStrategy {

    private final int sampleSize = 200; // Скользящее окно анализа
    private final double zThreshold = -2.0; // Порог входа (2 сигмы отклонения вниз)

    public ZScoreReversionStrategy(Config config) {
        super(config);
    }

    @Override
    public List<Bet> decide(State state) {
        List<Spot> history = state.getMarketData().getHistory();
        int n = Math.min(history.size(), sampleSize);
        if (n < 50) return List.of(); // Нужен разгон

        List<Spot> window = history.subList(history.size() - n, history.size());

        // 1. Считаем фактические частоты
        Map<Spot, Long> counts = new HashMap<>();
        window.forEach(s -> counts.merge(s, 1L, Long::sum));

        // 2. Теоретическое ожидание
        double p = 1.0 / 37.0; // Для Европейской
        if (getConfig().rouletteType() == com.traderoom.strategy.enums.RouletteType.AMERICAN) {
            p = 1.0 / 38.0;
        }
        double expectedMean = n * p;
        double stdDev = Math.sqrt(n * p * (1 - p));

        List<Bet> bets = new ArrayList<>();
        long betValue = getConfig().minBet();

        // 3. Расчет Z-Score для каждого числа
        for (Spot spot : Spot.getAvailableList(getConfig().rouletteType())) {
            long count = counts.getOrDefault(spot, 0L);
            double zScore = (count - expectedMean) / stdDev;

            // Если отклонение ниже -2 сигм (очень сильная недооценка)
            if (zScore < zThreshold) {
                // Дополнительный фильтр: не ставим, если оно только что выпадало (ждем гэпа)
                // Но в простейшей версии ставим сразу
                bets.add(Bet.of(BetHelper.getStraightUp(spot), betValue));
            }
        }

        // Лимит ставок (не более 5 чисел одновременно, чтобы не размывать банк)
        if (bets.size() > 5) {
            // Если кандидатов слишком много, значит рынок аномальный, лучше пропустить
            return List.of();
        }

        return bets;
    }
}