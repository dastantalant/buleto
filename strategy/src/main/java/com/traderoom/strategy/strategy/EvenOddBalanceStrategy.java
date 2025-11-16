package com.traderoom.strategy.strategy;

import com.traderoom.strategy.application.Context;
import com.traderoom.strategy.enums.BetType;
import com.traderoom.strategy.enums.Spot;
import com.traderoom.strategy.model.Bet;

import java.util.Collections;
import java.util.List;
import java.util.Map;

public class EvenOddBalanceStrategy extends BaseStrategy {

    private static final double BALANCE_THRESHOLD = 0.45;

    public EvenOddBalanceStrategy(Context context) {
        super(context);
    }

    @Override
    public String getName() {
        return EvenOddBalanceStrategy.class.getSimpleName();
    }

    @Override
    protected List<Bet> getNextInternal(Context context) {
        if (context.getSpotHistory().isEmpty()) {
            return createBet(BetType.EVEN, context.getMin(), context);
        }

        Map<Spot, Integer> frequencies = context.getSpotFrequencies();
        long evenCount = frequencies.entrySet().stream()
                .filter(e -> e.getKey().isEven())
                .mapToLong(Map.Entry::getValue)
                .sum();
        long oddCount = frequencies.entrySet().stream()
                .filter(e -> e.getKey().isOdd())
                .mapToLong(Map.Entry::getValue)
                .sum();

        long totalEvenOdd = evenCount + oddCount;
        if (totalEvenOdd == 0) {
            return createBet(BetType.EVEN, context.getMin(), context);
        }

        double evenRate = (double) evenCount / totalEvenOdd;
        double oddRate = (double) oddCount / totalEvenOdd;

        BetType typeToBetOn = null;
        if (evenRate < BALANCE_THRESHOLD) {
            typeToBetOn = BetType.EVEN;
        } else if (oddRate < BALANCE_THRESHOLD) {
            typeToBetOn = BetType.ODD;
        }

        if (typeToBetOn == null) {
            typeToBetOn = BetType.EVEN;
        }

        long betValue;
        if (!hasLastBet() || wasLastBetWon(context)) {
            betValue = context.getMin();
        } else {
            long lastBetValue = getLastTotalBetValue();
            betValue = lastBetValue * 2;
        }

        return createBet(typeToBetOn, betValue, context);
    }

    private List<Bet> createBet(BetType type, long value, Context context) {
        long safeValue = Math.min(value, curBalance);
        if (safeValue <= 0 && curBalance > 0) {
            safeValue = context.getMin();
        } else if (safeValue <= 0) {
            return Collections.emptyList();
        }
        return Collections.singletonList(Bet.builder().type(type).value(safeValue).build());
    }
}