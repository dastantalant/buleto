package com.buleto.analyzer.test.v13;


import com.trading.roulette.api.*;
import com.trading.roulette.api.annotation.Strategy;
import com.trading.roulette.api.model.*;
import com.trading.roulette.api.model.config.Config;
import com.trading.roulette.api.utils.BetHelper;
import java.util.List;

@Strategy(name = "CycleBreakerV10")
public class CycleBreakerStrategy extends AbstractStrategy {
    private final CycleBreakerPredictor predictor;
    private static final int WINDOW = 18; // Анализируем последние 18 спинов

    public CycleBreakerStrategy(Config config) {
        super(config);
        this.predictor = new CycleBreakerPredictor(WINDOW);
    }

    @Override
    public List<Bet> decide() {
        // Получаем 3 горячих числа
        List<SpotPrediction> predictions = predictor.predictSpot(getState(), getConfig());

        if (predictions.isEmpty()) return List.of();

        long betAmount = getMinBet();

        // Проверка: хватит ли денег на ставку
        // Если денег мало (меньше чем 3 * betAmount), ставим на сколько хватит (на 1-2 числа)
        long totalNeeded = predictions.size() * betAmount;
        if (getVirtualBalance() < totalNeeded) {
            if (getVirtualBalance() < betAmount) return List.of(); // Совсем нет денег
            // Берем только топ-1 или топ-2
            int canAfford = (int)(getVirtualBalance() / betAmount);
            predictions = predictions.subList(0, canAfford);
        }

        // Ставим Flat (фиксированная сумма)
        return predictions.stream()
                .map(p -> BetHelper.betting(p.spot(), betAmount))
                .toList();
    }
}
