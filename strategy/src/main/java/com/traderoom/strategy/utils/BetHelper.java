package com.traderoom.strategy.utils;

import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.Bet;
import lombok.experimental.UtilityClass;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@UtilityClass
public final class BetHelper {

    private static final String MESSAGE = "Выпавший номер (spot) не может быть null";

    public static long getTotalBetValue(List<Bet> betList) {
        return (betList == null || betList.isEmpty()) ? 0 :
                betList.stream()
                        .mapToLong(Bet::value)
                        .sum();
    }

    public static long getTotalPayout(List<Bet> betList, Spot spot) {
        Objects.requireNonNull(spot, MESSAGE);
        return (betList == null || betList.isEmpty()) ? 0 :
                betList.stream()
                        .filter(bet -> isWin(bet, spot))
                        .mapToLong(bet -> bet.value() * bet.type().getReturnMultiplier())
                        .sum();
    }

    public static boolean hasWin(List<Bet> betList, Spot spot) {
        Objects.requireNonNull(spot, MESSAGE);
        return betList != null && !betList.isEmpty() && betList.stream().anyMatch(bet -> isWin(bet, spot));
    }

    public static boolean isWin(Bet bet, Spot spot) {
        Objects.requireNonNull(bet, "Ставка (bet) не может быть null.");
        Objects.requireNonNull(spot, MESSAGE);
        return isWin(bet.type(), spot);
    }

    public static boolean isWin(BetType type, Spot spot) {
        Objects.requireNonNull(type, "Тип ставки (type) не может быть null.");
        Objects.requireNonNull(spot, MESSAGE);
        return type.getWinningSpots().contains(spot);
    }

    public static BetType getStraightUpBetType(Spot spot) {
        Objects.requireNonNull(spot, MESSAGE);
        return BetType.getStraightUpBetFor(spot);
    }

    public static List<BetType> getAllCoveringBets(Spot spot) {
        Objects.requireNonNull(spot, MESSAGE);
        return Stream.of(BetType.values())
                .filter(betType -> betType.getWinningSpots().contains(spot))
                .collect(Collectors.toList());
    }
}