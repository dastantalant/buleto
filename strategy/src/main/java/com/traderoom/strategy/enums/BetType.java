package com.traderoom.strategy.enums;

import lombok.Getter;

import java.util.ArrayList;
import java.util.Collections;
import java.util.EnumMap;
import java.util.EnumSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Stream;

public enum BetType {
    STRAIGHT_UP_1(35, Spot.SPOT_01),
    STRAIGHT_UP_2(35, Spot.SPOT_02),
    STRAIGHT_UP_3(35, Spot.SPOT_03),
    STRAIGHT_UP_4(35, Spot.SPOT_04),
    STRAIGHT_UP_5(35, Spot.SPOT_05),
    STRAIGHT_UP_6(35, Spot.SPOT_06),
    STRAIGHT_UP_7(35, Spot.SPOT_07),
    STRAIGHT_UP_8(35, Spot.SPOT_08),
    STRAIGHT_UP_9(35, Spot.SPOT_09),
    STRAIGHT_UP_10(35, Spot.SPOT_10),
    STRAIGHT_UP_11(35, Spot.SPOT_11),
    STRAIGHT_UP_12(35, Spot.SPOT_12),
    STRAIGHT_UP_13(35, Spot.SPOT_13),
    STRAIGHT_UP_14(35, Spot.SPOT_14),
    STRAIGHT_UP_15(35, Spot.SPOT_15),
    STRAIGHT_UP_16(35, Spot.SPOT_16),
    STRAIGHT_UP_17(35, Spot.SPOT_17),
    STRAIGHT_UP_18(35, Spot.SPOT_18),
    STRAIGHT_UP_19(35, Spot.SPOT_19),
    STRAIGHT_UP_20(35, Spot.SPOT_20),
    STRAIGHT_UP_21(35, Spot.SPOT_21),
    STRAIGHT_UP_22(35, Spot.SPOT_22),
    STRAIGHT_UP_23(35, Spot.SPOT_23),
    STRAIGHT_UP_24(35, Spot.SPOT_24),
    STRAIGHT_UP_25(35, Spot.SPOT_25),
    STRAIGHT_UP_26(35, Spot.SPOT_26),
    STRAIGHT_UP_27(35, Spot.SPOT_27),
    STRAIGHT_UP_28(35, Spot.SPOT_28),
    STRAIGHT_UP_29(35, Spot.SPOT_29),
    STRAIGHT_UP_30(35, Spot.SPOT_30),
    STRAIGHT_UP_31(35, Spot.SPOT_31),
    STRAIGHT_UP_32(35, Spot.SPOT_32),
    STRAIGHT_UP_33(35, Spot.SPOT_33),
    STRAIGHT_UP_34(35, Spot.SPOT_34),
    STRAIGHT_UP_35(35, Spot.SPOT_35),
    STRAIGHT_UP_36(35, Spot.SPOT_36),
    ZERO(35, EnumSet.of(RouletteType.EUROPEAN, RouletteType.AMERICAN), Spot.SPOT_0),
    DOUBLE_ZERO(35, EnumSet.of(RouletteType.AMERICAN), Spot.SPOT_00),

    SPLIT_1_2(17, Spot.SPOT_01, Spot.SPOT_02),
    SPLIT_2_3(17, Spot.SPOT_02, Spot.SPOT_03),
    SPLIT_35_36(17, Spot.SPOT_35, Spot.SPOT_36),
    SPLIT_1_4(17, Spot.SPOT_01, Spot.SPOT_04),
    SPLIT_8_11(17, Spot.SPOT_08, Spot.SPOT_11),
    SPLIT_10_13(17, Spot.SPOT_10, Spot.SPOT_13),
    SPLIT_17_20(17, Spot.SPOT_17, Spot.SPOT_20),
    SPLIT_26_29(17, Spot.SPOT_26, Spot.SPOT_29),
    SPLIT_28_31(17, Spot.SPOT_28, Spot.SPOT_31),

    STREET_1_2_3(11, Spot.SPOT_01, Spot.SPOT_02, Spot.SPOT_03),
    STREET_34_35_36(11, Spot.SPOT_34, Spot.SPOT_35, Spot.SPOT_36),

    CORNER_1_2_4_5(8, Spot.SPOT_01, Spot.SPOT_02, Spot.SPOT_04, Spot.SPOT_05),
    CORNER_32_33_35_36(8, Spot.SPOT_32, Spot.SPOT_33, Spot.SPOT_35, Spot.SPOT_36),

    SIX_LINE_1_2_3_4_5_6(5, Spot.SPOT_01, Spot.SPOT_02, Spot.SPOT_03, Spot.SPOT_04, Spot.SPOT_05, Spot.SPOT_06),
    SIX_LINE_31_32_33_34_35_36(5, Spot.SPOT_31, Spot.SPOT_32, Spot.SPOT_33, Spot.SPOT_34, Spot.SPOT_35, Spot.SPOT_36),

