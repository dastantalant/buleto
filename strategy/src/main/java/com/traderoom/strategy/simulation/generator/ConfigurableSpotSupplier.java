package com.traderoom.strategy.simulation.generator;

import com.traderoom.strategy.enums.RouletteType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.enums.SpotGenerateType;

import java.security.SecureRandom;
import java.util.List;
import java.util.Random;

public class ConfigurableSpotSupplier extends BaseSpotSupplier {

    private final List<Spot> pool;
    private final Random random;

    public ConfigurableSpotSupplier(RouletteType rouletteType, SpotGenerateType generateType, long maxGenerations) {
        super(rouletteType, generateType, maxGenerations);
        random = new SecureRandom();
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
    public static SpotSupplier of(RouletteType rouletteType, SpotGenerateType generateType, long maxGenerations) {
        return new ConfigurableSpotSupplier(rouletteType, generateType, maxGenerations);
    }
    public Spot getInternal() {
        return switch (getGenerateType()) {
            case ROTATION_NUMBER, ROTATION_WHEEL -> pool.get((int) (getCount() % pool.size()));
            default -> pool.get(random.nextInt(pool.size()));
        };
    }
}