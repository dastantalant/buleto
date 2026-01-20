package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.predictor.Predictor;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.predictor.PatternPredictor;
import com.traderoom.strategy.base.AbstractStrategy;
import com.traderoom.strategy.utils.BetHelper;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@AStrategy
public class PatternStrategy extends AbstractStrategy {

    private final double probability;
    private final int max;
    private final double fraction;
    private final double multiplier;

    private final Predictor predictor;

    public PatternStrategy(Config config) {
        super(config);
        predictor = new PatternPredictor();
        probability = 0.02;
        max = 5;
        fraction = 0.1;
        multiplier = 2.0;
    }

    @Override
    public List<Bet> decide(State state) {
        long total = (long) Math.min(Math.max(getBalance(), getConfig().startBalance()) * fraction, getConfig().maxBet());
        if (total < getConfig().minBet()) {
            return List.of();
        }
        List<SpotPrediction> spot = predictor.getNextSpot(state, getConfig());
        if (spot.isEmpty()) {
            return List.of();
        }

        List<Bet> bets = extract(state, spot, total);
        return (bets.isEmpty()) ? Bet.list(BetHelper.getStraightUp(spot.getFirst().spot()), getConfig().minBet()) : bets;
    }

    private List<Bet> extract(State state, List<SpotPrediction> predictions, long total) {
        List<SpotPrediction> sortedPredictions = new ArrayList<>(predictions);
        sortedPredictions.sort(Comparator.comparingDouble(SpotPrediction::probability).reversed());

        List<Bet> bets = new ArrayList<>(max);
        long budget = 0;
        long minBet = getConfig().minBet();

        for (SpotPrediction item : sortedPredictions) {
            if (budget >= total || bets.size() >= max) {
                break;
            }
            long remaining = total - budget;
            if (remaining < minBet) {
                break;
            }
            if (item.probability() >= probability) {
                long calculatedValue = (long) (total * item.probability() * multiplier);
                long betValue = Math.clamp(calculatedValue, minBet, remaining);
                budget += betValue;
                bets.add(Bet.of(BetHelper.getStraightUp(item.spot()), betValue));
            }
        }
        return bets;
    }
}