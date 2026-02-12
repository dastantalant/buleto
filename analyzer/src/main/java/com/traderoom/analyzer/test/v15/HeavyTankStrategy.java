package com.traderoom.analyzer.test.v15;


import com.traderoom.api.*;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.enums.BetType;
import com.traderoom.api.enums.Color;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.*;
import com.traderoom.api.model.config.Config;
import java.util.List;

@Strategy(name = "HeavyTank")
public class HeavyTankStrategy extends AbstractStrategy {
    private final TrendFollowerPredictor predictor = new TrendFollowerPredictor();

    // Текущий размер ставки
    private long currentBet;
    private final long unit;

    public HeavyTankStrategy(Config config) {
        super(config);
        this.unit = config.minBet(); // Шаг изменения = Минимальная ставка
        this.currentBet = this.unit;
    }

    @Override
    public List<Bet> decide() {
        // 1. Корректируем ставку по результату прошлого раунда
        if (isLastBet()) {
            if (isLastBetWon()) {
                // Победа: Уменьшаем ставку
                currentBet -= unit;
                if (currentBet < unit) currentBet = unit; // Не опускаемся ниже минимума
            } else {
                // Поражение: Увеличиваем ставку
                currentBet += unit;
                // Кап по лимиту стола (важный момент)
                if (currentBet > getMaxBet()) {
                    currentBet = getMaxBet();
                }
            }
        }

        // 2. Получаем тренд
        Color color = predictor.predict(getState());
        BetType type = (color == Color.RED) ? BetType.RED : BetType.BLACK;

        // 3. Ставим
        return Bet.list(type, currentBet);
    }

    // Переопределяем, чтобы не сбивать логику
    @Override
    protected void onRoundCustom(Spot spot, List<Bet> bets) {}
}