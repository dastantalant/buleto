package com.traderoom.strategy.base.strategies.hybrid;

import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.predictor.Predictor;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.SpotPrediction;

import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.Queue;

@AStrategy
public class DynamicHybridPredictorStrategy extends AbstractHybridPredictorStrategy {

    private final Queue<Boolean> markovSuccess;
    private final Queue<Boolean> countSuccess;

    public DynamicHybridPredictorStrategy(Config config) {
        super(config);
        markovSuccess = new LinkedList<>();
        countSuccess = new LinkedList<>();
    }

    @Override
    public void onRoundCustom(List<Bet> list, Spot spot, State state) {
        updatePredictorPerformance(state, spot);
        adjustPredictorWeights();
    }

    private void updatePredictorPerformance(State state, Spot spot) {
        isPredictorCorrect(predictorMarkov, state, spot, markovSuccess);
        isPredictorCorrect(predictorCount, state, spot, countSuccess);
    }

    private void isPredictorCorrect(Predictor predictor, State state, Spot spot, Queue<Boolean> queue) {
        Optional<Spot> optional = predictor.getNextSpot(state, getConfig()).stream()
                .max(Comparator.comparingDouble(SpotPrediction::probability))
                .map(SpotPrediction::spot);

        queue.add(optional.isPresent() && optional.get().equals(spot));
        if (queue.size() > window) {
            queue.poll();
        }
    }

    private void adjustPredictorWeights() {
        double markovRate = calculate(markovSuccess);
        double countRate = calculate(countSuccess);

        double sum = markovRate + countRate;
        if (sum > 0) {
            dynamicMarkov = markovRate / sum;
            dynamicCount = countRate / sum;
        }
    }

    private double calculate(Queue<Boolean> successQueue) {
        if (successQueue.isEmpty()) return 0.0;
        return (double) Collections.frequency(successQueue, true) / successQueue.size();
    }

    @Override
    public List<Bet> decide(State state) {
        List<SpotPrediction> top = getTop(state);
        if (top.isEmpty()) return List.of();
        return process(state, top, (long) (getBalance() * fraction));
    }
}