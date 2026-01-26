package com.traderoom.strategy.base.strategies.balance;

import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;

import java.util.List;
import java.util.Map;

@AStrategy
public class EvenOddBalanceStrategy extends AbstractBalanceStrategy {

    private final double threshold;

    public EvenOddBalanceStrategy(Config config) {
        super(config);
        threshold = 0.45;
    }

    @Override
    public List<Bet> decide(State state) {
        return processBet(BetType.EVEN, state, () -> {
            long even = 0;
            long odd = 0;
            for (Map.Entry<Spot, Integer> entry : state.getMarketData().getFrequencies().entrySet()) {
                if (entry.getKey().isEven()) {
                    even += entry.getValue();
                } else if (entry.getKey().isOdd()) {
                    odd += entry.getValue();
                }
            }
            long sum = even + odd;
            if (sum == 0) {
                return BetType.EVEN;
            }
            if (even < sum * threshold) {
                return BetType.EVEN;
            }

            if (odd < sum * threshold) {
                return BetType.ODD;
            }
            return BetType.EVEN;
        });
    }
}