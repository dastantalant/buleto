package com.traderoom.strategy.application;

import com.traderoom.strategy.Constant;
import com.traderoom.strategy.enums.RouletteType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.enums.SpotGenerateType;
import com.traderoom.strategy.strategy.stop.InitialStopLossCondition;
import com.traderoom.strategy.strategy.stop.StopCondition;
import com.traderoom.strategy.strategy.stop.TakeProfitCondition;
import com.traderoom.strategy.strategy.stop.TrailingStopLossCondition;
import com.traderoom.strategy.strategy.stop.ZeroBalanceStopCondition;
import lombok.Getter;
import lombok.NonNull;

import java.util.ArrayList;
import java.util.Collections;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Predicate;

@Getter
public final class Context {
    @NonNull
    private final RouletteType rouletteType;
    @NonNull
    private final SpotGenerateType spotGenerateType;
    private final long start;
    private final long min;
    private final long max;
    private final long totalRoundBetLimit;

    private final int stopLossPercentage;
    private final int trailingStopPercentage;

    private final List<Spot> spotHistory;
    private final Map<Spot, Integer> spotFrequencies;
    private long currentLoopCount;

    private final List<StopCondition> stopConditions;
    private final int takeProfitPercentage;

    private Context(ContextBuilder builder) {
        rouletteType = Objects.requireNonNull(builder.rouletteType, "rouletteType не может быть null");
        spotGenerateType = Objects.requireNonNull(builder.spotGenerateType, "spotGenerateType не может быть null");
        start = builder.start;
        min = builder.min;
        max = builder.max;
        totalRoundBetLimit = builder.totalRoundBetLimit;
        stopLossPercentage = builder.stopLossPercentage > 100 ? 100 : Math.max(builder.stopLossPercentage, 0);
        trailingStopPercentage = builder.trailingStopPercentage > 100 ? 100 : Math.max(builder.trailingStopPercentage, 0);
        takeProfitPercentage = Math.max(builder.takeProfitPercentage, 0);

        List<StopCondition> finalStopConditions = new ArrayList<>();
        finalStopConditions.add(new ZeroBalanceStopCondition());
        finalStopConditions.add(new InitialStopLossCondition(start, stopLossPercentage));
        finalStopConditions.add(new TrailingStopLossCondition(trailingStopPercentage));
        finalStopConditions.add(new TakeProfitCondition(start, takeProfitPercentage));
        finalStopConditions.addAll(builder.customStopConditions);
        stopConditions = Collections.unmodifiableList(finalStopConditions);

        spotHistory = new ArrayList<>(Constant.SPOT_HISTORY_LIST_SIZE);
        spotFrequencies = new EnumMap<>(Spot.class);
        currentLoopCount = 0;
    }

    public void addSpotHistory(Spot spot) {
        Objects.requireNonNull(spot, "spot не может быть null");
        spotHistory.add(spot);
        spotFrequencies.merge(spot, 1, Integer::sum);

        if (spotHistory.size() > Constant.SPOT_HISTORY_LIST_SIZE) {
            Spot removedSpot = spotHistory.removeFirst();
            spotFrequencies.compute(removedSpot, (_k, count) -> count == null || count <= 1 ? null : count - 1);
        }
        currentLoopCount++;
    }

    public double getRate(Predicate<Spot> condition) {
        if (spotHistory.isEmpty()) {
            return 0.0;
        }
        double matchCount = spotFrequencies.entrySet().stream()
                .filter(entry -> condition.test(entry.getKey()))
                .mapToInt(Map.Entry::getValue)
                .sum();
        return matchCount / spotHistory.size();
    }

    public double getRedRate() {
        return getRate(Spot::isRed);
    }

    public double getBlackRate() {
        return getRate(Spot::isBlack);
    }

    public double getGreenRate() {
        return getRate(Spot::isGreen);
    }

    public int getSpotCount(Spot spot) {
        return spotFrequencies.getOrDefault(spot, 0);
    }

    public Spot getLastSpot() {
        if (spotHistory.isEmpty()) {
            return null;
        }
        return spotHistory.getLast();
    }

    public List<Spot> getSpotHistory() {
        return Collections.unmodifiableList(spotHistory);
    }

    public Map<Spot, Integer> getSpotFrequencies() {
        return Collections.unmodifiableMap(spotFrequencies);
    }

    public static ContextBuilder builder() {
        return builder(RouletteType.EUROPEAN, SpotGenerateType.ROTATION_NUMBER);
    }

    public static ContextBuilder builder(RouletteType rouletteType, SpotGenerateType spotGenerateType) {
        return new ContextBuilder(rouletteType, spotGenerateType);
    }

    public static final class ContextBuilder {
        private RouletteType rouletteType;
        private SpotGenerateType spotGenerateType;
        private long start = 1000L;
        private long min = 1L;
        private long max = 100L;
        private long totalRoundBetLimit = 15_000L;
        private int stopLossPercentage = 95;
        private int trailingStopPercentage = 5;
        private final List<StopCondition> customStopConditions;
        private int takeProfitPercentage = 0;

        private ContextBuilder(RouletteType rouletteType, SpotGenerateType spotGenerateType) {
            this.rouletteType = rouletteType;
            this.spotGenerateType = spotGenerateType;
            customStopConditions = new ArrayList<>();
        }

        public ContextBuilder rouletteType(RouletteType rouletteType) {
            this.rouletteType = rouletteType;
            return this;
        }

        public ContextBuilder spotGenerateType(SpotGenerateType spotGenerateType) {
            this.spotGenerateType = spotGenerateType;
            return this;
        }

        public ContextBuilder start(long start) {
            this.start = start;
            return this;
        }

        public ContextBuilder min(long min) {
            this.min = min;
            return this;
        }

        public ContextBuilder max(long max) {
            this.max = max;
            return this;
        }

        public ContextBuilder totalRoundBetLimit(long totalRoundBetLimit) {
            this.totalRoundBetLimit = totalRoundBetLimit;
            return this;
        }

        public ContextBuilder stopLossPercentage(int stopLossPercentage) {
            this.stopLossPercentage = stopLossPercentage;
            return this;
        }

        public ContextBuilder trailingStopPercentage(int trailingStopPercentage) {
            this.trailingStopPercentage = trailingStopPercentage;
            return this;
        }

        public ContextBuilder takeProfitPercentage(int takeProfitPercentage) {
            this.takeProfitPercentage = takeProfitPercentage;
            return this;
        }

        public ContextBuilder addStopCondition(StopCondition condition) {
            Objects.requireNonNull(condition, "StopCondition не может быть null");
            customStopConditions.add(condition);
            return this;
        }

        public ContextBuilder addStopConditions(List<StopCondition> conditions) {
            if (conditions != null && !conditions.isEmpty()) {
                customStopConditions.addAll(conditions);
            }
            return this;
        }

        public Context build() {
            return new Context(this);
        }
    }
}