package com.traderoom.strategy.base;

import com.traderoom.strategy.api.Manager;
import com.traderoom.strategy.predictor.Predictor;
import com.traderoom.strategy.sizing.Sizing;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.utils.BetHelper;

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
    public List<Bet> decide(State state) {
        List<SpotPrediction> predictions = predictor.getNextSpot(state, getConfig());
        if (predictions.isEmpty()) return List.of();

        SpotPrediction bestPrediction = predictions.stream()
                .max(Comparator.comparingDouble(SpotPrediction::probability))
                .orElse(null);

        long amount = sizing.calculate(state, isLastBetWon(state), isLastBet() ? getLastBet() : 0, bestPrediction, getConfig());
        long balance = getBalance();
        if (amount <= 0 || amount > balance) {
            amount = Math.min(amount, balance);
            if (amount < getConfig().minBet()) return List.of();
        }
        return Bet.list(BetHelper.getStraightUp(bestPrediction.spot()), amount);
    }
}
