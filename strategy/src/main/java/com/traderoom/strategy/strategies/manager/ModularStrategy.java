package com.traderoom.strategy.strategies.manager;

import com.traderoom.api.AbstractStrategy;
import com.traderoom.api.Predictor;
import com.traderoom.api.sizing.Sizing;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.model.SpotPrediction;
import com.traderoom.api.utils.BetHelper;

import java.util.Comparator;
import java.util.List;

public abstract class ModularStrategy extends AbstractStrategy {

    private final Predictor predictor;
    private final Sizing sizing;

    protected ModularStrategy(Config config, Predictor predictor, Sizing sizing) {
        super(config, Manager.formatName(predictor, sizing));
        this.predictor = predictor;
        this.sizing = sizing;
    }

    public static ModularStrategy of(Config config, Predictor predictor, Sizing sizing) {
        return new ModularStrategy(config, predictor, sizing){};
    }

    @Override
    public List<Bet> decide() {
        List<SpotPrediction> predictions = predictor.predictSpot(getState(), getConfig());
        if (predictions.isEmpty()) return List.of();

        SpotPrediction bestPrediction = predictions.stream()
                .max(Comparator.comparingDouble(SpotPrediction::probability))
                .orElse(null);

        long amount = sizing.calculate(this, bestPrediction, isLastBetWon(), isLastBet() ? getLastBet() : 0);
        long balance = getVirtualBalance();
        if (amount <= 0 || amount > balance) {
            amount = Math.min(amount, balance);
            if (amount < getMinBet()) return List.of();
        }
        return Bet.list(BetHelper.getStraightUp(bestPrediction.spot()), amount);
    }
}
