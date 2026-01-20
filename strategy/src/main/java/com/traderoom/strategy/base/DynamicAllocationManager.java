package com.traderoom.strategy.base;

import com.traderoom.strategy.api.IStrategy;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.factory.AStrategy;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.predictor.EfficientCountPredictor;
import com.traderoom.strategy.predictor.MultiOrderMarkovPredictor;
import com.traderoom.strategy.predictor.PatternPredictor;
import com.traderoom.strategy.sizing.DAlembertSizing;
import com.traderoom.strategy.sizing.KellySizing;
import com.traderoom.strategy.sizing.MartingaleSizing;
import com.traderoom.strategy.base.strategies.DAlembertStrategy;
import com.traderoom.strategy.base.strategies.balance.ColorBalanceStrategy;
import com.traderoom.strategy.base.strategies.balance.EvenOddBalanceStrategy;
import com.traderoom.strategy.base.strategies.martingale.GrandMartingaleStrategy;
import com.traderoom.strategy.base.strategies.martingale.MartingaleStrategy;
import com.traderoom.strategy.base.strategies.martingale.MartingaleStrategy4;
import com.traderoom.strategy.utils.BetHelper;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Stream;

@AStrategy
public class DynamicAllocationManager extends BaseManager {

    private static final double GROWTH_FACTOR = 1.15;
    private static final double DECAY_FACTOR = 0.85;
    private static final double MIN_WEIGHT_THRESHOLD = 0.05;
    private static final double MAX_WEIGHT_CAP = 10.0;
    private static final double RESURRECTION_THRESHOLD = 0.5;

    private final List<StrategyTracker> trackers;

    public DynamicAllocationManager(Config config) {
        super(config);
        trackers = new ArrayList<>();
        List<IStrategy> portfolio =
//                Stream.of(new CocomoStrategy(config),
//                        new MansuriansStrategy(config),
//                        new ParoliStrategy(config))
                Stream.of(GrandMartingaleStrategy.class,
                        MartingaleStrategy4.class,
                        EvenOddBalanceStrategy.class,
                        ColorBalanceStrategy.class,
                        MartingaleStrategy.class,
                        DAlembertStrategy.class)
                .map(item -> create(item, config))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .map(s -> (IStrategy) ModularStrategy.of(config, MultiOrderMarkovPredictor.of(), MartingaleSizing.of()))
                .map(s -> (IStrategy) ModularStrategy.of(config, EfficientCountPredictor.of(), DAlembertSizing.of()))
                .map(s -> (IStrategy) ModularStrategy.of(config, PatternPredictor.of(), KellySizing.of()))
                .toList();
        portfolio.forEach(item -> trackers.add(StrategyTracker.of(item)));
        add(portfolio);
    }

    @Override
    public void onRoundCustom(List<Bet> betList, Spot spot, State state) {
        for (StrategyTracker tracker : trackers) {
            List<Bet> virtualBets = tracker.lastVirtualBets;
            long profit = 0;
            if (!virtualBets.isEmpty()) {
                long payout = BetHelper.getTotalPayout(virtualBets, spot);
                long cost = BetHelper.getTotalBetValue(virtualBets);
                profit = payout - cost;
            }

            ((AbstractStrategy) tracker.strategy).onRoundEnd(virtualBets, spot, state);

            if (!virtualBets.isEmpty()) {
                if (profit > 0) {
                    tracker.weight *= GROWTH_FACTOR;
                    tracker.consecutiveLosses = 0;
                } else {
                    tracker.weight *= DECAY_FACTOR;
                    tracker.consecutiveLosses++;
                }
            }

            if (tracker.weight < MIN_WEIGHT_THRESHOLD) {
                tracker.isActive = false;
            }

            if (!tracker.isActive && profit > 0 && tracker.consecutiveLosses == 0) {
                tracker.weight *= 1.1;
                if (tracker.weight > RESURRECTION_THRESHOLD) {
                    tracker.isActive = true;
                }
            }
            tracker.weight = Math.min(tracker.weight, MAX_WEIGHT_CAP);
        }
    }

    @Override
    public List<Bet> decide(State state) {
        List<Bet> combinedBets = new ArrayList<>();

        for (StrategyTracker tracker : trackers) {
            ((AbstractStrategy) tracker.strategy).setBalance(getBalance());

            List<Bet> proposedBets = ((AbstractStrategy) tracker.strategy).decide(state);
            tracker.lastVirtualBets = proposedBets;

            if (tracker.isActive && !proposedBets.isEmpty()) {
                for (Bet bet : proposedBets) {
                    long scaledValue = (long) (bet.value() * tracker.weight);
                    if (tracker.consecutiveLosses > 3) {
                        scaledValue = scaledValue / 2;
                    }
                    if (scaledValue >= 1) {
                        combinedBets.add(new Bet(bet.type(), scaledValue));
                    }
                }
            }
        }

        return mergeAndCheckLimits(combinedBets, state);
    }

    private List<Bet> mergeAndCheckLimits(List<Bet> rawBets, State state) {
        if (rawBets.isEmpty()) return List.of();

        Map<BetType, Long> mergedMap = new EnumMap<>(BetType.class);

        for (Bet bet : rawBets) {
            mergedMap.merge(bet.type(), bet.value(), Long::sum);
        }

        long totalProposedAmount = mergedMap.values().stream().mapToLong(Long::longValue).sum();
        double scalingFactor = 1.0;

        long balance = getBalance();
        if (totalProposedAmount > balance) {
            scalingFactor = (double) balance / totalProposedAmount;
        }

        if (totalProposedAmount > getConfig().tableLimit()) {
            double limitFactor = (double) getConfig().tableLimit() / totalProposedAmount;
            scalingFactor = Math.min(scalingFactor, limitFactor);
        }

        final double finalScale = scalingFactor;

        return mergedMap.entrySet().stream()
                .map(entry -> {
                    long val = (long) (entry.getValue() * finalScale);
                    if (val > getConfig().maxBet()) val = getConfig().maxBet();
                    return new Bet(entry.getKey(), val);
                })
                .filter(b -> b.value() >= getConfig().minBet())
                .toList();
    }

    private static class StrategyTracker {
        final IStrategy strategy;
        double weight = 1.0;
        boolean isActive = true;
        int consecutiveLosses = 0;
        List<Bet> lastVirtualBets = List.of();

        public static StrategyTracker of(IStrategy strategy) {
            return new StrategyTracker(strategy);
        }

        StrategyTracker(IStrategy strategy) {
            this.strategy = strategy;
        }
    }
}