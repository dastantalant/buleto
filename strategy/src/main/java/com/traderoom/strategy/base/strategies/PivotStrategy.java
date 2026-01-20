package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.base.AbstractStrategy;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.utils.BetHelper;

import java.util.ArrayList;
import java.util.List;

@AStrategy
public class PivotStrategy extends AbstractStrategy {
    private Spot currentPivot;
    private int betsPlacedOnPivot;
    private final List<Spot> observationBuffer;

    public PivotStrategy(Config config) {
        super(config);
        observationBuffer = new ArrayList<>();
        currentPivot = null;
        betsPlacedOnPivot = 0;
    }

    @Override
    public List<Bet> decide(State state) {
        Spot lastSpot = state.getMarketData().getLastSpot();

        if (currentPivot != null) {
            if (lastSpot == currentPivot) {
                currentPivot = null;
                betsPlacedOnPivot = 0;
                observationBuffer.clear();
                observationBuffer.add(lastSpot);
            } else {
                betsPlacedOnPivot++;
                if (betsPlacedOnPivot >= 35) {
                    currentPivot = null;
                    betsPlacedOnPivot = 0;
                }
            }
        }

        if (currentPivot == null && lastSpot != null) {
            if (observationBuffer.contains(lastSpot)) {
                currentPivot = lastSpot;
                betsPlacedOnPivot = 0;
                observationBuffer.clear();
            } else {
                observationBuffer.add(lastSpot);
                if (observationBuffer.size() > 100) {
                    observationBuffer.removeFirst();
                }
            }
        }

        if (currentPivot != null) {
            long value = getConfig().minBet();
            if (value > getBalance()) return List.of();
            return Bet.list(BetHelper.getStraightUp(currentPivot), value);
        }

        return List.of();
    }
}