package com.traderoom.strategy.base.strategies.kelly;

import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.model.SpotPrediction;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@AStrategy
public class SaferKellyCriterionStrategy extends AbstractKellyCriterionStrategy {

    public SaferKellyCriterionStrategy(Config config) {
        KellyContext build = KellyContext.builder()
                .kelly(0.1)
                .maxBetPercentageCap(0.05)
                .minProbabilityThreshold(0.028)
                .build();
        super(config, build);
    }

    @Override
    public List<Bet> decide(State state) {
        List<SpotPrediction> predictions = predictor.getNextSpot(state, getConfig());
        Optional<KellyBet> optional = predictions.stream()
                .filter(item -> item.probability() > minProbabilityThreshold)
                .map(prediction -> calculateKellyFraction(prediction, kelly))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .max(Comparator.comparingDouble(KellyBet::fraction));

        if (optional.isPresent()) {
            KellyBet kellyBet = optional.get();
            long clamp = clamp(kellyBet.fraction(), state);
            if (clamp >= getConfig().minBet()) {
                return Bet.list(kellyBet.type(), clamp);
            }
        }
        return List.of();
    }

    private long clamp(double fraction, State state) {
        long balance = getBalance();
        if (balance <= 0) {
            return 0;
        }
        double safeFraction = Math.min(fraction, maxBetPercentageCap);
        long proposed = (long) (balance * safeFraction);
        long clamped = Math.clamp(proposed, getConfig().minBet(), getConfig().maxBet());
        return Math.clamp(clamped, 0L, balance);
    }
}