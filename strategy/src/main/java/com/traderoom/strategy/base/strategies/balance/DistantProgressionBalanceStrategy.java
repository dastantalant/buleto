package com.traderoom.strategy.base.strategies.balance;

import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@AStrategy
public class DistantProgressionBalanceStrategy extends AbstractBalanceStrategy {

    private final List<BetType> targetBetTypes;

    public DistantProgressionBalanceStrategy(Config config) {
        super(config);
        targetBetTypes = List.of(BetType.FIRST_DOZEN, BetType.SECOND_DOZEN, BetType.THIRD_DOZEN);
    }

    @Override
    public List<Bet> decide(State state) {
        return processBet(targetBetTypes.getFirst(), state, () -> {
            Map<BetType, Long> counters = new EnumMap<>(BetType.class);
            for (BetType type : targetBetTypes) {
                counters.put(type, 0L);
            }
            for (var spot : state.getMarketData().getHistory()) {
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