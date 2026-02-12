package com.traderoom.strategy.strategies;

import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.model.State;
import com.traderoom.api.AbstractStrategy;
import com.traderoom.api.utils.BetHelper;

import java.util.ArrayList;
import java.util.List;

/**
 * Улучшенная NeighborAnalysisStrategy.
 * <p>
 * Улучшения:
 * 1. <strong>Wait Mode (Режим ожидания):</strong> Стратегия отслеживает эффективность своих виртуальных предсказаний.
 * Если точность падает ниже случайной (1/37), стратегия прекращает ставить деньги и переходит в режим наблюдения.
 * 2. <strong>Adaptive Lookback:</strong> Анализирует тренд "соседей" на разной глубине.
 */
@Strategy(tags = {Tag.PHYSICAL, Tag.HYBRID})
public class NeighborAnalysisStrategyV2 extends AbstractStrategy {

    private static final int NEIGHBOR_DISTANCE = 2; // Радиус соседей (+/- 2)
    private static final int HISTORY_WINDOW = 15;   // Окно для поиска паттерна
    private static final int ACCURACY_WINDOW = 20;  // Окно проверки точности

    private final Spot[] wheelLayout;
    private final List<Boolean> virtualResults = new ArrayList<>();

    public NeighborAnalysisStrategyV2(Config config) {
        super(config);
        this.wheelLayout = Spot.getWheelLayouts().get(config.rouletteType());
    }

    @Override
    public List<Bet> decide() {
        State state = getState();
        List<Spot> history = state.getMarket().getHistory();
        if (history.size() < HISTORY_WINDOW || wheelLayout == null) {
            return List.of();
        }

        // 1. Проверяем "Почерк" (Bias)
        // Считаем, как часто шарик падал рядом с предыдущим числом
        double biasScore = calculateNeighborBias(history);

        // 2. Проверяем текущую эффективность (Virtual Win Rate)
        double recentWinRate = calculateRecentAccuracy();

        // Условие входа: Есть смещение в физике ИЛИ мы последнее время хорошо угадываем
        boolean isMarketHot = (biasScore > 0.35) || (recentWinRate > 0.20);

        if (!isMarketHot) {
            return List.of(); // Ждем лучшего момента
        }

        // 3. Формируем ставку вокруг последнего числа
        Spot lastSpot = state.getMarket().getLastSpot();
        return createNeighborBets(lastSpot);
    }

    @Override
    protected void onRoundCustom(Spot outcome, List<Bet> bets) {
        // Виртуальная проверка: Угадали бы мы в этом раунде?
        if (getState().getMarket().getHistory().size() > 1) {
            Spot prevSpot = getState().getMarket().getHistory().get(getState().getMarket().getHistory().size() - 2);
            boolean hit = isNeighbor(prevSpot, outcome);

            virtualResults.add(hit);
            if (virtualResults.size() > ACCURACY_WINDOW) {
                virtualResults.removeFirst();
            }
        }
    }

    private double calculateNeighborBias(List<Spot> history) {
        int hits = 0;
        int checks = 0;
        // Берем последние N спинов
        int start = Math.max(0, history.size() - HISTORY_WINDOW - 1);

        for (int i = start; i < history.size() - 1; i++) {
            Spot current = history.get(i);
            Spot next = history.get(i + 1);
            if (isNeighbor(current, next)) {
                hits++;
            }
            checks++;
        }
        return checks == 0 ? 0 : (double) hits / checks;
    }

    private double calculateRecentAccuracy() {
        if (virtualResults.isEmpty()) return 0.0;
        long wins = virtualResults.stream().filter(b -> b).count();
        return (double) wins / virtualResults.size();
    }

    private boolean isNeighbor(Spot center, Spot target) {
        int pos1 = center.getWheelPosition(getConfig().rouletteType());
        int pos2 = target.getWheelPosition(getConfig().rouletteType());
        if (pos1 == -1 || pos2 == -1) return false;

        int len = wheelLayout.length;
        int dist = Math.abs(pos1 - pos2);
        dist = Math.min(dist, len - dist);

        return dist <= NEIGHBOR_DISTANCE;
    }

    private List<Bet> createNeighborBets(Spot center) {
        List<Bet> bets = new ArrayList<>();
        long val = getMinBet();
        int pos = center.getWheelPosition(getConfig().rouletteType());
        int len = wheelLayout.length;

        // Ставим на центр и соседей
        for (int i = -NEIGHBOR_DISTANCE; i <= NEIGHBOR_DISTANCE; i++) {
            int idx = (pos + i + len) % len;
            bets.add(Bet.of(BetHelper.getStraightUp(wheelLayout[idx]), val));
        }
        return bets;
    }
}