package com.traderoom.strategy.base;

import com.traderoom.strategy.IStrategy;
import com.traderoom.strategy.enums.Tag;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.api.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.predictor.MultiOrderMarkovPredictor;
import com.traderoom.strategy.sizing.MartingaleSizing;
import com.traderoom.strategy.base.strategies.EnsemblePredictionStrategy;
import com.traderoom.strategy.base.strategies.balance.ColorBalanceStrategy;
import com.traderoom.strategy.base.strategies.balance.EvenOddBalanceStrategy;
import com.traderoom.strategy.base.strategies.martingale.GrandMartingaleStrategy;
import com.traderoom.strategy.base.strategies.martingale.MartingaleStrategy;
import com.traderoom.strategy.base.strategies.martingale.MartingaleStrategy4;
import com.traderoom.strategy.utils.BetHelper;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.EnumMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Stream;

@AStrategy(tags = Tag.MANAGER)
public class GlobalManager extends BaseManager {

    private static final int ACTIVE_STRATEGIES_COUNT = 3;
    private static final int PERFORMANCE_WINDOW = 50;

    private final List<ManagedStrategy> pool;
    private List<IStrategy> activeStrategies;

    public GlobalManager(Config config) {
        super(config);
        pool = new ArrayList<>();
        activeStrategies = new ArrayList<>();
        List<IStrategy> portfolioList = Stream.of(GrandMartingaleStrategy.class,
                        MartingaleStrategy4.class,
                        EvenOddBalanceStrategy.class,
                        ColorBalanceStrategy.class,
                        MartingaleStrategy.class)
                .map(item -> create(item, config))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .map(s -> (IStrategy) ModularStrategy.of(config, MultiOrderMarkovPredictor.of(), MartingaleSizing.of()))
                .map(s -> (IStrategy) EnsemblePredictionStrategy.of(config))
                .peek(item -> pool.add(ManagedStrategy.of(item)))
                .toList();

        add(portfolioList);
    }

    @Override
    public void onRoundCustom(List<Bet> realBets, Spot spot, State state) {
        for (ManagedStrategy managed : pool) {
            List<Bet> virtualBets = managed.lastVirtualBets;

            long profit = 0;
            if (!virtualBets.isEmpty()) {
                long payout = BetHelper.getTotalPayout(virtualBets, spot);
                long cost = BetHelper.getTotalBetValue(virtualBets);
                profit = payout - cost;
            }

            managed.updateScore(profit, PERFORMANCE_WINDOW);

            ((AbstractStrategy) managed.strategy).onRoundEnd(virtualBets, spot, state);
        }

        rebalancePortfolio();
    }

    private void rebalancePortfolio() {
        activeStrategies = pool.stream()
                .sorted(Comparator.comparingLong(ManagedStrategy::getScore).reversed())
                .limit(ACTIVE_STRATEGIES_COUNT)
                .filter(ms -> ms.getScore() > 0)
                .map(ms -> ms.strategy)
                .toList();
    }

    @Override
    public List<Bet> decide(State state) {
        for (ManagedStrategy managed : pool) {
            ((AbstractStrategy) managed.strategy).setBalance(getBalance());
            managed.lastVirtualBets = ((AbstractStrategy) managed.strategy).decide(state);
        }

        if (activeStrategies.isEmpty()) {
            return List.of();
        }

        List<Bet> combinedBets = new ArrayList<>();
        for (IStrategy strategy : activeStrategies) {
            ManagedStrategy ms = pool.stream()
                    .filter(p -> p.strategy == strategy)
                    .findFirst()
                    .orElse(null);

            if (ms != null && ms.lastVirtualBets != null) {
                combinedBets.addAll(ms.lastVirtualBets);
            }
        }

        return mergeBets(combinedBets, state);
    }

    private List<Bet> mergeBets(List<Bet> rawBets, State state) {
        if (rawBets.isEmpty()) return List.of();

        Map<BetType, Long> merged = new EnumMap<>(BetType.class);

        for (Bet bet : rawBets) {
            merged.merge(bet.type(), bet.value(), Long::sum);
        }

        nettingOpposites(merged, BetType.RED, BetType.BLACK);
        nettingOpposites(merged, BetType.EVEN, BetType.ODD);
        nettingOpposites(merged, BetType.ONE_TO_EIGHTEEN, BetType.NINETEEN_TO_THIRTY_SIX);

        return merged.entrySet().stream()
                .filter(e -> e.getValue() > 0)
                .map(entry -> {
                    long value = Math.min(entry.getValue(), getConfig().maxBet());
                    return new Bet(entry.getKey(), Math.max(value, getConfig().minBet()));
                })
                .toList();
    }

    private void nettingOpposites(Map<BetType, Long> map, BetType a, BetType b) {
        long valA = map.getOrDefault(a, 0L);
        long valB = map.getOrDefault(b, 0L);

        if (valA > 0 && valB > 0) {
            if (valA > valB) {
                map.put(a, valA - valB);
                map.remove(b);
            } else if (valB > valA) {
                map.put(b, valB - valA);
                map.remove(a);
            } else {
                map.remove(a);
                map.remove(b);
            }
        }
    }

    private static class ManagedStrategy {
        final IStrategy strategy;
        List<Bet> lastVirtualBets = List.of();
        final LinkedList<Long> profitHistory = new LinkedList<>();
        long currentScore = 0;

        public static ManagedStrategy of(IStrategy strategy) {
            return new ManagedStrategy(strategy);
        }

        ManagedStrategy(IStrategy strategy) {
            this.strategy = strategy;
        }

        void updateScore(long profit, int windowSize) {
            profitHistory.add(profit);
            currentScore += profit;
            if (profitHistory.size() > windowSize) {
                currentScore -= profitHistory.removeFirst();
            }
        }

        long getScore() {
            return currentScore;
        }
    }
}