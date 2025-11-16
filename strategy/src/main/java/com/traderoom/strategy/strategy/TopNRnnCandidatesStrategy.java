package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.SpotPrediction;
import com.traderoom.strategy.predictor.Predictor;
import com.traderoom.strategy.predictor.RnnPredictor;
import com.traderoom.strategy.utils.BetHelper;
import org.deeplearning4j.nn.multilayer.MultiLayerNetwork;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * Стратегия, которая полностью доверяет RnnPredictor.
 * Она выбирает N самых вероятных исходов, предсказанных нейросетью,
 * и распределяет между ними бюджет раунда.
 * Конструктор унифицирован для работы с StrategyFactory.
 */
public class TopNRnnCandidatesStrategy extends BaseStrategy {

    private static final int NUMBER_OF_CANDIDATES = 3;
    private static final double ROUND_BUDGET_FRACTION = 0.05; // 5%

    private final Predictor predictor;
    private final boolean isReady;

    /**
     * Унифицированный конструктор для StrategyFactory.
     *
     * @param context     Контекст игры.
     * @param rnnModelOpt Optional с предобученной моделью RNN.
     */
    public TopNRnnCandidatesStrategy(Context context, Optional<MultiLayerNetwork> rnnModelOpt) {
        super(context);
        isReady = rnnModelOpt.isPresent();
        predictor = rnnModelOpt
                .map(net -> new RnnPredictor(net, context.getRouletteType()))
                .orElse(null);
    }

    @Override
    public String getName() {
        return TopNRnnCandidatesStrategy.class.getSimpleName();
    }

    @Override
    protected List<Bet> getNextInternal(Context context) {
        if (!isReady) {
            return List.of();
        }

        List<SpotPrediction> allPredictions = predictor.getNextSpotPredictionList(context);

        if (allPredictions.isEmpty()) {
            return List.of();
        }

        List<SpotPrediction> topCandidates = allPredictions.stream()
                .sorted(Comparator.comparingDouble(SpotPrediction::probability).reversed())
                .limit(NUMBER_OF_CANDIDATES)
                .toList();

        if (topCandidates.isEmpty()) {
            return List.of();
        }

        long roundBudget = (long) (curBalance * ROUND_BUDGET_FRACTION);
        if (roundBudget < context.getMin() * NUMBER_OF_CANDIDATES) {
            return List.of();
        }

        double totalProbabilityOfTop = topCandidates.stream()
                .mapToDouble(SpotPrediction::probability)
                .sum();

        if (totalProbabilityOfTop == 0) {
            return List.of();
        }

        return topCandidates.stream()
                .map(prediction -> {
                    long betValue = (long) (roundBudget * (prediction.probability() / totalProbabilityOfTop));
                    long clampedValue = Math.max(context.getMin(), betValue);

                    if (clampedValue > curBalance) return null;

                    return Bet.builder()
                            .type(BetHelper.getStraightUpBetType(prediction.spot()))
                            .value(clampedValue)
                            .build();
                })
                .filter(Objects::nonNull)
                .toList();
    }
}