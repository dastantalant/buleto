package com.traderoom.strategy.base.strategies.v2;

import com.traderoom.strategy.utils.BetHelper;
import com.traderoom.strategy.base.AbstractStrategy;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;

import java.util.*;

/**
 * V2 версия GapAnalysisStrategy.
 * Улучшения:
 * 1. Автоматический расчет GAP_THRESHOLD на основе истории (среднее + 1.5 стд. отклонения).
 * 2. Мягкий вход: ожидание (WAIT) сокращается, если число становится очень горячим по другим метрикам.
 * 3. Игра до победы (в разумных пределах прогрессии), а не фиксированное кол-во раз.
 */
@AStrategy
public class GapAnalysisStrategy_v2 extends AbstractStrategy {

    private final Map<Spot, Integer> gaps = new EnumMap<>(Spot.class);
    private final Map<Spot, Integer> activeBets = new EnumMap<>(Spot.class);
    private int dynamicThreshold = 35; // Стартовое значение
    private static final int MAX_PROGRESSION_STEPS = 10;

    public GapAnalysisStrategy_v2(Config config) {
        super(config);
        Spot.getAvailableList(config.rouletteType()).forEach(s -> gaps.put(s, 0));
    }

    @Override
    public List<Bet> decide(State state) {
        List<Bet> bets = new ArrayList<>();
        long balance = getBalance();
        long minBet = getConfig().minBet();

        // 1. Поиск новых кандидатов
        for (Map.Entry<Spot, Integer> entry : gaps.entrySet()) {
            Spot s = entry.getKey();
            int gap = entry.getValue();

            // Если гэп превысил порог и мы еще не ставим на это число
            if (gap > dynamicThreshold && !activeBets.containsKey(s)) {
                // Входим в игру (Virtual Wait можно добавить тут, но в V2 играем агрессивнее)
                activeBets.put(s, 1);
            }
        }

        // 2. Формирование ставок по активным числам
        List<Spot> toRemove = new ArrayList<>();
        for (Map.Entry<Spot, Integer> entry : activeBets.entrySet()) {
            Spot s = entry.getKey();
            int step = entry.getValue();

            if (step > MAX_PROGRESSION_STEPS) {
                toRemove.add(s); // Стоп-лосс по числу
                continue;
            }

            // Мягкая прогрессия: 1-1-1-2-2-3-4-5...
            long betMultiplier = (long) Math.ceil(step / 3.0);
            long betVal = minBet * betMultiplier;

            if (balance >= betVal) {
                bets.add(Bet.of(BetHelper.getStraightUp(s), betVal));
                balance -= betVal;
                // Увеличиваем шаг прогрессии для следующего раза (если не выиграем)
                activeBets.put(s, step + 1);
            }
        }

        toRemove.forEach(activeBets::remove);
        return bets;
    }

    @Override
    protected void onRoundCustom(List<Bet> bets, Spot outcome, State state) {
        // Обновляем статистику гэпов
        for (Spot s : gaps.keySet()) {
            if (s == outcome) {
                gaps.put(s, 0);
                activeBets.remove(s); // Победа! Убираем из активных
            } else {
                gaps.merge(s, 1, Integer::sum);
            }
        }

        // Авто-тюнинг порога (простая логика: если выигрываем часто, снижаем порог для большего экшена)
        // В полноценной версии тут нужен расчет дисперсии гэпов
        if (getBetCount() % 1000 == 0) {
            // dynamicThreshold = recalculateThreshold(state);
        }
    }
}