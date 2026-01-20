package com.traderoom.strategy.risk;

import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;
import com.traderoom.strategy.utils.BetHelper;

import java.util.ArrayList;
import java.util.List;

public class ZoneRiskManager implements RiskManager {
    private static final double NORMAL_ZONE_BET_CAP_PERCENTAGE = 0.05;
    private static final int PENALTY_BOX_DURATION = 10;

    private final long profitZoneThreshold;
    private final long dangerZoneThreshold;

    private boolean inPenaltyBox = false;
    private int penaltyRoundsRemaining = 0;

    public ZoneRiskManager(long startBalance) {
        profitZoneThreshold = (long) (startBalance * 1.10);
        dangerZoneThreshold = (long) (startBalance * 0.90);
    }

    @Override
    public List<Bet> apply(List<Bet> bets, long currentBalance, State state, Config config) {
        if (inPenaltyBox) {
            return List.of();
        }

        if (currentBalance > dangerZoneThreshold && currentBalance < profitZoneThreshold) {
            long tValue = BetHelper.getTotalBetValue(bets);
            long bCapacity = (long) (currentBalance * NORMAL_ZONE_BET_CAP_PERCENTAGE);
            if (tValue > bCapacity) {
                return scale(bets, bCapacity);
            }
        }

        long tValue = BetHelper.getTotalBetValue(bets);
        if (tValue > config.tableLimit()) {
            return scale(bets, config.tableLimit());
        }

        return bets;
    }

    @Override
    public void updateState(long currentBalance) {
        if (inPenaltyBox) {
            penaltyRoundsRemaining--;
            if (penaltyRoundsRemaining <= 0) {
                inPenaltyBox = false;
            }
        } else if (currentBalance <= dangerZoneThreshold) {
            inPenaltyBox = true;
            penaltyRoundsRemaining = PENALTY_BOX_DURATION;
        }
    }

    private List<Bet> scale(List<Bet> bets, long limit) {
        long tValue = BetHelper.getTotalBetValue(bets);
        if (tValue == 0) return bets;
        final double scaling = (double) limit / tValue;
        List<Bet> list = new ArrayList<>(bets.size());
        for (Bet item : bets) {
            long value = (long) (item.value() * scaling);
            if (value >= 1L) {
                list.add(Bet.of(item.type(), value));
            }
        }
        return list;
    }
}