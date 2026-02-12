package com.traderoom.analyzer.test.v12;


import com.traderoom.api.*;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.enums.Color;
import com.traderoom.api.enums.BetType;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.*;
import com.traderoom.api.model.config.Config;
import java.util.List;

@Strategy(name = "TrendMaster")
public class TrendMasterStrategy extends AbstractStrategy {
    private final TrendPredictor predictor = new TrendPredictor();

    // Стандартный Мартингейл: 1, 2, 4, 8, 16, 32
    // Сумма = 63 юнита. Укладывается в 100 юнитов баланса.
    private static final int[] MULTIPLIERS = {1, 2, 4, 8, 16, 32};
    private int step = 0;

    private BetType lastBetType = null;

    public TrendMasterStrategy(Config config) {
        super(config);
    }

    @Override
    public List<Bet> decide() {
        // 1. Проверяем результат прошлого раунда для коррекции прогрессии
        if (isLastBet()) {
            if (isLastBetWon()) {
                step = 0; // Сброс при победе
            } else {
                step++; // Увеличение при поражении
                if (step >= MULTIPLIERS.length) {
                    step = 0; // Если пробили 6 колен - сбрасываем, фиксируем убыток (StopLoss сессии спасет)
                }
            }
        }

        // 2. Рассчитываем сумму
        long baseBet = getMinBet(); // 1_00
        long amount = baseBet * MULTIPLIERS[step];

        // Проверка баланса. Если не хватает на удвоение - ставим всё что есть (All-in)
        if (amount > getVirtualBalance()) {
            amount = getVirtualBalance();
        }
        // Если совсем нет денег - стоп
        if (amount < 1) return List.of();

        // 3. Определяем, на что ставить (Трендовый вход)
        Color nextColor = predictor.predictNextColor(getState());

        // Если мы проиграли, мы ОБЯЗАНЫ ставить на тот же цвет,
        // или переключаться? В трендовой стратегии мы всегда ставим на последний выпавший.
        // Пример: Выпал Red (мы ставили Black). Проигрыш.
        // Сейчас Last=Red. Мы ставим Red (переворачиваемся вместе с трендом).

        BetType type = (nextColor == Color.RED) ? BetType.RED : BetType.BLACK;
        lastBetType = type;

        return Bet.list(type, amount);
    }

    // Переопределяем для корректной проверки выигрыша по цвету
    @Override
    protected void onRoundCustom(Spot spot, List<Bet> bets) {
        // Логика уже в decide() через isLastBetWon(), который работает корректно
    }
}