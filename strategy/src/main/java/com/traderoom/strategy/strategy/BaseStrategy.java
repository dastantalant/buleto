package com.traderoom.strategy.strategy;

import com.traderoom.strategy.Constant;
import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.strategy.stop.StopCondition;
import com.traderoom.strategy.utils.BetHelper;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;

public abstract class BaseStrategy implements Strategy {
    @Getter
    @Setter
    protected long curBalance;
    @Getter
    protected long maxBalance;
    @Getter
    protected long minBalance;
    protected long maxTotalBetValue;
    protected long won;
    protected long lost;
    protected long bet;
    protected long wholeTotalBetValue;
    protected long wholeTotalPayoutValue;
    protected final LinkedList<Long> historyBalance;
    protected List<Bet> lastBets;
    protected boolean lastLive;
    protected boolean stopped = false;
    @Getter
    protected final long startBalance;
    protected final List<StopCondition> stopConditions;

    private enum RiskTier { PROFIT, NORMAL, DANGER }
    private final long profitZoneThreshold;
    private final long dangerZoneThreshold;
    private static final double NORMAL_ZONE_BET_CAP_PERCENTAGE = 0.05;

    private boolean inPenaltyBox = false;
    private int penaltyRoundsRemaining = 0;
    private static final int PENALTY_BOX_DURATION = 10;

    protected BaseStrategy(Context context) {
        startBalance = context.getStart();
        curBalance = startBalance;
        maxBalance = startBalance;
        minBalance = startBalance;

        this.profitZoneThreshold = (long) (startBalance * 1.10);
        this.dangerZoneThreshold = (long) (startBalance * 0.90);

        historyBalance = new LinkedList<>();
        lastBets = Collections.emptyList();
        lastLive = true;
        stopConditions = context.getStopConditions();
    }

    @Override
    public List<Bet> getNext(Context context) {
        Objects.requireNonNull(context, "Context must not be null");

        updatePenaltyBoxStatus();

        List<Bet> desiredBets;
        if (inPenaltyBox) {
            desiredBets = Collections.emptyList();
        } else {
            desiredBets = isLive(context) ? getNextInternal(context) : Collections.emptyList();

            RiskTier currentTier = getCurrentRiskTier();
            desiredBets = applyRiskManagementToBets(desiredBets, currentTier, context);
        }

        lastBets = applyTableLimits(desiredBets, context);

        long finalTotalBetValue = BetHelper.getTotalBetValue(lastBets);
        if (maxTotalBetValue < finalTotalBetValue) {
            maxTotalBetValue = finalTotalBetValue;
        }
        return lastBets;
    }

    private RiskTier getCurrentRiskTier() {
        if (curBalance > profitZoneThreshold) {
            return RiskTier.PROFIT;
        } else if (curBalance < dangerZoneThreshold) {
            return RiskTier.DANGER;
        } else {
            return RiskTier.NORMAL;
        }
    }

    private List<Bet> applyRiskManagementToBets(List<Bet> bets, RiskTier tier, Context context) {
        if (bets.isEmpty()) {
            return bets;
        }

        switch (tier) {
            case PROFIT:
                return bets;

            case NORMAL:
                long totalBetValue = BetHelper.getTotalBetValue(bets);
                long betCap = (long) (curBalance * NORMAL_ZONE_BET_CAP_PERCENTAGE);

                if (totalBetValue > betCap) {
                    return scaleDownBets(bets, betCap);
                }
                return bets;

            default:
                return bets;
        }
    }

    private List<Bet> scaleDownBets(List<Bet> bets, long limit) {
        long totalValue = BetHelper.getTotalBetValue(bets);
        if (totalValue == 0) return bets;

        final double scalingFactor = (double) limit / totalValue;
        List<Bet> adjustedBets = new ArrayList<>();

        for (Bet bet : bets) {
            long adjustedValue = (long) (bet.value() * scalingFactor);
            if (adjustedValue >= 1L) {
                adjustedBets.add(Bet.builder().type(bet.type()).value(adjustedValue).build());
            }
        }
        return adjustedBets;
    }

    private List<Bet> applyTableLimits(List<Bet> bets, Context context){
        long totalBetValue = BetHelper.getTotalBetValue(bets);
        long limit = context.getTotalRoundBetLimit();

        if (totalBetValue > limit) {
            return scaleDownBets(bets, limit);
        }
        return bets;
    }

    private void updatePenaltyBoxStatus() {
        if (inPenaltyBox) {
            penaltyRoundsRemaining--;
            if (penaltyRoundsRemaining <= 0) {
                this.inPenaltyBox = false;
            }
        } else if (curBalance <= dangerZoneThreshold) {
            this.inPenaltyBox = true;
            this.penaltyRoundsRemaining = PENALTY_BOX_DURATION;
        }
    }

    protected abstract List<Bet> getNextInternal(Context context);

    public long getLastTotalBetValue() {
        return BetHelper.getTotalBetValue(lastBets);
    }

    @Override
    public void updateStrategyParameter(List<Bet> betList, Spot spot, Context context) {
        if (!betList.isEmpty()) {
            long currentTotalBetValue = BetHelper.getTotalBetValue(betList);
            wholeTotalBetValue += currentTotalBetValue;
            curBalance -= currentTotalBetValue;

            long currentTotalPayout = BetHelper.getTotalPayout(betList, spot);
            wholeTotalPayoutValue += currentTotalPayout;
            curBalance += currentTotalPayout;

            bet++;
            if (BetHelper.hasWin(betList, spot)) {
                won++;
            } else {
                lost++;
            }
        }
        if (curBalance > maxBalance) {
            maxBalance = curBalance;
        }
        if (curBalance < minBalance) {
            minBalance = curBalance;
        }
        if (lastLive) {
            historyBalance.offer(curBalance);
            if (Constant.BALANCE_HISTORY_SIZE < historyBalance.size()) {
                historyBalance.poll();
            }
        }
        lastLive = isLive(context);
    }

    @Override
    public boolean isLive(Context context) {
        if (stopped) {
            return false;
        }
        for (StopCondition condition : stopConditions) {
            if (condition.shouldStop(this, null)) {
                stopped = true;
                return false;
            }
        }
        return true;
    }

    public double getWinningAverage() {
        return bet == 0 ? 0 : (double) won / (double) bet;
    }

    public long getAverageTotalBetValue() {
        return bet == 0 ? 0 : wholeTotalBetValue / bet;
    }

    public long getAverageTotalPayoutValue() {
        return bet == 0 ? 0 : wholeTotalPayoutValue / bet;
    }

    protected boolean wasLastBetWon(Context context) {
        if (lastBets == null || lastBets.isEmpty() || context.getLastSpot() == null) {
            return false;
        }
        return BetHelper.hasWin(lastBets, context.getLastSpot());
    }

    protected boolean hasLastBet() {
        return lastBets != null && !lastBets.isEmpty();
    }
}