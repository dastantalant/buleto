package com.traderoom.common.strategy;

import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.Bet;
import java.util.List;

public interface GameConnector {

    long getRealBalance();

    void placeBets(List<Bet> bets);

    Spot waitForResult();

    void close();
}