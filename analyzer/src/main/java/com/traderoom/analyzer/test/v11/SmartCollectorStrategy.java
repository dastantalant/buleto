package com.traderoom.analyzer.test.v11;


import com.traderoom.api.*;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.model.*;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.utils.BetHelper;
import java.util.List;

@Strategy(name = "SmartCollector")
public class SmartCollectorStrategy extends AbstractStrategy {
    private final SmartCollectorPredictor predictor;

    // Внутренний счетчик прибыли сессии для мгновенного выхода
    private long sessionStartBalance;
    private boolean initialized = false;

    public SmartCollectorStrategy(Config config) {
        super(config);
        // Окно 24 спина оптимально для "Law of the Thirds"
        this.predictor = new SmartCollectorPredictor(24);
    }

    @Override
    public List<Bet> decide() {
        if (!initialized) {
            sessionStartBalance = getVirtualBalance();
            initialized = true;
        }

        // === ГЛАВНОЕ ПРАВИЛО: HIT AND RUN ===
        // Если мы в плюсе хотя бы на 1 фишку от начала сессии -> СТОП.
        // Мы не жадничаем. Мы фиксируем прибыль и перезапускаем раннер.
        if (getVirtualBalance() > sessionStartBalance + getMinBet()) {
            // Возвращаем пустой список и ждем срабатывания TakeProfit в конфиге
            // или можно форсировать остановку, но лучше через конфиг (takeProfitPercentageStop)
            // Для надежности просто не делаем ставок, пока раннер не перезапустится
            return List.of();
        }

        // Получаем прогноз
        List<SpotPrediction> predictions = predictor.predictSpot(getState(), getConfig());

        // Если не на что ставить или слишком рискованно -> пропускаем
        if (predictions.isEmpty()) {
            return List.of();
        }

        long betAmount = getMinBet(); // Всегда минимальная ставка (Flat)

        // Защита от просадки: если денег мало, не ставим на все
        if (getVirtualBalance() < predictions.size() * betAmount) {
            return List.of();
        }

        return predictions.stream()
                .map(p -> BetHelper.betting(p.spot(), betAmount))
                .toList();
    }
}
