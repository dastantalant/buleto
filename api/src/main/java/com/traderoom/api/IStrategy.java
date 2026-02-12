package com.traderoom.api;

import com.traderoom.api.model.config.Config;
import com.traderoom.api.enums.Spot;
import com.traderoom.api.model.Bet;
import com.traderoom.api.model.Snapshot;
import com.traderoom.api.model.State;

import java.util.List;

public interface IStrategy extends IMetric, IMaker, Publisher {

    List<Bet> calculateNextBets();

    Snapshot commitResult(Spot spot, List<Bet> actualBets);

    default Snapshot victory(Spot spot) {
        List<Bet> bets = calculateNextBets();
        return commitResult(spot, bets);
    }

    State getState();

    Config getConfig();

    boolean isLive();

    Snapshot snapshot();

    void syncRealBalance(long realBalance);

    Snapshot endGame();
}
