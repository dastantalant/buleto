package com.traderoom.analyzer.test.v14;

import com.traderoom.api.*;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.model.*;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.utils.BetHelper;
import java.util.List;

@Strategy(name = "ConsensusV1")
public class ConsensusStrategy extends AbstractStrategy {
    private final ConsensusPredictor predictor;
    private final int betCount = 5; // Ставим на 5 чисел

    public ConsensusStrategy(Config config) {
        super(config);
        this.predictor = new ConsensusPredictor();
    }

    @Override
    public List<Bet> decide() {
        List<SpotPrediction> predictions = predictor.predictSpot(getState(), getConfig());

        // Если у нас нет четкого лидера (например, история слишком короткая), не ставим
        if (predictions.size() < betCount) return List.of();

        // Проверка силы сигнала:
        // Если Score первого места слишком низкий (например, < 3.0), значит на рынке хаос.
        // Мы хотим входить только в структурированный рынок.
        // (В данной реализации SpotPrediction probability хранит наш Score)
        if (predictions.get(0).probability() < 2.5) {
            return List.of();
        }

        long amount = getMinBet();

        // Safety: Если денег не хватает на 5 чисел, не ставим вообще
        if (getVirtualBalance() < amount * betCount) {
            return List.of();
        }

        return predictions.stream()
                .map(p -> BetHelper.betting(p.spot(), amount))
                .toList();
    }
}