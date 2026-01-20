package com.traderoom.strategy.risk;

import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;

import java.util.List;

public interface RiskManager {

    List<Bet> apply(List<Bet> bets, long currentBalance, State state, Config config);

    void updateState(long currentBalance);
}