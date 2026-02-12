package com.traderoom.api.runner.supplier;

import com.traderoom.api.enums.Constants;
import com.traderoom.api.enums.RouletteType;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.enums.GenerateType;

import java.util.List;

public class RandomSpotSupplier extends BaseSpotSupplier {

    private final List<Spot> pool;
    private final GenerateType generateType;

    public RandomSpotSupplier(RouletteType rouletteType, GenerateType generateType, long maxGenerations) {
        super(rouletteType, maxGenerations);
        this.generateType = generateType;
        List<Spot> allSpots = Spot.getAvailableList(rouletteType);
        pool = switch (generateType) {
            case RANDOM, ROTATION_NUMBER, ROTATION_WHEEL -> allSpots;
            case RANDOM_RED_ONLY -> allSpots.stream().filter(Spot::isRed).toList();
            case RANDOM_BLACK_ONLY -> allSpots.stream().filter(Spot::isBlack).toList();
            case RANDOM_EXCEPT_ONE -> allSpots.stream().filter(spot -> spot != Spot.SPOT_01).toList();
        };
        if (pool.isEmpty()) {
            throw new IllegalArgumentException("Spot pool is empty for generation type: " + generateType);
        }
    }

    public static SpotSupplier of(RouletteType rouletteType, GenerateType generateType, long maxGenerations) {
        return new RandomSpotSupplier(rouletteType, generateType, maxGenerations);
    }

    public Spot getInternal() {
        return switch (generateType) {
            case ROTATION_NUMBER, ROTATION_WHEEL -> pool.get((int) (getCount() % pool.size()));
            default -> pool.get(Constants.RANDOM.nextInt(pool.size()));
        };
    }

    public GenerateType getGenerateType() {
        return generateType;
    }
}