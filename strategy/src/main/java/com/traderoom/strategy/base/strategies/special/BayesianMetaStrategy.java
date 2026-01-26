package com.traderoom.strategy.base.strategies.special;

import com.traderoom.strategy.base.AbstractStrategy;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.predictor.*;
import com.traderoom.strategy.utils.BetHelper;

import java.util.*;

/**
 * Байесовская Мета-Стратегия.
 * <p>
 * Вместо выбора одной тактики, она поддерживает "Вероятность истинности" (Belief) для нескольких гипотез.
 * Каждая гипотеза - это Предиктор (Марков, Счет, Паттерн).
 * После каждого раунда вероятности пересчитываются по формуле Байеса.
 * Ставка делается взвешенным мнением всех гипотез.
 */
@AStrategy
public class BayesianMetaStrategy extends AbstractStrategy {

    private final Map<Predictor, Double> beliefs; // P(Model)
    private final List<Predictor> models;
    private static final double DECAY = 0.98; // Забывание старых успехов

    public BayesianMetaStrategy(Config config) {
        super(config);
        models = List.of(
                new MultiOrderMarkovPredictor(),
                new EfficientCountPredictor(),
                new PatternPredictor(),
                new SectorMomentumPredictor() // Используем новый предиктор тоже
        );

        beliefs = new HashMap<>();
        double initialProb = 1.0 / models.size();
        models.forEach(m -> beliefs.put(m, initialProb));
    }

    @Override
    public List<Bet> decide(State state) {
        Map<BetType, Double> aggregatedOpinion = new HashMap<>();

        for (Predictor model : models) {
            double modelWeight = beliefs.get(model);

            // Получаем мнение модели (берем Straight Up для унификации)
            model.getNextSpot(state, getConfig()).forEach(pred -> {
                BetType type = BetHelper.getStraightUp(pred.spot());
                double weightedProb = pred.probability() * modelWeight;
                aggregatedOpinion.merge(type, weightedProb, Double::sum);
            });
        }

        // Выбираем лучшие
        return aggregatedOpinion.entrySet().stream()
                .sorted(Map.Entry.<BetType, Double>comparingByValue().reversed())
                .limit(4)
                .filter(e -> e.getValue() > 0.15) // Порог уверенности
                .map(e -> Bet.of(e.getKey(), getConfig().minBet()))
                .toList();
    }

    @Override
    protected void onRoundCustom(List<Bet> bets, Spot spot, State state) {
        // Байесовское обновление (Bayesian Update)
        double normalizationFactor = 0.0;

        for (Predictor model : models) {
            double prior = beliefs.get(model);

            // Likelihood: Насколько хорошо модель предсказала этот исход?
            double likelihood = 0.001; // Базовая вероятность (чтобы не 0)

            var preds = model.getNextSpot(state, getConfig());
            for (var p : preds) {
                if (p.spot() == spot) {
                    likelihood += p.probability();
                    break;
                }
            }

            double posterior = prior * likelihood;
            beliefs.put(model, posterior);
            normalizationFactor += posterior;
        }

        // Нормализация + Decay (чтобы система оставалась гибкой)
        for (Predictor model : models) {
            double norm = beliefs.get(model) / normalizationFactor;
            // Смешиваем с равномерным распределением (Re-injection of entropy)
            norm = (norm * DECAY) + ((1.0 - DECAY) / models.size());
            beliefs.put(model, norm);
        }
    }
}