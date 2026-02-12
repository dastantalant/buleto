package com.traderoom.strategy.strategies.balance;

import com.traderoom.api.enums.BetType;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.config.Config;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@Strategy(tags = {Tag.STATISTICAL})
public class DistantProgressionBalanceStrategy extends AbstractBalanceStrategy {

    private final List<BetType> targetBetTypes;

    public DistantProgressionBalanceStrategy(Config config) {
        super(config);
        targetBetTypes = List.of(BetType.FIRST_DOZEN, BetType.SECOND_DOZEN, BetType.THIRD_DOZEN);
    }

    @Override
    public List<Bet> decide() {
        return processBet(targetBetTypes.getFirst(), getState(), () -> {
            Map<BetType, Long> counters = new EnumMap<>(BetType.class);
            for (BetType type : targetBetTypes) {
                counters.put(type, 0L);
            }
            for (var spot : getState().getMarket().getHistory()) {
                for (BetType type : targetBetTypes) {
                    if (type.getWinning().contains(spot)) {
                        counters.put(type, counters.get(type) + 1);
                    }
                }
            }
            return counters.entrySet().stream()
                    .min(Map.Entry.comparingByValue())
                    .map(Map.Entry::getKey)
                    .orElse(targetBetTypes.getFirst());
        });
    }

}