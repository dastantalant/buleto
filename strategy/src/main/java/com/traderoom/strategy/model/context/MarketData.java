package com.traderoom.strategy.model.context;

import com.traderoom.strategy.enums.Constants;
import com.traderoom.strategy.enums.Spot;

import lombok.ToString;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.function.Predicate;

@ToString
public class MarketData implements Serializable {
    private final List<Spot> spotHistory;
    private final Map<Spot, Integer> spotFrequencies;
    private long totalProcessed;

    public MarketData() {
        spotHistory = new ArrayList<>(Constants.SPOT_HISTORY_LIST_SIZE);
        spotFrequencies = new EnumMap<>(Spot.class);
        totalProcessed = 0;
    }

    public void addSpot(Spot spot) {
        spotHistory.add(spot);
        spotFrequencies.merge(spot, 1, Integer::sum);

        if (spotHistory.size() > Constants.SPOT_HISTORY_LIST_SIZE) {
            Spot removedSpot = spotHistory.removeFirst();
            spotFrequencies.compute(removedSpot, (_, count) -> count == null || count <= 1 ? null : count - 1);
        }
        totalProcessed++;
    }

    public double getRate(Predicate<Spot> condition) {
        if (spotHistory.isEmpty()) return 0.0;
        double matchCount = spotFrequencies.entrySet().stream()
                .filter(entry -> condition.test(entry.getKey()))
                .mapToInt(Map.Entry::getValue)
                .sum();
        return matchCount / spotHistory.size();
    }

    public List<Spot> getHistory() {
        return Collections.unmodifiableList(spotHistory);
    }

    public Map<Spot, Integer> getFrequencies() {
        return Collections.unmodifiableMap(spotFrequencies);
    }

    public Spot getLastSpot() {
        return spotHistory.isEmpty() ? null : spotHistory.getLast();
    }

    public long getCurrentLoopCount() {
        return totalProcessed;
    }

    public double getRedRate() {
        return getRate(Spot::isRed);
    }

    public double getBlackRate() {
        return getRate(Spot::isBlack);
    }
}