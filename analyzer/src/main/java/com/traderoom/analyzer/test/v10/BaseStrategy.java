package com.traderoom.analyzer.test.v10;

import com.traderoom.api.AbstractStrategy;
import com.traderoom.api.Predictor;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.SpotPrediction;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.utils.BetHelper;

import java.util.List;

@Deprecated
@Strategy
public class BaseStrategy extends AbstractStrategy {
    private final Predictor predictor;
    private final int window;
    private final int attack;
    private final int limit;

    private int cycleRoundCounter = 0;
    private List<Bet> lockedBets = null;

    public BaseStrategy(Config config, int window, int attack, int limit) {
        this(config, new FrequencyPredictor2(window), window, attack, limit);
    }

    public BaseStrategy(Config config, Predictor predictor, int window, int attack, int limit) {
        super(config);
        this.predictor = predictor;
        this.window = window;
        this.attack = attack;
        this.limit = limit;
    }

    @Override
    public List<Bet> decide() {
        cycleRoundCounter++;
        if (cycleRoundCounter <= window) {
            return List.of();
        }
        if (cycleRoundCounter == window + 1) {
            List<SpotPrediction> predictions = predictor.predictSpot(getState(), getConfig());
            if (predictions.isEmpty()) {
                resetCycle();
                return List.of();
            }
            List<Spot> targets = predictions.stream()
                    .limit(limit)
                    .map(SpotPrediction::spot)
                    .toList();

            long amount = getMinBet();
            if (getVirtualBalance() < getStartBalance()) {
                amount = (long) (amount * 1.5);
                amount = Math.min(amount, getMaxBet());
            }

            long finalAmount = amount;
            lockedBets = targets.stream()
                    .map(s -> BetHelper.betting(s, finalAmount))
                    .toList();
        }

        if (cycleRoundCounter <= window + attack) {
            if (isLastBetWon()) {
                resetCycle();
                return List.of();
            }
            return lockedBets != null ? lockedBets : List.of();
        }

        resetCycle();
        return List.of();
    }

    private void resetCycle() {
        cycleRoundCounter = 0;
        lockedBets = null;
    }
}