package com.traderoom.strategy.utils;

import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.Bet;

import lombok.experimental.UtilityClass;

import java.util.List;
import java.util.Objects;

@UtilityClass
public final class BetHelper {

    private static final String MESSAGE = "The drawn number (spot) cannot be null";

    public static long getTotalBetValue(List<Bet> list) {
        return (list == null || list.isEmpty()) ? 0 : list.stream()
                .mapToLong(Bet::value)
                .sum();
    }

    public static long getTotalPayout(List<Bet> list, Spot spot) {
        Objects.requireNonNull(spot, MESSAGE);
        return (list == null || list.isEmpty()) ? 0 : list.stream()
                .filter(bet -> isWin(bet, spot))
                .mapToLong(bet -> bet.value() * bet.type().getReturnMultiplier())
                .sum();
    }

    public static boolean hasWin(List<Bet> list, Spot spot) {
        Objects.requireNonNull(spot, MESSAGE);
        return list != null && !list.isEmpty() && list.stream().anyMatch(bet -> isWin(bet, spot));
    }

    public static boolean isWin(Bet bet, Spot spot) {
        Objects.requireNonNull(spot, MESSAGE);
        return isWin(bet.type(), spot);
    }

    public static boolean isWin(BetType type, Spot spot) {
        Objects.requireNonNull(spot, MESSAGE);
        return type.getWinning().contains(spot);
    }

    public static BetType getStraightUp(Spot spot) {
        Objects.requireNonNull(spot, MESSAGE);
        return BetType.getStraightUpBetFor(spot);
    }

    public static List<BetType> getAllCovering(Spot spot) {
        Objects.requireNonNull(spot, MESSAGE);
        return BetType.getAllCovering(spot);
    }
}