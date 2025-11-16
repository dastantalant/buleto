package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.predictor.PatternPredictor;
import com.traderoom.strategy.predictor.Predictor;
import com.traderoom.strategy.utils.BetHelper;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicLong;

public class PatternStrategy extends BaseStrategy {

    private static final Predictor PREDICTOR = new PatternPredictor();
    private static final double PROBABILITY_THRESHOLD = 0.02;
    private static final int MAX_BETS = 5;
    private static final double BUDGET_FRACTION = 0.1;
    private static final double VALUE_MULTIPLIER = 2.0;

    public PatternStrategy(Context context) {
        super(context);
    }

    @Override
    public String getName() {
        return PatternStrategy.class.getSimpleName();
    }

    @Override
    public List<Bet> getNextInternal(Context context) {
        Objects.requireNonNull(PREDICTOR, "Predictor must not be null");
        if (curBalance < 0) {
            throw new IllegalStateException("Current balance cannot be negative: " + curBalance);
        }
        long totalBudget = (long) Math.min(
                Math.max(curBalance, context.getStart()) * BUDGET_FRACTION,
                context.getMax()
        );
        if (totalBudget < context.getMin()) {
            return List.of();
        }
        List<SpotPrediction> predictions = PREDICTOR.getNextSpotPredictionList(context);
        if (predictions.isEmpty()) {
            return List.of();
        }

        AtomicLong usedBudget = new AtomicLong(0);
        List<Bet> bets = predictions.stream()
                .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
                .filter(prediction -> prediction.probability() >= PROBABILITY_THRESHOLD)
                .limit(MAX_BETS)
                .map(prediction -> {
                    long value = Math.max(context.getMin(), (long) (totalBudget * prediction.probability() * VALUE_MULTIPLIER));
                    value = Math.min(value, totalBudget - usedBudget.get());
                    BetType type = BetHelper.getStraightUpBetType(prediction.spot());
                    if (value >= context.getMin()) {
                        usedBudget.addAndGet(value);
                        return Bet.builder().type(type).value(value).build();
                    }
                    return null;
                })
                .filter(Objects::nonNull)
                .takeWhile(bet -> usedBudget.get() <= totalBudget)
                .toList();
        if (bets.isEmpty()) {
            BetType type = BetHelper.getStraightUpBetType(predictions.getFirst().spot());
            return List.of(Bet.builder().type(type).value(context.getMin()).build());
        }
        return bets;
    }
}