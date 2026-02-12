package com.traderoom.strategy.strategies;

import com.traderoom.api.AbstractStrategy;
import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.annotation.Tag;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.SpotPrediction;
import com.traderoom.api.model.config.Config;
import com.traderoom.strategy.predictor.EnsemblePredictor;
import com.traderoom.api.Predictor;
import com.traderoom.api.utils.BetHelper;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Strategy(tags = {Tag.PREDICTIVE, Tag.HYBRID, Tag.AI})
public class EnsemblePredictionStrategy extends AbstractStrategy {

    private final Predictor predictor;
    private final int betsPerRound;
    private final double baseRiskPercent = 0.005;

    public EnsemblePredictionStrategy(Config config) {
        this(config, 300, 5);
    }

    public EnsemblePredictionStrategy(Config config, int windowSize) {
        this(config, windowSize, 5);
    }

    public EnsemblePredictionStrategy(Config config, int windowSize, int betsPerRound) {
        super(config);
        predictor = EnsemblePredictor.createDefaultEnsemble(windowSize);
        this.betsPerRound = betsPerRound;
    }

    @Override
    public List<Bet> decide() {
        List<SpotPrediction> predictions = predictor.predictSpot(getState(), getConfig());
        if (predictions.isEmpty()) {
            return List.of();
        }
        List<SpotPrediction> topPredictions = predictions.stream()
                .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
                .limit(betsPerRound)
                .toList();
        double averageProb = 1.0 / Spot.getAvailableList(getConfig().rouletteType()).size();
        List<Bet> bets = new ArrayList<>();
        long currentBalance = getVirtualBalance();
        for (SpotPrediction spotPrediction : topPredictions) {
            if (spotPrediction.probability() > averageProb * 1.1) {
                double confidenceMultiplier = spotPrediction.probability() / averageProb;
                long betAmount = (long) (currentBalance * baseRiskPercent * confidenceMultiplier);
                betAmount = Math.clamp(betAmount, getMinBet(), getMaxBet());
                if (betAmount > 0) {
                    bets.add(BetHelper.betting(spotPrediction, betAmount));
                }
            }
        }
        return bets;
    }
}