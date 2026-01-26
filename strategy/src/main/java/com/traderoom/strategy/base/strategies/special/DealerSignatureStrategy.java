package com.traderoom.strategy.base.strategies.special;

import com.traderoom.strategy.base.AbstractStrategy;
import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.predictor.SectorMomentumPredictor;
import com.traderoom.strategy.utils.BetHelper;

import java.util.List;

/**
 * Стратегия "Почерк Дилера" (Dealer Signature).
 * <p>
 * Использует {@link SectorMomentumPredictor} для определения ритмичности колеса.
 * Делает ставки только если выявлен сильный паттерн смещения (доминирующий импульс).
 * Ставит на сектор (обычно 5 чисел), куда вероятнее всего прилетит шарик.
 */
@AStrategy
public class DealerSignatureStrategy extends AbstractStrategy {

    private final SectorMomentumPredictor predictor;
    private final double confidenceThreshold;

    public DealerSignatureStrategy(Config config) {
        super(config);
        this.predictor = new SectorMomentumPredictor();
        this.confidenceThreshold = 0.18; // Ставим, только если вероятность центра сектора высока
    }

    @Override
    public List<Bet> decide(State state) {
        // Нужно минимум 10 спинов для калибровки
        if (state.getMarketData().getHistory().size() < 10) {
            return List.of();
        }

        List<SpotPrediction> predictions = predictor.getNextSpot(state, getConfig());

        if (predictions.isEmpty()) return List.of();

        // Проверяем "качество" сигнала. Если вероятности размазаны ровно - не ставим.
        // Ищем явный пик.
        double maxProb = predictions.stream()
                .mapToDouble(SpotPrediction::probability)
                .max()
                .orElse(0.0);

        if (maxProb < confidenceThreshold) {
            return List.of();
        }

        long baseBet = getConfig().minBet();

        // Ставим на весь предсказанный сектор
        return predictions.stream()
                .map(p -> Bet.of(BetHelper.getStraightUp(p.spot()), baseBet))
                .toList();
    }
}