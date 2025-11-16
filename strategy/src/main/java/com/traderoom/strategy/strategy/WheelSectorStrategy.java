package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.RouletteType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.predictor.ImprovedMarkovPredictor;
import com.traderoom.strategy.predictor.Predictor;
import com.traderoom.strategy.utils.BetHelper;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class WheelSectorStrategy extends BaseStrategy {

    private static final Predictor PREDICTOR = new ImprovedMarkovPredictor();
    private static final int SECTOR_SIZE = 5;
    private static final double PROBABILITY_THRESHOLD = 0.2;

    public WheelSectorStrategy(Context context) {
        super(context);
    }

    @Override
    public String getName() {
        return WheelSectorStrategy.class.getSimpleName();
    }

    @Override
    protected List<Bet> getNextInternal(Context context) {
        if (context.getRouletteType() == RouletteType.ONE_TO_36) {
            return Collections.emptyList();
        }

        List<SpotPrediction> predictions = PREDICTOR.getNextSpotPredictionList(context);

        if (predictions.isEmpty()) {
            return Collections.emptyList();
        }

        SpotPrediction highestProbabilitySpot = predictions.stream()
                .filter(p -> p.probability() >= PROBABILITY_THRESHOLD)
                .max(Comparator.comparingDouble(SpotPrediction::probability))
                .orElse(null);

        if (highestProbabilitySpot == null) {
            return Collections.emptyList();
        }

        Spot centerSpot = highestProbabilitySpot.spot();
        List<Bet> bets = new ArrayList<>();

        Set<Spot> sectorSpots = getSpotsInSector(centerSpot, SECTOR_SIZE, context.getRouletteType());

        long betValue = context.getMin();
        for (Spot spot : sectorSpots) {
            long currentBalanceForBet = curBalance - bets.stream().mapToLong(Bet::value).sum();
            if (currentBalanceForBet < betValue) {
                break;
            }
            BetType type = BetHelper.getStraightUpBetType(spot);
            bets.add(Bet.builder().type(type).value(betValue).build());
        }

        return bets;
    }

    /**
     * Возвращает список номеров, находящихся в определенном секторе вокруг центрального номера на рулеточном колесе.
     *
     * @param centerSpot   Центральный номер сектора.
     * @param radius       Количество номеров в каждую сторону от центра (включая центр).
     * @param rouletteType Тип рулетки.
     * @return Набор номеров, входящих в сектор.
     */
    private Set<Spot> getSpotsInSector(Spot centerSpot, int radius, RouletteType rouletteType) {
        Map<Spot, Integer> wheelPositions = Spot.WHEEL_POSITIONS_CACHE.get(rouletteType);
        Spot[] wheelLayout = Spot.WHEEL_LAYOUTS.get(rouletteType);

        if (wheelPositions == null || wheelLayout == null) {
            return Collections.emptySet();
        }

        int centerPos = wheelPositions.getOrDefault(centerSpot, -1);
        if (centerPos == -1) {
            return Collections.emptySet();
        }

        Set<Spot> sector = new java.util.HashSet<>();
        int wheelSize = wheelLayout.length;

        for (int i = -radius; i <= radius; i++) {
            int currentPos = (centerPos + i + wheelSize) % wheelSize;
            sector.add(wheelLayout[currentPos]);
        }

        return sector;
    }
}