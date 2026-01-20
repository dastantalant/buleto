package com.traderoom.strategy.api;

import com.traderoom.strategy.model.Bet;
import com.traderoom.strategy.model.context.State;

import java.util.List;

@FunctionalInterface
public interface Maker {
    List<Bet> decide(State state);
}