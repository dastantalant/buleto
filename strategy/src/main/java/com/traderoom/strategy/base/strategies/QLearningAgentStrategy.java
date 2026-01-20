package com.traderoom.strategy.base.strategies;

import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.Color;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.base.AbstractStrategy;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@AStrategy
public class QLearningAgentStrategy extends AbstractStrategy {

    private enum Action {BET_RED, BET_BLACK, WAIT}

    private record QState(Color last, int streak, int level) {
        static QState of(Color last, int streak, int level) {
            return new QState(last, streak, level);
        }
    }

    private final Map<QState, Map<Action, Double>> qTable;
    private final Random random;
    private final double learningRate;
    private final double discountFactor;
    private final double explorationRate;

    private QState lastState;
    private Action lastAction;

    public QLearningAgentStrategy(Config config) {
        super(config);
        qTable = new HashMap<>();
        random = new Random();
        learningRate = 0.1;
        discountFactor = 0.9;
        explorationRate = 0.1;
    }

    @Override
    public void onRoundCustom(List<Bet> betList, Spot spot, State state) {
        if (lastState == null || lastAction == null) {
            return;
        }

        double reward = (isLastBetWon(state) ? 1.0 : -1.0);
        reward = isLastBet() ? reward : 0;

        Map<Action, Double> oldActionValues = qTable.computeIfAbsent(lastState, _ -> new HashMap<>());
        double oldQValue = oldActionValues.getOrDefault(lastAction, 0.0);
        double maxNextQValue = qTable.getOrDefault(getCurrentState(state), Collections.emptyMap()).values().stream()
                .max(Double::compare).orElse(0.0);
        double newQValue = oldQValue + learningRate * (reward + discountFactor * maxNextQValue - oldQValue);
        oldActionValues.put(lastAction, newQValue);
    }

    @Override
    public List<Bet> decide(State state) {
        lastState = getCurrentState(state);
        lastAction = (random.nextDouble() < explorationRate) ? Action.values()[random.nextInt(Action.values().length)] : getBestAction(lastState);
        return switch (lastAction) {
            case BET_RED -> createBet(BetType.RED, getConfig().minBet(), state);
            case BET_BLACK -> createBet(BetType.BLACK, getConfig().minBet(), state);
            case WAIT -> List.of();
        };
    }

    private Action getBestAction(QState state) {
        Map<Action, Double> actions = qTable.getOrDefault(state, Collections.emptyMap());
        return actions.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse(Action.WAIT);
    }

    private QState getCurrentState(State state) {
        if (state.getMarketData().getHistory().isEmpty()) {
            return QState.of(Color.GREEN, 0, getBalanceLevel(state));
        }

        List<Spot> history = state.getMarketData().getHistory();
        Spot lastSpot = history.getLast();
        Color lastColor = getSpotColor(lastSpot);

        int streak = 1;
        for (int i = history.size() - 2; i >= 0; i--) {
            if (getSpotColor(history.get(i)) == lastColor) streak++;
            else break;
        }
        return QState.of(lastColor, Math.min(streak, 5), getBalanceLevel(state));
    }

    private int getBalanceLevel(State state) {
        double ratio = getBalance() / (double) getConfig().startBalance();
        if (ratio < 0.5) return 0;
        if (ratio < 1.5) return 1;
        return 2;
    }

    private Color getSpotColor(Spot spot) {
        if (spot.isRed()) return Color.RED;
        if (spot.isBlack()) return Color.BLACK;
        return Color.GREEN;
    }

    private List<Bet> createBet(BetType type, long value, State state) {
        long safeValue = Math.min(value, getBalance());
        return (safeValue < getConfig().minBet()) ? List.of() : Bet.list(type, safeValue);
    }
}