package com.traderoom.strategy.strategies.balance;

import com.traderoom.api.enums.BetType;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.config.Config;

import java.util.List;
import java.util.Map;

@Strategy(tags = {Tag.STATISTICAL})
public class EvenOddBalanceStrategy extends AbstractBalanceStrategy {

    private final double threshold;

    public EvenOddBalanceStrategy(Config config) {
        super(config);
        threshold = 0.45;
    }

    @Override
    public List<Bet> decide() {
        return processBet(BetType.EVEN,getState(), () -> {
            long even = 0;
            long odd = 0;
            for (Map.Entry<Spot, Integer> entry : getState().getMarket().getFrequencies().entrySet()) {
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