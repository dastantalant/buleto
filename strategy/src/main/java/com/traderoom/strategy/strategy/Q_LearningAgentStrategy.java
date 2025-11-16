package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.Color;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.enums.Spot;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Random;

/**
 * Стратегия, основанная на Q-Learning - алгоритме обучения с подкреплением.
 * Агент учится оптимальной политике, взаимодействуя со средой и получая награды.
 */
public class Q_LearningAgentStrategy extends BaseStrategy {

    private enum Action { BET_RED, BET_BLACK, WAIT }
    private record State(Color lastColor, int streak, int balanceLevel) {}

    private static final double LEARNING_RATE = 0.1;
    private static final double DISCOUNT_FACTOR = 0.9;
    private static final double EXPLORATION_RATE = 0.1;

    private final Map<State, Map<Action, Double>> qTable = new HashMap<>();
    private final Random random = new Random();

    private State lastState;
    private Action lastAction;

    public Q_LearningAgentStrategy(Context context) {
        super(context);
    }

    @Override
    public String getName() {
        return Q_LearningAgentStrategy.class.getSimpleName();
    }

    @Override
    public void updateStrategyParameter(List<Bet> betList, Spot spot, Context context) {
        super.updateStrategyParameter(betList, spot, context);

        if (lastState == null || lastAction == null) {
            return;
        }

        double reward = 0;
        if (hasLastBet()) {
            reward = wasLastBetWon(context) ? 1.0 : -1.0;
        }

        State newState = getCurrentState(context);

        Map<Action, Double> oldActionValues = qTable.computeIfAbsent(lastState, k -> new HashMap<>());
        double oldQValue = oldActionValues.getOrDefault(lastAction, 0.0);

        double maxNextQValue = qTable.getOrDefault(newState, Collections.emptyMap()).values().stream()
                .max(Double::compare).orElse(0.0);

        double newQValue = oldQValue + LEARNING_RATE * (reward + DISCOUNT_FACTOR * maxNextQValue - oldQValue);

        oldActionValues.put(lastAction, newQValue);
    }

    @Override
    protected List<Bet> getNextInternal(Context context) {
        State currentState = getCurrentState(context);

        Action actionToTake;
        if (random.nextDouble() < EXPLORATION_RATE) {
            actionToTake = Action.values()[random.nextInt(Action.values().length)];
        } else {
            actionToTake = getBestAction(currentState);
        }

        this.lastState = currentState;
        this.lastAction = actionToTake;

        return switch (actionToTake) {
            case BET_RED -> createBet(BetType.RED, context.getMin(), context);
            case BET_BLACK -> createBet(BetType.BLACK, context.getMin(), context);
            case WAIT -> Collections.emptyList();
        };
    }

    private Action getBestAction(State state) {
        Map<Action, Double> actions = qTable.getOrDefault(state, Collections.emptyMap());
        return actions.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse(Action.WAIT);
    }

    private State getCurrentState(Context context) {
        if (context.getSpotHistory().isEmpty()) {
            return new State(Color.GREEN, 0, getBalanceLevel(context));
        }

        List<Spot> history = context.getSpotHistory();
        Spot lastSpot = history.getLast();
        Color lastColor = getSpotColor(lastSpot);

        int streak = 1;
        for (int i = history.size() - 2; i >= 0; i--) {
            if (getSpotColor(history.get(i)) == lastColor) {
                streak++;
            } else {
                break;
            }
        }

        return new State(lastColor, Math.min(streak, 5), getBalanceLevel(context));
    }

    private int getBalanceLevel(Context context) {
        double ratio = curBalance / (double) context.getStart();
        if (ratio < 0.5) return 0;
        if (ratio < 1.5) return 1;
        return 2;
    }

    private Color getSpotColor(Spot spot) {
        if (spot.isRed()) return Color.RED;
        if (spot.isBlack()) return Color.BLACK;
        return Color.GREEN;
    }

    private List<Bet> createBet(BetType type, long value, Context context) {
        long safeValue = Math.min(value, curBalance);
        if (safeValue < context.getMin()) return Collections.emptyList();
        return List.of(Bet.builder().type(type).value(safeValue).build());
    }
}