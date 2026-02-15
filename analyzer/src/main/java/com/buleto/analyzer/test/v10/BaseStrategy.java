package com.buleto.analyzer.test.v10;

import com.trading.roulette.api.AbstractStrategy;
import com.trading.roulette.api.Predictor;
import com.trading.roulette.api.annotation.Strategy;
import com.trading.roulette.api.enums.Spot;
import com.trading.roulette.api.model.Bet;
import com.trading.roulette.api.model.SpotPrediction;
import com.trading.roulette.api.model.config.Config;
import com.trading.roulette.api.utils.BetHelper;

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