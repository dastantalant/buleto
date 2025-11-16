package com.traderoom.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.application.StrategyFactory;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.ContextModel;
import com.traderoom.strategy.model.RoundLog;
import com.traderoom.strategy.model.SimulatorLog;
import com.traderoom.strategy.strategy.Strategy;
import com.traderoom.strategy.utils.BetHelper;
import jakarta.validation.Valid;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Queue;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class Simulator {

    public SimulatorLog run(String strategyClassName, @Valid ContextModel contextModel, Queue<Integer> spots) {
        Context context = contextModel.toContext();
        Optional<Strategy> optional = StrategyFactory.load(strategyClassName, context, null);
        Queue<Spot> spotQueue = spots.stream()
                .map(Spot::getByNumber)
                .collect(Collectors.toCollection(LinkedList::new));

        SimulatorLog log = SimulatorLog.builder()
                .strategy(strategyClassName)
                .context(contextModel)
                .spots(HashMap.newHashMap(spots.size()))
                .build();
        optional.ifPresent(strategy -> run(strategy, context, spotQueue, log));
        return log;
    }

    public SimulatorLog run(Strategy strategyInstance, Context context, Queue<Integer> spots) {
        Queue<Spot> spotQueue = spots.stream()
                .map(Spot::getByNumber)
                .collect(Collectors.toCollection(LinkedList::new));

        SimulatorLog log = SimulatorLog.builder()
                .strategy(strategyInstance.getName())
                .context(null) // ContextModel здесь не нужен, так как Context уже создан
                .spots(new HashMap<>(spots.size()))
                .build();

        // Вызываем внутренний метод run, который теперь принимает готовый объект
        run(strategyInstance, context, spotQueue, log);
        return log;
    }

    private void run(Strategy strategy, Context context, Queue<Spot> spots, SimulatorLog log) {
        int roundNumber = 0;

        List<Bet> betsForNextRound = strategy.getNext(context);

        while (!spots.isEmpty() && strategy.isLive(context)) {
            List<Bet> betsForCurrentRound = betsForNextRound;

            Spot spot = spots.poll();

            long totalBetValue = BetHelper.getTotalBetValue(betsForCurrentRound);
            long totalPayout = BetHelper.getTotalPayout(betsForCurrentRound, spot);
            boolean isWin = BetHelper.hasWin(betsForCurrentRound, spot);
            long netLoss = Math.max(0, totalBetValue - totalPayout);

            strategy.updateStrategyParameter(betsForCurrentRound, spot, context);

            Map<Integer, Long> betsOnSpots = new HashMap<>();
            for (Bet bet : betsForCurrentRound) {
                Set<Spot> winningSpots = bet.type().getWinningSpots();
                if (winningSpots.isEmpty()) continue;

                long valuePerSpot = bet.value() / winningSpots.size();
                if (valuePerSpot == 0) valuePerSpot = 1;

                for (Spot coveredSpot : winningSpots) {
                    betsOnSpots.merge(coveredSpot.getNumber(), valuePerSpot, Long::sum);
                }
            }

            RoundLog roundLog = RoundLog.builder()
                    .victory(spot.getNumber())
                    .isWin(isWin)
                    .balance(strategy.getCurBalance())
                    .allBetAmount(totalBetValue)
                    .winAmount(totalPayout)
                    .lossAmount(netLoss)
                    .bets(betsOnSpots)
                    .build();

            log.spots().put(roundNumber, roundLog);
            roundNumber++;

            context.addSpotHistory(spot);

            if (strategy.isLive(context)) {
                betsForNextRound = strategy.getNext(context);
            }
        }
    }
}