package com.traderoom.strategy.api;

import com.traderoom.strategy.IStrategy;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.predictor.EfficientCountPredictor;
import com.traderoom.strategy.predictor.ImprovedMarkovPredictor;
import com.traderoom.strategy.predictor.MultiOrderMarkovPredictor;
import com.traderoom.strategy.predictor.PatternPredictor;
import com.traderoom.strategy.predictor.Predictor;
import com.traderoom.strategy.predictor.RandomPredictor;
import com.traderoom.strategy.sizing.DAlembertSizing;
import com.traderoom.strategy.sizing.FlatSizing;
import com.traderoom.strategy.sizing.KellySizing;
import com.traderoom.strategy.sizing.MartingaleSizing;
import com.traderoom.strategy.sizing.Sizing;
import com.traderoom.strategy.base.ModularStrategy;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface Manager extends IStrategy {

    List<IStrategy> getPortfolio();

    IStrategy add(IStrategy strategy);

    List<IStrategy> add(List<IStrategy> strategies);

    IStrategy remove(IStrategy strategy);

    Optional<IStrategy> create(Class<? extends IStrategy> clazz, Config config);

    static List<IStrategy> generateAllCombinations(Config config) {
        List<IStrategy> combinations = new ArrayList<>();
        List<Predictor> predictors = new ArrayList<>();
        predictors.add(new MultiOrderMarkovPredictor());
        predictors.add(new ImprovedMarkovPredictor());
        predictors.add(new EfficientCountPredictor());
        predictors.add(new PatternPredictor());
        predictors.add(new RandomPredictor());

        List<Sizing> sizing = new ArrayList<>();
        sizing.add(new FlatSizing());
        sizing.add(new MartingaleSizing());
        sizing.add(new KellySizing());
        sizing.add(new DAlembertSizing());

        for (Predictor p : predictors) {
            for (Sizing s : sizing) {
                combinations.add(ModularStrategy.of(config, p, s));
            }
        }
        return combinations;
    }

    static String formatName(Predictor predictor, Sizing sizing) {
        String pName = predictor.getClass().getSimpleName().replace("Predictor", "");
        String sName = sizing.getClass().getSimpleName().replace("Sizing", "");
        return pName + "_" + sName;
    }
}
