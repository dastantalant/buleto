package com.traderoom.strategy.risk;

import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.model.context.State;

import java.io.Serializable;
import java.util.List;

public interface RiskManager  extends Serializable {

    List<Bet> apply(List<Bet> bets, long currentBalance, State state, Config config);

    void updateState(long currentBalance);
}