package com.traderoom.strategy.strategies;

import com.traderoom.api.annotation.Strategy;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.Bet;
import com.traderoom.api.AbstractStrategy;
import com.traderoom.api.utils.BetHelper;
import com.traderoom.api.utils.HistoryUtil;

import java.util.Deque;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Strategy
public class StraightUpStrategy3 extends AbstractStrategy {

    private int count;

    public StraightUpStrategy3(Config config) {
        super(config);
    }

    @Override
    public List<Bet> decide() {
        count = isLastBetWon() ? 0 : count + 1;
        Set<Spot> excluded = new HashSet<>(HistoryUtil.window(getMarket().getHistory(), count));
        return Spot.getAvailableList(getConfig().rouletteType())
                .stream()
                .filter(spot -> !excluded.contains(spot))
                .map(spot -> BetHelper.betting(spot, getMinBet()))
                .toList();
    }
}