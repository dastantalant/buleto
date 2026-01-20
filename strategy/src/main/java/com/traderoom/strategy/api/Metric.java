package com.traderoom.strategy.api;

import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.Config;
import com.traderoom.strategy.risk.RiskManager;

import java.util.List;

public interface Metric extends Naming {

    Config getConfig();

    long getBalance();

    long getStartBalance();

    long getPeakBalance();

    double getMaxDrawdown();

    long getWonCount();

    long getLostCount();

    long getBetCount();

    long getTotalWagered();

    long getTotalPayout();

    List<Bet> getLastBets();

    RiskManager getRiskManager();
}