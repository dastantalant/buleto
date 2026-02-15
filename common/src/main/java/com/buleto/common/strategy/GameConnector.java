package com.buleto.common.strategy;

import com.trading.roulette.api.enums.Spot;
import com.trading.roulette.api.model.Bet;
import java.util.List;

public interface GameConnector {

    long getRealBalance();

    void placeBets(List<Bet> bets);

    Spot waitForResult();

    void close();
}