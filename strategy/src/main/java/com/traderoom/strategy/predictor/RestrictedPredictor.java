package com.traderoom.strategy.predictor;

import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.BetTypePrediction;
import com.traderoom.strategy.model.ColorPrediction;
import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import lombok.Setter;

import java.util.*;

/**
 * Предиктор-обертка, реализующий логику "Инсайда" или жестких ограничений.
 * Позволяет динамически запрещать (Blacklist) или разрешать (Whitelist) конкретные числа.
 * <p>
 * Применяется, когда есть прогноз "не ставить на 4, 10, 15" или "ставить только на 0 и 32".
 */
public class RestrictedPredictor implements Predictor {

    private final Predictor delegate;

    /**
     * Набор запрещенных чисел (Blacklist). Если не пуст, эти числа исключаются из прогноза.
     */
    @Setter
    private Set<Spot> bannedSpots = new HashSet<>();

    /**
     * Набор разрешенных чисел (Whitelist). Если не пуст, прогноз строится ТОЛЬКО из этих чисел.
     * Имеет приоритет над bannedSpots (если whitelist задан, banned игнорируется).
     */
    @Setter
    private Set<Spot> allowedSpots = new HashSet<>();

    public RestrictedPredictor() {
        // По умолчанию используем случайный предиктор, если нет другой логики
        this.delegate = new RandomPredictor();
    }

    public RestrictedPredictor(Predictor delegate) {
        this.delegate = delegate;
    }

    /**
     * Возвращает прогнозы, отфильтрованные согласно спискам запретов/разрешений.
     */
    @Override
    public List<SpotPrediction> getNextSpot(State state, Config config) {
        List<SpotPrediction> rawPredictions = delegate.getNextSpot(state, config);

        if (rawPredictions.isEmpty()) return List.of();

        return rawPredictions.stream()
                .filter(p -> isAllowed(p.spot()))
                .toList();
    }

    @Override
    public List<BetTypePrediction> getNextType(State state, Config config) {
        // Фильтрация ставок на типы (Red/Black и т.д.) сложнее,
        // так как нужно проверять, не перекрывают ли они запрещенные числа.
        // Для простоты возвращаем как есть, либо можно реализовать логику исключения.
        return delegate.getNextType(state, config);
    }

    @Override
    public ColorPrediction getNextColor(State state, Config config) {
        return delegate.getNextColor(state, config);
    }

    /**
     * Проверяет, допустимо ли число для ставки.
     * @param spot проверяемое число
     * @return true, если число можно играть
     */
    private boolean isAllowed(Spot spot) {
        // Логика Whitelist (приоритет)
        if (!allowedSpots.isEmpty()) {
            return allowedSpots.contains(spot);
        }
        // Логика Blacklist
        if (!bannedSpots.isEmpty()) {
            return !bannedSpots.contains(spot);
        }
        return true;
    }

    /**
     * Утилита для быстрой установки запрещенных чисел
     */
    public void ban(Spot... spots) {
        this.bannedSpots = new HashSet<>(Arrays.asList(spots));
    }

    /**
     * Утилита для быстрой установки разрешенных чисел
     */
    public void allowOnly(Spot... spots) {
        this.allowedSpots = new HashSet<>(Arrays.asList(spots));
    }

    /**
     * Сброс всех ограничений
     */
    public void clearRestrictions() {
        this.bannedSpots.clear();
        this.allowedSpots.clear();
    }
}