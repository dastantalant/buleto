package com.traderoom.api.utils;

import com.traderoom.api.enums.BetType;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.SpotPrediction;

import java.util.List;

public final class BetHelper {
    private BetHelper() {
    }

    public static long getTotalBetValue(List<Bet> list) {
        return (list == null || list.isEmpty()) ? 0 : list.stream()
                .mapToLong(Bet::value)
                .sum();
    }

    public static long getTotalPayout(List<Bet> list, Spot spot) {
        return (list == null || list.isEmpty()) ? 0 : list.stream()
                .filter(bet -> isWin(bet, spot))
                .mapToLong(bet -> bet.value() * bet.type().getReturnMultiplier())
                .sum();
    }

    public static boolean hasWin(List<Bet> list, Spot spot) {
        return list != null && !list.isEmpty() && list.stream().anyMatch(bet -> isWin(bet, spot));
    }

    public static boolean isWin(Bet bet, Spot spot) {
        return isWin(bet.type(), spot);
    }

    public static boolean isWin(BetType type, Spot spot) {
        return type.getWinning().contains(spot);
    }

    public static BetType getStraightUp(Spot spot) {
        return BetType.getStraightUpBetFor(spot);
    }

    public static Bet betting(SpotPrediction spotPrediction, long amount) {
        return Bet.of(getStraightUp(spotPrediction.spot()), amount);
    }

    public static Bet betting(Spot spot, long amount) {
        return Bet.of(getStraightUp(spot), amount);
    }

    public static List<BetType> getAllCovering(Spot spot) {
        return BetType.getAllCovering(spot);
    }
}