package com.traderoom.strategy.application;

import com.traderoom.strategy.strategy.MarketRegimeClusteringStrategy;
import com.traderoom.strategy.strategy.Strategy;
import com.traderoom.strategy.strategy.StrategyPortfolioManager;
import com.traderoom.strategy.utils.StrategyHelper;
import lombok.experimental.UtilityClass;
import org.deeplearning4j.nn.multilayer.MultiLayerNetwork;

import java.lang.reflect.Constructor;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@UtilityClass
public class StrategyFactory {

    private static class Holder {
        private static final Map<String, Class<? extends Strategy>> INSTANCE = StrategyHelper.findAllStrategyClassesMap();
    }

    public static Map<String, Class<? extends Strategy>> getAll(List<String> exclude) {
        if (exclude == null || exclude.isEmpty()) {
            return getAll();
        }
        return Holder.INSTANCE.entrySet().stream()
                .filter(entry -> !exclude.contains(entry.getKey()))
                .collect(Collectors.toUnmodifiableMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    public static Map<String, Class<? extends Strategy>> getAll() {
        return Holder.INSTANCE;
    }

    public static Set<Strategy> load(List<String> strategies, Context context, ModelProvider modelProvider) {
        return strategies.stream()
                .map(it -> StrategyFactory.load(it, context, modelProvider))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toUnmodifiableSet());
    }

    public static Optional<Strategy> load(String strategyClassName, Context context, ModelProvider modelProvider) {
        if (!Holder.INSTANCE.containsKey(strategyClassName)) {
            return Optional.empty();
        }

        Class<? extends Strategy> clazz = Holder.INSTANCE.get(strategyClassName);

        try {
            switch (clazz.getSimpleName()) {
                case "MarketRegimeClusteringStrategy":
                    return modelProvider.getClusteringModel()
                            .map(centroids -> new MarketRegimeClusteringStrategy(context, centroids));

                case "FlowerBetStrategy", "HybridPredictorStrategy", "SelfTuningHybridStrategy",
                     "KellyCriterionStrategy", "TopNRnnCandidatesStrategy", "StraightUpStrategy",
                     "PredictorConfidenceStrategy":
                    Optional<MultiLayerNetwork> rnnModel = modelProvider.getRnnModel();
                    Constructor<? extends Strategy> rnnConstructor = clazz.getConstructor(Context.class, Optional.class);
                    return Optional.of(rnnConstructor.newInstance(context, rnnModel));
                case "StrategyPortfolioManager":
                    return Optional.of(new StrategyPortfolioManager(context, modelProvider));
                default:
                    Constructor<? extends Strategy> defaultConstructor = clazz.getConstructor(Context.class);
                    return Optional.of(defaultConstructor.newInstance(context));
            }
        } catch (Exception e) {
            return Optional.empty();
        }
    }
}