    TOP_LINE_OR_BASKET(6, EnumSet.of(RouletteType.AMERICAN), Spot.SPOT_0, Spot.SPOT_00, Spot.SPOT_01, Spot.SPOT_02, Spot.SPOT_03),
    TRIO_0_1_2(11, EnumSet.of(RouletteType.EUROPEAN), Spot.SPOT_0, Spot.SPOT_01, Spot.SPOT_02),
    TRIO_0_2_3(11, EnumSet.of(RouletteType.EUROPEAN), Spot.SPOT_0, Spot.SPOT_02, Spot.SPOT_03),
    SPLIT_0_00(17, EnumSet.of(RouletteType.AMERICAN), Spot.SPOT_0, Spot.SPOT_00),
    SPLIT_0_2(17, EnumSet.of(RouletteType.EUROPEAN), Spot.SPOT_0, Spot.SPOT_02),
    STREET_0_00_2(11, EnumSet.of(RouletteType.AMERICAN), Spot.SPOT_0, Spot.SPOT_00, Spot.SPOT_02),
    CORNER_0_1_2_3(8, EnumSet.of(RouletteType.EUROPEAN), Spot.SPOT_0, Spot.SPOT_01, Spot.SPOT_02, Spot.SPOT_03),

    FIRST_COLUMN(2, Spot.FIRST_COLUMN_SPOTS),
    SECOND_COLUMN(2, Spot.SECOND_COLUMN_SPOTS),
    THIRD_COLUMN(2, Spot.THIRD_COLUMN_SPOTS),
    FIRST_DOZEN(2, Spot.FIRST_DOZEN_SPOTS),
    SECOND_DOZEN(2, Spot.SECOND_DOZEN_SPOTS),
    THIRD_DOZEN(2, Spot.THIRD_DOZEN_SPOTS),
    ONE_TO_EIGHTEEN(1, Spot.LOW_SPOTS),
    EVEN(1, Spot.EVENS),
    RED(1, Spot.REDS),
    BLACK(1, Spot.BLACKS),
    ODD(1, Spot.ODDS),
    NINETEEN_TO_THIRTY_SIX(1, Spot.HIGH_SPOTS);

    @Getter
    private final int payout;
    private final EnumSet<RouletteType> availableIn;
    @Getter
    private final Set<Spot> winning;

    private static final Map<Spot, BetType> STRAIGHT_UP_MAP = new EnumMap<>(Spot.class);
    private static final Map<RouletteType, List<BetType>> AVAILABLE_BETS_CACHE = new ConcurrentHashMap<>();

    static {
        STRAIGHT_UP_MAP.put(Spot.SPOT_0, ZERO);
        STRAIGHT_UP_MAP.put(Spot.SPOT_00, DOUBLE_ZERO);
        for (Spot spot : Spot.values()) {
            if (spot.getNumber() > 0) {
                String betTypeName = "STRAIGHT_UP_" + spot.getNumber();
                try {
                    STRAIGHT_UP_MAP.put(spot, BetType.valueOf(betTypeName));
                } catch (IllegalArgumentException e) {
                }
            }
        }
    }

    // Constructors
    BetType(int payout, Spot... spots) {
        this(payout, EnumSet.allOf(RouletteType.class), spots);
    }

    BetType(int payout, EnumSet<RouletteType> availableIn, Spot... spots) {
        this.payout = payout;
        this.availableIn = availableIn;
        winning = spots.length == 0 ? EnumSet.noneOf(Spot.class) : EnumSet.copyOf(List.of(spots));
    }

    BetType(int payout, Set<Spot> spots) {
        this(payout, EnumSet.allOf(RouletteType.class), spots);
    }

    BetType(int payout, EnumSet<RouletteType> availableIn, Set<Spot> spots) {
        this.payout = payout;
        this.availableIn = availableIn;
        winning = (spots == null || spots.isEmpty())
                ? EnumSet.noneOf(Spot.class)
                : EnumSet.copyOf(spots);
    }

    public static List<BetType> getAllCovering(Spot spot) {
        return Stream.of(BetType.values())
                .filter(type -> type.getWinning().contains(spot))
                .toList();
    }

    public static List<BetType> getAvailableList(RouletteType rouletteType) {
        Objects.requireNonNull(rouletteType, "rouletteType не может быть null");
        return AVAILABLE_BETS_CACHE.computeIfAbsent(rouletteType, key -> {
            List<BetType> result = new ArrayList<>();
            for (BetType bet : values()) {
                if (bet.isAvailableIn(key)) {
                    result.add(bet);
                }
            }
            return Collections.unmodifiableList(result);
        });
    }

    public boolean isAvailableIn(RouletteType rouletteType) {
        return availableIn.contains(rouletteType);
    }

    public int getReturnMultiplier() {
        return payout + 1;
    }

    public static BetType getStraightUpBetFor(Spot spot) {
        BetType bet = STRAIGHT_UP_MAP.get(spot);
        if (bet == null) {
            throw new IllegalArgumentException("Нет ставки 'Straight Up' для номера: " + spot);
        }
        return bet;
    }
}