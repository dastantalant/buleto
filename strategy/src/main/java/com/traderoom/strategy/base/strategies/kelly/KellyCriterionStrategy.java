package com.traderoom.strategy.base.strategies.kelly;

import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.model.SpotPrediction;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@AStrategy
public class KellyCriterionStrategy extends AbstractKellyCriterionStrategy {

    public KellyCriterionStrategy(Config config) {
        KellyContext build = KellyContext.builder()
                .kelly(0.3)
                .build();
        super(config, build);
    }

    @Override
    public List<Bet> decide(State state) {
        List<SpotPrediction> predictions = predictor.getNextSpot(state, getConfig());
        Optional<KellyBet> optional = predictions.stream()
                .map(prediction -> calculateKellyFraction(prediction, kelly))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .max(Comparator.comparingDouble(KellyBet::fraction));

        if (optional.isPresent()) {
            KellyBet kellyBet = optional.get();
            long balance = getBalance();
            long clamp = Math.clamp((long) (balance * kellyBet.fraction()), getConfig().minBet(), getConfig().maxBet());
            if (clamp <= balance || clamp >= getConfig().minBet()) {
                return Bet.list(kellyBet.type(), clamp);
            }
        }
        return List.of();

    }
}