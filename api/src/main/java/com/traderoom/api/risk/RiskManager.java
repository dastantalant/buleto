package com.traderoom.api.risk;

import com.traderoom.api.IStrategy;
import com.traderoom.api.model.config.Config;
import com.traderoom.api.model.Bet;

import java.io.Serializable;
import java.util.List;

public interface RiskManager extends Serializable {
    List<Bet> apply(List<Bet> bets, IStrategy strategy);

    void updateState(long currentBalance);

    long calculateMin(IStrategy strategy);

    long calculateMax(IStrategy strategy);

    long getMinBet();

    long getMaxBet();

    static RiskManager from(Config config) {
        return new ZoneRiskManager(config);
    }
}